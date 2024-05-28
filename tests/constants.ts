import { Address } from 'viem'
import { NetworkType } from '../src/utils/networks.js'
import { EIP3770Address } from '../src/types.js'

// ========================================
// TEST ACCOUNT VARIABLES
// ========================================

export const ACCOUNTS = [
  '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266', '0x70997970C51812dc3A010C7d01b50e0d17dc79C8', '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC', '0x90F79bf6EB2c4f870365E785982E1f101E93b906', '0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65', '0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc', '0x976EA74026E726554dB657fA54763abd0C3a0aa9', '0x14dC79964da2C08b23698B3D3cc7Ca32193d9955', '0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f', '0xa0Ee7A142d267C1f36714E4a8F75612F20a79720',
] as const

// Named accounts
export const [ALICE, BOB] = ACCOUNTS

// ========================================
// TEST ENV VARIABLES
// ========================================

export const TEST_NETWORK_TYPE = (process.env.VITE_TEST_NETWORK_TYPE ?? 'ETHEREUM_sepolia') as NetworkType

if (!process.env.VITE_EXAMPLE_SAFE) {
  throw new Error('Missing environment variable "VITE_EXAMPLE_SAFE"')
}

export const EXAMPLE_SAFE = process.env.VITE_EXAMPLE_SAFE as EIP3770Address
export const [EXAMPLE_SAFE_PREFIX, EXAMPLE_SAFE_ADDRESS] = EXAMPLE_SAFE.split(':')

if (!process.env.VITE_TEST_ADDRESS) {
  throw new Error('Missing environment variable "VITE_TEST_ADDRESS"')
}

export const TEST_ADDRESS = process.env.VITE_TEST_ADDRESS as Address

if (!process.env.VITE_ANVIL_FORK_URL) {
  throw new Error('Missing environment variable "VITE_ANVIL_FORK_URL"')
}

export const FORK_URL = process.env.VITE_ANVIL_FORK_URL

if (!process.env.VITE_ANVIL_BLOCK_NUMBER) {
  throw new Error('Missing environment variable "VITE_ANVIL_BLOCK_NUMBER"')
}

export const FORK_BLOCK_NUMBER = BigInt(
  Number(process.env.VITE_ANVIL_BLOCK_NUMBER),
)
