import type { Address, Hex, Hash } from 'viem'
import type { EIP3770Address, SafeInfoResponse, SafeMultisigTransactionListResponse, SafeMultisigTransactionResponse, SafeTransactionData, SafeTransactionDataPartial, SignatureResponse } from './types.js'
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
  body?: unknown
}): Promise<T> {
  const response = await fetch(url, {
    method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let jsonResponse: any
  try {
    jsonResponse = await response.json()
  }
  catch (error) {
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

export type ProposeTransactionProps = {
  safeTransactionData: Omit<SafeTransactionData, 'value' | 'data'> & Pick<SafeTransactionDataPartial, 'value' | 'data'>
  safeTxHash: Hash
  senderAddress: `${string}:${Address}` | Address
  senderSignature: Hex
  origin?: string
  chainId?: number
}

export type GetPendingTransactionsProps = {
  safeAddress: EIP3770Address | Address
  currentNonce?: number
}

export type GetDelegateProps = Partial<{
  delegateAddress: EIP3770Address | Address
  delegatorAddress: EIP3770Address | Address
  label: string
  limit: string
  offset: string
  chainId: number
}>

export type CreateDelegateProps = {
  delegate: EIP3770Address | Address
  delegator: EIP3770Address | Address
  signature: Hex
  label: string
  version?: '1' | '2'
}

export type SafeDelegateListResponse = {
  readonly count: number
  readonly next?: string
  readonly previous?: string
  readonly results: {
    readonly safe: string
    readonly delegate: string
    readonly delegator: string
    readonly label: string
  }[]
}

export type SafesByOwnersResponse = {
  readonly safes: Address[]
}

export class ApiClient {
  #url: URL | string
  safeAddress: EIP3770Address | Address
  chainId: number
  constructor({ url, safeAddress, chainId }: { url: URL | string, safeAddress: EIP3770Address | Address, chainId: number }) {
    this.#url = new URL('/api', url)
    this.safeAddress = safeAddress
    this.chainId = chainId
  }

  async getSafeInfo(safeAddress: EIP3770Address | Address): Promise<SafeInfoResponse> {
    if (!safeAddress) throw new Error('Invalid Safe address')

    const { address } = getEip3770Address({
      fullAddress: safeAddress,
      chainId: this.chainId,
    })

    return sendRequest({
      url: `${this.#url}/v1/safes/${address}/`,
      method: 'GET',
    })
  }

  async proposeTransaction({
    safeTransactionData,
    senderAddress,
    safeTxHash,
    origin,
    senderSignature,
    chainId,
  }: ProposeTransactionProps) {
    const { address: safeAddress } = getEip3770Address({
      fullAddress: this.safeAddress,
      chainId: chainId ?? this.chainId,
    })

    const sender = getEip3770Address({
      fullAddress: senderAddress,
      chainId: chainId ?? this.chainId,
    })

    const { address: to } = getEip3770Address({
      fullAddress: safeTransactionData.to,
      chainId: chainId ?? this.chainId,
    })

    const body = {
      ...safeTransactionData,
      contractTransactionHash: safeTxHash,
      sender: sender.address,
      signature: senderSignature,
      origin,
      to,
      value: safeTransactionData.value ?? 0n,
    }

    return sendRequest({
      url: `${this.#url}/v1/safes/${safeAddress}/multisig-transactions/`,
      method: 'POST',
      body,
    })
  }

  async confirmTransaction(safeTxHash: string, signature: Hex): Promise<SignatureResponse> {
    if (!safeTxHash) throw new Error('Invalid safeTxHash')

    if (!signature) throw new Error('Invalid signature')

    return sendRequest({
      url: `${this.#url}/v1/multisig-transactions/${safeTxHash}/confirmations/`,
      method: 'POST',
      body: { signature },
    })
  }

  async getTransaction(safeTxHash: string): Promise<SafeMultisigTransactionResponse> {
    return sendRequest({
      url: `${this.#url}/v1/multisig-transactions/${safeTxHash}/`,
      method: 'GET',
    })
  }

  async getMultisigTransactions(safeAddress: EIP3770Address | Address): Promise<SafeMultisigTransactionListResponse> {
    if (!safeAddress) throw new Error('Invalid Safe address')

    const { address } = getEip3770Address({
      fullAddress: safeAddress,
      chainId: this.chainId,
    })

    return sendRequest({
      url: `${this.#url}/v1/safes/${address}/multisig-transactions/`,
      method: 'GET',
    })
  }

  async getPendingTransactions({
    safeAddress,
    currentNonce,
  }: GetPendingTransactionsProps): Promise<SafeMultisigTransactionListResponse[]> {
    if (!safeAddress) throw new Error('Invalid Safe address')

    const { address } = getEip3770Address({
      fullAddress: safeAddress,
      chainId: this.chainId,
    })

    const nonce = currentNonce ?? (await this.getSafeInfo(address)).nonce

    const url = new URL(`${this.#url}/v1/safes/${address}/multisig-transactions/`)

    url.searchParams.set('executed', 'false')
    url.searchParams.set('nonce__gte', nonce.toString())

    return sendRequest({
      url: url.toString(),
      method: 'GET',
    })
  }

  async getDelegates(args?: GetDelegateProps): Promise<SafeDelegateListResponse> {
    const { delegateAddress,
      delegatorAddress,
      label,
      limit,
      offset, chainId } = args ?? {}

    const url = new URL(`${this.#url}/v2/delegates`)

    const { address: safeAddress } = getEip3770Address({
      fullAddress: this.safeAddress,
      chainId: chainId ?? this.chainId,
    })

    url.searchParams.set('safe', safeAddress)

    if (delegateAddress) {
      const { address: delegate } = getEip3770Address({ fullAddress: delegateAddress, chainId: chainId ?? this.chainId })
      url.searchParams.set('delegate', delegate)
    }
    if (delegatorAddress) {
      const { address: delegator } = getEip3770Address({ fullAddress: delegatorAddress, chainId: chainId ?? this.chainId })
      url.searchParams.set('delegator', delegator)
    }
    if (label) {
      url.searchParams.set('label', label)
    }
    if (limit) {
      url.searchParams.set('limit', limit)
    }
    if (offset) {
      url.searchParams.set('offset', offset)
    }
    return sendRequest({
      url: url.toString(),
      method: 'GET',
    })
  }

  async createDelegate(args: CreateDelegateProps): Promise<Omit<CreateDelegateProps, 'version'>> {
    const { address: delegator } = getEip3770Address({ fullAddress: args.delegator, chainId: this.chainId })
    const { address: delegate } = getEip3770Address({ fullAddress: args.delegate, chainId: this.chainId })
    const { address: safe } = getEip3770Address({ fullAddress: this.safeAddress, chainId: this.chainId })

    return sendRequest({
      url: `${this.#url}/v${args.version || '2'}/delegates/`,
      method: 'POST',
      body: { ...args, delegate, delegator, safe },
    })
  }

  async getSafesByOwner(ownerAddress: EIP3770Address | Address): Promise<SafesByOwnersResponse> {
    const { address: owner } = getEip3770Address({
      fullAddress: ownerAddress,
      chainId: this.chainId,
    })

    return sendRequest({
      url: `${this.#url}/v1/owners/${owner}/safes`,
      method: 'GET',
    })
  }
}
