import { Address, Hex, PublicClient, Transport, encodeFunctionData, CallExecutionError, RpcRequestError } from 'viem'
import { simulateTxAccessorAbi, safeAbi, simulateTxAccessorAddress } from '../../constants.js'
import type { EIP3770Address, SafeTransactionData, SafeTransactionDataPartial } from '../../types.js'
import { getEip3770Address } from '../../utils/eip-3770.js'

function decodeSafeTxGas(data: Hex): bigint {
  return BigInt('0x' + data.slice(184).slice(0, 10))
}

export type EstimateSafeTransactionGasArgs = Pick<SafeTransactionData, 'to' | 'operation'> &
  Pick<SafeTransactionDataPartial, 'value' | 'data'> & { chainId?: number }

export const estimateSafeTransactionGas = async (
  client: PublicClient<Transport>,
  safeAddress: EIP3770Address | Address,
  { to: _to, data, operation, value, chainId }: EstimateSafeTransactionGasArgs,
): Promise<bigint> => {
  const { address: to } = getEip3770Address({ fullAddress: _to, chainId: chainId || client.chain!.id })

  const transactionDataToEstimate = encodeFunctionData({
    abi: simulateTxAccessorAbi,
    functionName: 'simulate',
    args: [to, value ?? 0n, data ?? '0x', operation],
  })

  const safeFunctionToEstimate = encodeFunctionData({
    abi: safeAbi,
    functionName: 'simulateAndRevert',
    args: [simulateTxAccessorAddress, transactionDataToEstimate],
  })

  const { address } = getEip3770Address({ fullAddress: safeAddress, chainId: chainId || client.chain!.id })

  try {
    const { data: encodedResponse } = await client.call({
      to: address,
      data: safeFunctionToEstimate,
      value: 0n,
    })

    if (!encodedResponse) throw new Error('Could not estimate gas')

    return decodeSafeTxGas(encodedResponse)
  } catch (e) {
    if (e instanceof CallExecutionError) {
      const gasError = e.walk((e) => e instanceof RpcRequestError)

      if (gasError === null) throw e

      return decodeSafeTxGas(
        (
          gasError?.cause as {
            data: Hex
          }
        ).data,
      )
    } else throw e
  }
}
