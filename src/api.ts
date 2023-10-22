import type { Address, Hex, Hash } from 'viem'
import type { SafeTransactionData, SafeTransactionRequiredProps } from './types.js'
import { getEip3770Address } from './utils/eip-3770.js'

Object.defineProperty(BigInt.prototype, 'toJSON', {
  get() {
    'use strict'
    return () => String(this)
  },
})

export async function sendRequest<T>({
  url,
  method,
  body,
}: {
  url: URL | string
  method: 'GET' | 'POST'
  body: unknown
}): Promise<T> {
  const response = await fetch(url, {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

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
  safeTransactionData: SafeTransactionRequiredProps
  safeTxHash: Hash
  senderAddress: `${string}:${Address}` | Address
  senderSignature: Hex
  origin?: string
  chainId: number
}

export class ApiClient {
  #url: URL | string
  safeAddress: Address
  constructor({ url, safeAddress }: { url: URL | string; safeAddress: Address }) {
    this.#url = new URL('/api', url)
    this.safeAddress = safeAddress
  }
  async proposeTransaction({
    safeTransactionData,
    senderAddress,
    safeTxHash,
    origin,
    senderSignature,
    chainId,
  }: ProposeTransactionProps) {
    const safe = await getEip3770Address({
      fullAddress: this.safeAddress,
      chainId,
    })

    const sender = await getEip3770Address({
      fullAddress: senderAddress,
      chainId,
    })

    return sendRequest({
      url: `${this.#url}/v1/safes/${safe.address}/multisig-transactions/`,
      method: 'POST',
      body: {
        ...safeTransactionData,
        contractTransactionHash: safeTxHash,
        sender,
        signature: senderSignature,
        origin,
      },
    })
  }
}
