import { Address, PublicClient } from 'viem'
import { safeAbi } from '../../constants.js'
import { ArgsWithChainId, EIP3770Address } from '../../types.js'
import { getEip3770Address } from '../../utils.js'

export const getSafeOwners = async (
  client: PublicClient,
  safeAddress: EIP3770Address | Address,
  args: ArgsWithChainId = {},
): Promise<Address[]> => {
  const { address } = getEip3770Address({ fullAddress: safeAddress, chainId: args.chainId || client.chain!.id })

  return await client.readContract({
    abi: safeAbi,
    functionName: 'getOwners',
    address,
  }) as Address[]
}
