import {
  Address,
  Hex,
  PublicClient,
  Transport,
  encodeFunctionData,
  CallExecutionError,
  RpcRequestError,
} from 'viem'
import {
  simulateTxAccessorAbi,
  safeAbi,
  simulateTxAccessorAddress,
} from '../../constants.js'
import type {
  SafeTransactionData,
  SafeTransactionDataPartial,
} from '../../types.js'

function decodeSafeTxGas(data: Hex): bigint {
  return BigInt('0x' + data.slice(184).slice(0, 10))
}

export type EstimateSafeTransactionGasArgs = Pick<
  SafeTransactionData,
  'to' | 'operation'
> &
  Pick<SafeTransactionDataPartial, 'value' | 'data'>

export const estimateSafeTransactionGas = async (
  client: PublicClient<Transport>,
  safeAddress: Address,
  { to, data, operation, value }: EstimateSafeTransactionGasArgs
): Promise<bigint> => {
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

  try {
    const { data: encodedResponse } = await client.call({
      to: safeAddress,
      data: safeFunctionToEstimate,
      value: 0n,
    })

    if (!encodedResponse) throw new Error('Could not estimate gas')

    return decodeSafeTxGas(encodedResponse)
  } catch (e) {
    return decodeSafeTxGas(
      (
        ((e as CallExecutionError).cause.cause as RpcRequestError).cause as {
          data: Hex
        }
      ).data
    )
  }
}
