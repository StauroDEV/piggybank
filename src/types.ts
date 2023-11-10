import type { Address, Hex } from 'viem'

export type SafeVersion = '1.4.1' | '1.3.0'

export enum OperationType {
  Call, // 0
  DelegateCall // 1
}

export type SafeTransactionDataPartial = Partial<SafeTransactionData>

export interface Eip3770AddressInterface {
  prefix: string
  address: Address
}

export type EIP3770Address = `${string}:${Address}`

export type ArgsWithChainId<T = unknown> = T & { chainId?: number }

export type SafeTransactionData = {
  to: Address | EIP3770Address
  value: bigint
  data: Hex
  operation: OperationType
  nonce: bigint
  safeTxGas: bigint
  baseGas: bigint
  gasPrice?: bigint
  gasToken?: Address
  refundReceiver?: Address
}

export type SafeInfoResponse = {
  readonly address: string
  readonly nonce: number
  readonly threshold: number
  readonly owners: string[]
  readonly masterCopy: string
  readonly modules: string[]
  readonly fallbackHandler: string
  readonly guard: string
  readonly version: string
}

export type SafeMultisigConfirmationResponse = {
  readonly owner: string
  readonly submissionDate: string
  readonly transactionHash?: string
  readonly confirmationType?: string
  readonly signature: string
  readonly signatureType?: string
}

export type SafeMultisigConfirmationListResponse = {
  readonly count: number
  readonly next?: string
  readonly previous?: string
  readonly results: SafeMultisigConfirmationResponse[]
}

export type SafeMultisigTransactionResponse = {
  readonly safe: string
  readonly to: string
  readonly value: string
  readonly data?: string
  readonly operation: number
  readonly gasToken: string
  readonly safeTxGas: number
  readonly baseGas: number
  readonly gasPrice: string
  readonly refundReceiver?: string
  readonly nonce: number
  readonly executionDate: string
  readonly submissionDate: string
  readonly modified: string
  readonly blockNumber?: number
  readonly transactionHash: string
  readonly safeTxHash: string
  readonly proposer: string // ! safe-core-sdk-types file does not include this, but api returns it
  readonly executor?: string
  readonly isExecuted: boolean
  readonly isSuccessful?: boolean
  readonly ethGasPrice?: string
  readonly maxFeePerGas: string // ! safe-core-sdk-types file does not include this, but api returns it
  readonly maxPriorityFeePerGas: string // ! safe-core-sdk-types file does not include this, but api returns it
  readonly gasUsed?: number
  readonly fee?: string
  readonly origin: string
  readonly dataDecoded?: string
  readonly confirmationsRequired: number
  readonly confirmations?: SafeMultisigConfirmationResponse[]
  readonly trusted: boolean
  readonly signatures?: string
}

export type SafeMultisigTransactionListResponse = {
  readonly count: number
  readonly next?: string
  readonly previous?: string
  readonly results: SafeMultisigTransactionResponse[]
  readonly countUniqueNonce: number // ! api-kit safeTransactionServiceTypes file does not include this, but api returns it
}