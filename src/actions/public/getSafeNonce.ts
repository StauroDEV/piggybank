import { Address, PublicClient } from 'viem'
import { safeAbi } from '../../constants.js'
import { ArgsWithChainId, EIP3770Address } from '../../types.js'
import { getEip3770Address } from '../../utils/eip-3770.js'

// TODO Add a seperate method for getNextNonce which handles pending transactions

export const getSafeNonce = async (
  client: PublicClient,
  safeAddress: EIP3770Address | Address,
  args: ArgsWithChainId = {},
): Promise<bigint> => {
  const { address } = getEip3770Address({ fullAddress: safeAddress, chainId: args.chainId || client.chain!.id })

  return await client.readContract({
    abi: safeAbi,
    functionName: 'nonce',
    address
  })
}
