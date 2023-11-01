import type { Address, Hash, PublicClient } from 'viem'
import { EstimateSafeTransactionGasArgs, estimateSafeTransactionGas } from './estimateSafeTransactionGas.js'
import { GetSafeTransactionHashArgs, getSafeTransactionHash } from './getSafeTransactionHash.js'
import { EstimateSafeTransactionBaseGasArgs, estimateSafeTransactionBaseGas } from './estimateSafeTransactionBaseGas.js'
import { getSafeNonce } from './getSafeNonce.js'
import { ArgsWithChainId, EIP3770Address } from '../../types.js'

export type PublicSafeActions = {
  estimateSafeTransactionGas: (args: EstimateSafeTransactionGasArgs) => Promise<bigint>
  getSafeTransactionHash: (args: GetSafeTransactionHashArgs) => Promise<Hash>
  estimateSafeTransactionBaseGas: (args: EstimateSafeTransactionBaseGasArgs) => Promise<bigint>
  getSafeNonce: (args?: ArgsWithChainId) => Promise<bigint>
}

export const publicSafeActions = (
  safeAddress: EIP3770Address | Address,
): ((client: PublicClient) => PublicSafeActions) => {
  return (client) => ({
    estimateSafeTransactionGas: (args) => estimateSafeTransactionGas(client, safeAddress, args),
    getSafeTransactionHash: (args) => getSafeTransactionHash(client, safeAddress, args),
    estimateSafeTransactionBaseGas: (args) => estimateSafeTransactionBaseGas(client, safeAddress, args),
    getSafeNonce: (args) => getSafeNonce(client, safeAddress, args),
  })
}

export { estimateSafeTransactionBaseGas, estimateSafeTransactionGas, getSafeTransactionHash, getSafeNonce }
