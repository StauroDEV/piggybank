import { zeroAddress, type Address, type Hash, type PublicClient, type Transport } from 'viem'
import type { ArgsWithChainId, EIP3770Address, SafeTransactionData, SafeTransactionDataPartial } from '../../types.js'
import { safeAbi } from '../../constants.js'
import { getEip3770Address } from '../../utils/eip-3770.js'

export type GetSafeTransactionHashArgs = ArgsWithChainId<
  Pick<SafeTransactionData, 'to' | 'operation' | 'gasPrice' | 'safeTxGas' | 'baseGas'> &
  Pick<SafeTransactionDataPartial, 'value' | 'data' | 'gasToken' | 'refundReceiver' | 'nonce'>
>

export const getSafeTransactionHash = async (
  client: PublicClient<Transport>,
  safeAddress: EIP3770Address | Address,
  {
    to: _to,
    value,
    data,
    operation,
    safeTxGas,
    baseGas,
    gasPrice,
    gasToken,
    refundReceiver,
    nonce,
    chainId,
  }: GetSafeTransactionHashArgs,
): Promise<Hash> => {
  const { address: to } = getEip3770Address({ fullAddress: _to, chainId: chainId || client.chain!.id })
  const { address } = getEip3770Address({ fullAddress: safeAddress, chainId: chainId || client.chain!.id })

  return client.readContract({
    abi: safeAbi,
    address,
    functionName: 'getTransactionHash',
    args: [
      to, value ?? 0n, data ?? '0x', operation, safeTxGas, baseGas, gasPrice ?? 0n, gasToken ?? zeroAddress, refundReceiver ?? zeroAddress, nonce || 0n,
    ],
  })
}
