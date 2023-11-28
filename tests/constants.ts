import { Address } from "viem"
import { NetworkType } from "../src/utils/networks.js"
import { EIP3770Address, SafeInfoResponse, SafeMultisigTransactionResponse } from "../src/types.js"

// ========================================
// TEST ACCOUNT VARIABLES
// ========================================

export const ACCOUNTS = [
  '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266', '0x70997970C51812dc3A010C7d01b50e0d17dc79C8', '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC', '0x90F79bf6EB2c4f870365E785982E1f101E93b906', '0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65', '0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc', '0x976EA74026E726554dB657fA54763abd0C3a0aa9', '0x14dC79964da2C08b23698B3D3cc7Ca32193d9955', '0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f', '0xa0Ee7A142d267C1f36714E4a8F75612F20a79720'
] as const

// Named accounts
export const [ALICE, BOB] = ACCOUNTS

// ========================================
// TEST ENV VARIABLES
// ========================================

if (!process.env.VITE_TEST_NETWORK_TYPE) {
  throw new Error('Missing environment variable "VITE_TEST_NETWORK_TYPE"')
}

export const TEST_NETWORK_TYPE = (process.env.VITE_TEST_NETWORK_TYPE ?? 'ETHEREUM_GOERLI') as NetworkType

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

// ========================================
// TEST TRANSACTION DATA
// ========================================

// Example safe: 
export const EXAMPLE_SAFE_INFO_RESPONSE: SafeInfoResponse = {
  address: "0x156c02168925748D29132Ae680f76E3A9e20EEe0",
  nonce: 1,
  threshold: 1,
  owners: [
    "0xD7a0ca30F71cFDF45534B058c567a5FaE6C33846"
  ],
  masterCopy: "0xfb1bffC9d739B8D520DaF37dF666da4C687191EA",
  modules: [],
  fallbackHandler: "0x017062a1dE2FE6b99BE3d9d37841FeD19F573804",
  guard: "0x0000000000000000000000000000000000000000",
  version: "1.3.0+L2"
}

// Example transaction: https://sepolia.etherscan.io/tx/0xdade8c7d02460289c76e05f2888e797d21dda4404cb867c988cc0a0e22ff7f60
export const MULTISIG_TRANSACTION_TEST_RESPONSE: SafeMultisigTransactionResponse = {
  safe: "0x156c02168925748D29132Ae680f76E3A9e20EEe0",
  to: "0xD7a0ca30F71cFDF45534B058c567a5FaE6C33846",
  value: "10000000000000000",
  data: null,
  operation: 0,
  gasToken: "0x0000000000000000000000000000000000000000",
  safeTxGas: 0,
  baseGas: 0,
  gasPrice: "0",
  refundReceiver: "0x0000000000000000000000000000000000000000",
  nonce: 0,
  executionDate: "2023-11-10T09:21:48Z",
  submissionDate: "2023-11-10T09:21:05.933593Z",
  modified: "2023-11-10T09:21:48Z",
  blockNumber: 4665386,
  transactionHash: "0xdade8c7d02460289c76e05f2888e797d21dda4404cb867c988cc0a0e22ff7f60",
  safeTxHash: "0x8759267d96af12fbee209a50a5a12a993fdbd81cd8692893a24de5e82fdb52a7",
  proposer: "0xD7a0ca30F71cFDF45534B058c567a5FaE6C33846",
  executor: "0xD7a0ca30F71cFDF45534B058c567a5FaE6C33846",
  isExecuted: true,
  isSuccessful: true,
  ethGasPrice: "529597",
  maxFeePerGas: "529597",
  maxPriorityFeePerGas: "529597",
  gasUsed: 77013,
  fee: "40785853761",
  origin: "{}",
  dataDecoded: null,
  confirmationsRequired: 1,
  confirmations: [
    {
      owner: "0xD7a0ca30F71cFDF45534B058c567a5FaE6C33846",
      submissionDate: "2023-11-10T09:21:48Z",
      transactionHash: null,
      signature: "0x000000000000000000000000d7a0ca30f71cfdf45534b058c567a5fae6c33846000000000000000000000000000000000000000000000000000000000000000001",
      signatureType: "APPROVED_HASH"
    }
  ],
  trusted: true,
  signatures: "0x000000000000000000000000d7a0ca30f71cfdf45534b058c567a5fae6c33846000000000000000000000000000000000000000000000000000000000000000001"
}