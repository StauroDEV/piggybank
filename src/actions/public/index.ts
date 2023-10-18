import type { Address, Hash, PublicClient } from 'viem'
import {
  EstimateSafeTransactionGasArgs,
  estimateSafeTransactionGas,
} from './estimateSafeTransactionGas.js'
import {
  GetSafeTransactionHashArgs,
  getSafeTransactionHash,
} from './getSafeTransactionHash.js'

export type PublicSafeActions = {
  estimateSafeTransactionGas: (
    args: EstimateSafeTransactionGasArgs
  ) => Promise<bigint>
  getSafeTransactionHash: (args: GetSafeTransactionHashArgs) => Promise<Hash>
}

export const publicSafeActions = (
  safeAddress: Address
): ((client: PublicClient) => PublicSafeActions) => {
  return (client: PublicClient) => ({
    estimateSafeTransactionGas: (args) =>
      estimateSafeTransactionGas(client, safeAddress, args),
    getSafeTransactionHash: (args) =>
      getSafeTransactionHash(client, safeAddress, args),
  })
}
