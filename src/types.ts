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