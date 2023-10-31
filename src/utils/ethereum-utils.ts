/**
 * Re-exports from https://github.com/ethereumjs/ethereumjs-monorepo/blob/master/packages/util
 */
import { keccak_256 as keccak256 } from '@noble/hashes/sha3'
import * as secp256k1 from '@noble/secp256k1'
import type { Buffer } from 'node:buffer'

const BIGINT_0 = BigInt(0)
const BIGINT_1 = BigInt(1)
const BIGINT_2 = BigInt(2)
const BIGINT_27 = BigInt(27)

const zeros = (bytes: number): Uint8Array => new Uint8Array(bytes)

const concatBytes = (...arrays: Uint8Array[]): Uint8Array => {
  if (arrays.length === 1) return arrays[0]
  const length = arrays.reduce((a, arr) => a + arr.length, 0)
  const result = new Uint8Array(length)
  for (let i = 0, pad = 0; i < arrays.length; i++) {
    const arr = arrays[i]
    result.set(arr, pad)
    pad += arr.length
  }
  return result
}

function calculateSigRecovery(v: bigint, chainId?: bigint): bigint {
  if (v === BIGINT_0 || v === BIGINT_1) return v

  if (chainId === undefined) {
    return v - BIGINT_27
  }
  return v - (chainId * BIGINT_2 + BigInt(35))
}

const setLengthLeft = (msg: Uint8Array, length: number): Uint8Array => {
  assertIsBytes(msg)
  return setLength(msg, length, false)
}

const setLength = (msg: Uint8Array, length: number, right: boolean): Uint8Array => {
  if (right) {
    if (msg.length < length) {
      return new Uint8Array([...msg, ...zeros(length - msg.length)])
    }
    return msg.subarray(0, length)
  } else {
    if (msg.length < length) {
      return new Uint8Array([...zeros(length - msg.length), ...msg])
    }
    return msg.subarray(-length)
  }
}

function isValidSigRecovery(recovery: bigint): boolean {
  return recovery === BIGINT_0 || recovery === BIGINT_1
}

const assertIsBytes = function (input: Uint8Array): void {
  if (!(input instanceof Uint8Array)) {
    const msg = `This method only supports Uint8Array but input was: ${input}`
    throw new Error(msg)
  }
}

/**
 * ECDSA public key recovery from signature.
 * NOTE: Accepts `v === 0 | v === 1` for EIP1559 transactions
 * @returns Recovered public key
 */
export const ecrecover = function (
  msgHash: Uint8Array,
  v: bigint,
  r: Uint8Array,
  s: Uint8Array,
  chainId?: bigint,
): Uint8Array {
  const signature = concatBytes(setLengthLeft(r, 32), setLengthLeft(s, 32))
  const recovery = calculateSigRecovery(v, chainId)
  if (!isValidSigRecovery(recovery)) {
    throw new Error('Invalid signature v value')
  }

  const sig = secp256k1.Signature.fromCompact(signature).addRecoveryBit(Number(recovery))
  const senderPubKey = sig.recoverPublicKey(msgHash)
  return senderPubKey.toRawBytes(false).slice(1)
}
export function bufferToHex(buffer: Buffer | Uint8Array) {
  const hexArray = Array.from(buffer, (byte) => byte.toString(16).padStart(2, '0'))
  return '0x' + hexArray.join('')
}

export const pubToAddress = function (pubKey: Uint8Array, sanitize: boolean = false): Uint8Array {
  assertIsBytes(pubKey)
  if (sanitize && pubKey.length !== 64) {
    pubKey = secp256k1.ProjectivePoint.fromHex(pubKey).toRawBytes(false).slice(1)
  }
  if (pubKey.length !== 64) {
    throw new Error('Expected pubKey to be of length 64')
  }
  // Only take the lower 160bits of the hash
  return keccak256(pubKey).subarray(-20)
}
