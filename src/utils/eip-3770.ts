import { getAddress, isAddress } from 'viem/utils'
import type { EIP3770Address, Eip3770AddressInterface } from '../types.js'
import type { Address } from 'viem'
import { networkShortNames } from './networks.js'

export function parseEip3770Address(fullAddress: EIP3770Address | Address): Eip3770AddressInterface {
  const parts = fullAddress.split(':')
  const address = getAddress(parts.length > 1 ? parts[1] : parts[0])
  const prefix = parts.length > 1 ? parts[0] : ''
  return { prefix, address }
}

function validateEthereumAddress(address: string): void {
  const isValidAddress = isAddress(address)
  if (!isValidAddress) {
    throw new Error(`Invalid Ethereum address ${address}`)
  }
}

function isValidEip3770NetworkPrefix(prefix: string): boolean {
  return networkShortNames.some(({ shortName }) => shortName === prefix)
}

function getEip3770NetworkPrefixFromChainId(chainId: number): string {
  const network = networkShortNames.find(network => chainId === network.chainId)
  if (!network) {
    throw new Error('No network prefix supported for the current chainId')
  }
  return network.shortName
}

function validateEip3770NetworkPrefix(prefix: string, currentChainId: number): void {
  const isCurrentNetworkPrefix = prefix === getEip3770NetworkPrefixFromChainId(currentChainId)
  if (!isValidEip3770NetworkPrefix(prefix) || !isCurrentNetworkPrefix) {
    throw new Error('The network prefix must match the current network')
  }
}

export function getEip3770Address({
  fullAddress,
  chainId,
}: {
  fullAddress: EIP3770Address | Address
  chainId: number
}): Eip3770AddressInterface {
  const { address, prefix } = parseEip3770Address(fullAddress)
  validateEthereumAddress(address)
  if (prefix) {
    validateEip3770NetworkPrefix(prefix, chainId)
  }
  return { address, prefix }
}
