import {
  sepolia,
  type Chain,
} from 'viem/chains'

interface NetworkShortName {
  shortName: string
  chainId: number
}

// TODO:
// - Add support for other networks
// - Add support for local & anvil when testing
// https://github.com/ethereum-lists/chains/tree/master/_data/chains
export const networkShortNames: NetworkShortName[] = [
  { chainId: 1, shortName: 'eth' },
  { chainId: 11155111, shortName: 'sep' },
]

const networksByNetworkType = {
  ETHEREUM_SEPOLIA: sepolia,
}

export type NetworkType = keyof typeof networksByNetworkType

type Networks = Record<NetworkType, Chain>

// TODO fix typing when this is used for chain details (see utils.ts for example)
export const networks = networksByNetworkType as Networks
