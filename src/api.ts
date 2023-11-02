import type { Address, Hex, Hash } from 'viem'
import type { EIP3770Address, SafeTransactionData, SafeTransactionDataPartial } from './types.js'
import { getEip3770Address } from './utils/eip-3770.js'

Object.defineProperty(BigInt.prototype, 'toJSON', {
  get() {
    'use strict'
    return () => String(this)
  }
})

export async function sendRequest<T>({
  url,
  method,
  body
}: {
  url: URL | string
  method: 'GET' | 'POST'
  body?: unknown
}): Promise<T> {
  const response = await fetch(url, {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: body ? JSON.stringify(body) : undefined
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let jsonResponse: any
  try {
    jsonResponse = await response.json()
  } catch (error) {
    if (!response.ok) {
      throw new Error(response.statusText)
    }
  }

  if (response.ok) {
    return jsonResponse as T
  }
  if (jsonResponse.data) {
    throw new Error(jsonResponse.data)
  }
  if (jsonResponse.detail) {
    throw new Error(jsonResponse.detail)
  }
  if (jsonResponse.message) {
    console.error(jsonResponse)
    throw new Error(jsonResponse.message)
  }
  if (jsonResponse.nonFieldErrors) {
    throw new Error(jsonResponse.nonFieldErrors)
  }
  if (jsonResponse.delegate) {
    throw new Error(jsonResponse.delegate)
  }
  if (jsonResponse.safe) {
    throw new Error(jsonResponse.safe)
  }
  if (jsonResponse.delegator) {
    throw new Error(jsonResponse.delegator)
  }

  throw new Error(`${response.statusText}\n${JSON.stringify(jsonResponse, null, 2)}`)
}

type ProposeTransactionProps = {
  safeTransactionData: Omit<SafeTransactionData, 'value' |'data'> & Pick<SafeTransactionDataPartial, 'value' | 'data'>
  safeTxHash: Hash
  senderAddress: `${string}:${Address}` | Address
  senderSignature: Hex
  origin?: string
  chainId?: number
}

export class ApiClient {
  #url: URL | string
  safeAddress: EIP3770Address | Address
  chainId: number
  constructor({ url, safeAddress, chainId }: { url: URL | string; safeAddress: EIP3770Address | Address, chainId: number }) {
    this.#url = new URL('/api', url)
    this.safeAddress = safeAddress
    this.chainId = chainId
  }
  async proposeTransaction({
    safeTransactionData,
    senderAddress,
    safeTxHash,
    origin,
    senderSignature,
    chainId
  }: ProposeTransactionProps) {
    const { address: safeAddress } = getEip3770Address({
      fullAddress: this.safeAddress,
      chainId: chainId ?? this.chainId
    })

    const sender = getEip3770Address({
      fullAddress: senderAddress,
      chainId: chainId ?? this.chainId
    })

    const { address: to } = getEip3770Address({
      fullAddress: safeTransactionData.to,
      chainId: chainId ?? this.chainId
    })

    const body = {
      ...safeTransactionData,
      contractTransactionHash: safeTxHash,
      sender: sender.address,
      signature: senderSignature,
      origin,
      to,
      value: safeTransactionData.value ?? 0n
    }
  

    return sendRequest({
      url: `${this.#url}/v1/safes/${safeAddress}/multisig-transactions/`,
      method: 'POST',
      body
    })
  }
}
