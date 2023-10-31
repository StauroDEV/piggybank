import { zeroAddress, type Address, type Hash, type PublicClient, type Transport } from 'viem'
import type { SafeTransactionData, SafeTransactionDataPartial } from '../../types.js'
import { safeAbi } from '../../constants.js'

export type GetSafeTransactionHashArgs = Pick<
  SafeTransactionData,
  'to' | 'operation' | 'gasPrice' | 'safeTxGas' | 'baseGas'
> &
  Pick<SafeTransactionDataPartial, 'value' | 'data' | 'gasToken' | 'refundReceiver' | 'nonce'>

export const getSafeTransactionHash = async (
  client: PublicClient<Transport>,
  safeAddress: Address,
  {
    to,
    value,
    data,
    operation,
    safeTxGas,
    baseGas,
    gasPrice,
    gasToken,
    refundReceiver,
    nonce,
  }: GetSafeTransactionHashArgs,
): Promise<Hash> => {
  return client.readContract({
    abi: safeAbi,
    address: safeAddress,
    functionName: 'getTransactionHash',
    args: [
      to,
      value ?? 0n,
      data ?? '0x',
      operation,
      safeTxGas,
      baseGas,
      gasPrice,
      gasToken ?? zeroAddress,
      refundReceiver ?? zeroAddress,
      nonce || 0n,
    ],
  })
}
