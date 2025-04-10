import type { Address, Hex } from 'viem'

export type SafeVersion = '1.4.1' | '1.3.0'

export enum OperationType {
  Call, // 0
  DelegateCall, // 1
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
  safeTxGas?: bigint
  baseGas?: bigint
  gasPrice?: bigint
  gasToken?: Address
  refundReceiver?: Address
}

export type SafeInfoResponse = {
  readonly address: Address
  readonly nonce: number | string
  readonly threshold: number
  readonly owners: Address[]
  readonly masterCopy: Address
  readonly modules: Address[]
  readonly fallbackHandler: Address
  readonly guard: Address
  readonly version: string
}

export type SafeMultisigConfirmationResponse = {
  readonly owner: Address
  readonly submissionDate: string
  readonly transactionHash: Hex | null
  readonly confirmationType?: string
  readonly signature: Hex
  readonly signatureType?: string
}

export type SafeMultisigConfirmationListResponse = {
  readonly count: number
  readonly next?: string
  readonly previous?: string
  readonly results: SafeMultisigConfirmationResponse[]
}

export type SafeMultisigTransactionResponse = {
  readonly safe: Address
  readonly to: Address
  readonly value: string
  readonly data: Hex | null
  readonly operation: number
  readonly gasToken: string
  readonly safeTxGas: number
  readonly baseGas: number
  readonly gasPrice: string
  readonly refundReceiver?: Address
  readonly nonce: number
  readonly executionDate: string | null
  readonly submissionDate: string
  readonly modified: string
  readonly blockNumber: number | null
  readonly transactionHash: Hex | null
  readonly safeTxHash: Hex
  readonly proposer: Address // ! safe-core-sdk-types file does not include this, but api returns it
  readonly executor: Address | null
  readonly isExecuted: boolean
  readonly isSuccessful: boolean | null
  readonly ethGasPrice: string | null
  readonly maxFeePerGas: string | null // ! safe-core-sdk-types file does not include this, but api returns it
  readonly maxPriorityFeePerGas: string | null // ! safe-core-sdk-types file does not include this, but api returns it
  readonly gasUsed: number | null
  readonly fee: string | null
  readonly origin: string
  readonly dataDecoded: string | null
  readonly confirmationsRequired: number
  readonly confirmations?: SafeMultisigConfirmationResponse[]
  readonly trusted: boolean
  readonly signatures: Hex | null
  readonly proposedByDelegate: Address | null
}

export type SafeMultisigTransactionListResponse = {
  readonly count: number
  readonly next?: string
  readonly previous?: string
  readonly results: SafeMultisigTransactionResponse[]
  readonly countUniqueNonce: number // ! api-kit safeTransactionServiceTypes file does not include this, but api returns it
}

export type SignatureResponse = {
  readonly signature: Hex
}
