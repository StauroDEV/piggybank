import { parseAbi } from 'viem'

export const simulateTxAccessorAbi = [
  {
    inputs: [
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'value', type: 'uint256' },
      { internalType: 'bytes', name: 'data', type: 'bytes' },
      { internalType: 'enum Enum.Operation', name: 'operation', type: 'uint8' },
    ],
    name: 'simulate',
    outputs: [
      { internalType: 'uint256', name: 'estimate', type: 'uint256' },
      { internalType: 'bool', name: 'success', type: 'bool' },
      { internalType: 'bytes', name: 'returnData', type: 'bytes' },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const

export const safeAbi = parseAbi([
  'function simulateAndRevert(address targetContract, bytes memory calldataPayload)',
  'function getTransactionHash(address to, uint256 value, bytes calldata data, uint8 operation, uint256 safeTxGas, uint256 baseGas, uint256 gasPrice, address gasToken, address refundReceiver, uint256 _nonce) public view returns (bytes32)',
  'function execTransaction(address to, uint256 value, bytes calldata data, uint8 operation, uint256 safeTxGas, uint256 baseGas, uint256 gasPrice, address gasToken, address refundReceiver, bytes memory signatures) public payable returns (bool)',
  'function nonce() public view returns (uint256)',
  'function getThreshold() public view returns (uint256)',
])

export const simulateTxAccessorAddress =
  '0x59AD6735bCd8152B84860Cb256dD9e96b85F69Da'

export const safeSingletonAddress = '0xd9Db270c1B5E3Bd161E8c8503c55cEABeE709552'
