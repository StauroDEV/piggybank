import type { Address, Hash, Hex } from 'viem'

export type SafeVersion = '1.4.1' | '1.3.0' | '1.0.0'

export enum OperationType {
  Call, // 0
  DelegateCall, // 1
}

export interface MetaTransactionData {
  to: Address
  value: bigint
  data: Hex
  operation: OperationType
}

export interface SafeTransactionData extends MetaTransactionData {
  operation: OperationType
  safeTxGas: bigint
  baseGas: bigint
  gasPrice: bigint
  gasToken: Address
  refundReceiver: Address
  nonce: bigint
}

export type SafeTransactionDataPartial = Partial<SafeTransactionData>

export interface SafeSignature {
  readonly signer: Address
  readonly data: Hex
  staticPart(): string
  dynamicPart(): string
}

export interface SafeTransaction {
  readonly data: SafeTransactionData
  readonly signatures: Map<string, SafeSignature>
  addSignature(signature: SafeSignature): void
  encodedSignatures(): Hex
}

export interface Eip3770Address {
  prefix: string
  address: string
}

export interface SafeTransactionEIP712Args {
  safeAddress: Address
  safeVersion: SafeVersion
  chainId: number
  safeTransactionData: SafeTransactionData
}

export interface Eip712MessageTypes {
  EIP712Domain: {
    type: string
    name: string
  }[]
  SafeTx: {
    type: string
    name: string
  }[]
}

export interface GenerateTypedData {
  types: Eip712MessageTypes
  domain: {
    chainId?: number
    verifyingContract: Address
  }
  primaryType: string
  message: {
    to: Address
    value: bigint
    data: string
    operation: OperationType
    safeTxGas: bigint
    baseGas: bigint
    gasPrice: bigint
    gasToken: Address
    refundReceiver: string
    nonce: number
  }
}

export type SafeMultisigConfirmationResponse = {
  readonly owner: string
  readonly submissionDate: string
  readonly transactionHash?: Hash
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
  readonly executor?: string
  readonly isExecuted: boolean
  readonly isSuccessful?: boolean
  readonly ethGasPrice?: string
  readonly gasUsed?: number
  readonly fee?: string
  readonly origin: string
  readonly dataDecoded?: string
  readonly confirmationsRequired: number
  readonly confirmations?: SafeMultisigConfirmationResponse[]
  readonly trusted: boolean
  readonly signatures?: string
}

export interface RelayTransaction {
  target: string
  encodedTransaction: string
  chainId: number
  options?: MetaTransactionOptions
}

export interface MetaTransactionOptions {
  gasLimit?: string
  gasToken?: Address
  isSponsored?: boolean
}

export interface Eip3770Address {
  prefix: string
  address: string
}

export type SafeTransactionOptionalProps = Pick<
  SafeTransactionDataPartial,
  'safeTxGas' | 'baseGas' | 'gasPrice' | 'gasToken' | 'refundReceiver' | 'nonce'
>

export type SafeTransactionRequiredProps = Pick<
  SafeTransactionData,
  'safeTxGas' | 'to' | 'operation' | 'gasPrice' | 'baseGas' | 'nonce'
>

export interface CreateTransactionProps {
  /** safeTransactionData - The transaction or transaction array to process */
  safeTransactionData: SafeTransactionDataPartial | MetaTransactionData[]
  /** options - The transaction array optional properties */
  options?: SafeTransactionOptionalProps
  /** onlyCalls - Forces the execution of the transaction array with MultiSendCallOnly contract */
  onlyCalls?: boolean
}
