import { SafeInfoResponse, SafeMultisigTransactionResponse } from "../src/types.js"

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