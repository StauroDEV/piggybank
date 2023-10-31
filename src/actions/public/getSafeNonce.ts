import { Address, PublicClient } from 'viem'
import { safeAbi } from '../../constants.js'

export const getSafeNonce = async (publicClient: PublicClient, safeAddress: Address): Promise<bigint> => {
  return await publicClient.readContract({
    abi: safeAbi,
    functionName: 'nonce',
    address: safeAddress,
  })
}
