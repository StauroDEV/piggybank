import { SafeInfoResponse, SafeMultisigTransactionResponse } from '../src/types.js'

// ========================================
// TEST TRANSACTION DATA
// ========================================

// Example safe:
export const EXAMPLE_SAFE_INFO_RESPONSE: SafeInfoResponse = {
  address: '0xbcA814Ee6E571d0BbC335b4e3869F89E532Ba8B8',
  nonce: 1,
  threshold: 1,
  owners: ['0xD7a0ca30F71cFDF45534B058c567a5FaE6C33846'],
  masterCopy: '0xfb1bffC9d739B8D520DaF37dF666da4C687191EA',
  modules: [],
  fallbackHandler: '0x017062a1dE2FE6b99BE3d9d37841FeD19F573804',
  guard: '0x0000000000000000000000000000000000000000',
  version: '1.3.0+L2',
}

export const NONCE_0 = 0
export const NONCE_1 = 1

// For nonce = 0
export const TEST_TRANSACTION_HASH_0 = '0xff325d5c14219e7fcf23ccec94d504384404adbfcfef0c846600876a6ef2d832'

export const MULTISIG_TRANSACTION_TEST_RESPONSE_0: SafeMultisigTransactionResponse = {
  safe: '0xbcA814Ee6E571d0BbC335b4e3869F89E532Ba8B8',
  to: '0xD7a0ca30F71cFDF45534B058c567a5FaE6C33846',
  value: '10000000000000000',
  data: null,
  operation: 0,
  gasToken: '0x0000000000000000000000000000000000000000',
  safeTxGas: 0,
  baseGas: 0,
  gasPrice: '0',
  refundReceiver: '0x0000000000000000000000000000000000000000',
  nonce: 0,
  executionDate: '2024-02-03T15:42:36Z',
  submissionDate: '2024-02-03T15:26:43.618302Z',
  modified: '2024-02-03T15:42:43.868176Z',
  blockNumber: 5211894,
  transactionHash: '0x6923496a7193d27e527d6b365ea65786e83bc1452c75e302e6f2c6563526ce7e',
  safeTxHash: '0xff325d5c14219e7fcf23ccec94d504384404adbfcfef0c846600876a6ef2d832',
  proposer: '0xD7a0ca30F71cFDF45534B058c567a5FaE6C33846',
  executor: '0xD7a0ca30F71cFDF45534B058c567a5FaE6C33846',
  isExecuted: true,
  isSuccessful: true,
  ethGasPrice: '5284136118',
  maxFeePerGas: '9994182118',
  maxPriorityFeePerGas: '100000',
  gasUsed: 80822,
  fee: '427074449328996',
  origin: '{}',
  dataDecoded: null,
  confirmationsRequired: 1,
  confirmations: [
    {
      owner: '0xD7a0ca30F71cFDF45534B058c567a5FaE6C33846',
      submissionDate: '2024-02-03T15:26:43.684875Z',
      transactionHash: null,
      signature: '0x1cf589758060307d1a6209ff2239bacb1933231bbb7d1b97909049f4e818a26322aa1ab19291ba78685bd798a1438ccdf4da63def4cd2bf0ef02e92fd7fa8afa1b',
      signatureType: 'EOA',
    },
  ],
  trusted: true,
  signatures: '0x1cf589758060307d1a6209ff2239bacb1933231bbb7d1b97909049f4e818a26322aa1ab19291ba78685bd798a1438ccdf4da63def4cd2bf0ef02e92fd7fa8afa1b',
}

export const MULTISIG_TRANSACTION_TEST_RESPONSE_1: SafeMultisigTransactionResponse = {
  safe: '0xbcA814Ee6E571d0BbC335b4e3869F89E532Ba8B8',
  to: '0xD7a0ca30F71cFDF45534B058c567a5FaE6C33846',
  value: '20000000000000000',
  data: null,
  operation: 0,
  gasToken: '0x0000000000000000000000000000000000000000',
  safeTxGas: 0,
  baseGas: 0,
  gasPrice: '0',
  refundReceiver: '0x0000000000000000000000000000000000000000',
  nonce: 1,
  executionDate: null,
  submissionDate: '2024-02-03T16:54:00.907184Z',
  modified: '2024-02-03T16:54:00.990665Z',
  blockNumber: null,
  transactionHash: null,
  safeTxHash: '0xb199f858df683d77591642442e02610bb81b5a418acef3237095be495b7988ae',
  proposer: '0xD7a0ca30F71cFDF45534B058c567a5FaE6C33846',
  executor: null,
  isExecuted: false,
  isSuccessful: null,
  ethGasPrice: null,
  maxFeePerGas: null,
  maxPriorityFeePerGas: null,
  gasUsed: null,
  fee: null,
  origin: '{}',
  dataDecoded: null,
  confirmationsRequired: 1,
  confirmations: [{
    owner: '0xD7a0ca30F71cFDF45534B058c567a5FaE6C33846',
    submissionDate: '2024-02-03T16:54:00.990665Z',
    transactionHash: null,
    signature: '0x54d3e09114ef529192072b296bb5d254f05dbcba2bb54bd2fee7bf3901a74ab9746b0e1134d10fa435a87015a124ca918c8cf16838c1303e98d06462e0bdb7b01b',
    signatureType: 'EOA',
  }],
  trusted: true,
  signatures: null,
}
