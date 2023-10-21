import type { Account, Address, Chain, Hash, Hex, Transport, WalletClient } from 'viem'
import { bufferToHex, ecrecover, pubToAddress } from '../../utils/ethereum-utils.js'

function sameString(str1: string, str2: string): boolean {
  return str1.toLowerCase() === str2.toLowerCase()
}

function isTxHashSignedWithPrefix(txHash: Hash, signature: string, ownerAddress: Address): boolean {
  let hasPrefix
  try {
    const rsvSig = {
      r: Buffer.from(signature.slice(2, 66), 'hex'),
      s: Buffer.from(signature.slice(66, 130), 'hex'),
      v: BigInt(parseInt(signature.slice(130, 132), 16)),
    }
    const recoveredData = ecrecover(Buffer.from(txHash.slice(2), 'hex'), rsvSig.v, rsvSig.r, rsvSig.s)
    const recoveredAddress = bufferToHex(pubToAddress(recoveredData))
    hasPrefix = !sameString(recoveredAddress, ownerAddress)
  } catch (e) {
    hasPrefix = true
  }
  return hasPrefix
}

const adjustVInSignature = (
  signingMethod: 'eth_sign',
  signature: Hex,
  safeTxHash: Hash,
  signerAddress: Address
): Hex => {
  const ETHEREUM_V_VALUES = [0, 1, 27, 28]
  const MIN_VALID_V_VALUE_FOR_SAFE_ECDSA = 27
  let signatureV = parseInt(signature.slice(-2), 16)
  if (!ETHEREUM_V_VALUES.includes(signatureV)) {
    throw new Error('Invalid signature')
  }
  if (signingMethod === 'eth_sign') {
    /*
        The Safe's expected V value for ECDSA signature is:
        - 27 or 28
        - 31 or 32 if the message was signed with a EIP-191 prefix. Should be calculated as ECDSA V value + 4
        Some wallets do that, some wallets don't, V > 30 is used by contracts to differentiate between
        prefixed and non-prefixed messages. The only way to know if the message was signed with a
        prefix is to check if the signer address is the same as the recovered address.
  
        More info:
        https://docs.safe.global/safe-core-protocol/signatures
      */
    if (signatureV < MIN_VALID_V_VALUE_FOR_SAFE_ECDSA) {
      signatureV += MIN_VALID_V_VALUE_FOR_SAFE_ECDSA
    }
    const adjustedSignature = signature.slice(0, -2) + signatureV.toString(16)
    const signatureHasPrefix = isTxHashSignedWithPrefix(safeTxHash, adjustedSignature, signerAddress)
    if (signatureHasPrefix) {
      signatureV += 4
    }
  }

  signature = (signature.slice(0, -2) + signatureV.toString(16)) as Hex
  return signature
}

export const signSafeTransactionHash = async (
  client: WalletClient<Transport, Chain, Account>,
  hash: Hash
): Promise<Hex> => {
  const signerAddress = client.account.address
  let signature = await client.signMessage({
    message: hash,
    account: client.account,
  })

  return adjustVInSignature('eth_sign', signature, hash, signerAddress)
}
