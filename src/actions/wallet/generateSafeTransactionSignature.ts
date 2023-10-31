import { zeroAddress, type Account, type Address, type Chain, type Hex, type Transport, type WalletClient } from 'viem'
import { SafeTransactionData, SafeTransactionDataPartial } from '../../types.js'

export type SignSafeTransactionHashArgs = Pick<
  SafeTransactionData,
  'to' | 'operation' | 'gasPrice' | 'safeTxGas' | 'baseGas'
> &
  Pick<
    SafeTransactionDataPartial,
    'value' | 'data' | 'gasToken' | 'refundReceiver' | 'nonce'
  >

export const generateSafeTransactionSignature = async (
  client: WalletClient<Transport, Chain, Account>,
  safeAddress: Address,
  {
    to,
    value,
    data,
    operation,
    safeTxGas,
    baseGas,
    gasPrice,
    gasToken,
    refundReceiver,
    nonce,
  }: SignSafeTransactionHashArgs
): Promise<Hex> => {
  const signerAddress = client.account.address
  return await client.signTypedData({
    types: {
      EIP712Domain: [
        {
          type: "uint256",
          name: "chainId",
        },
        {
          type: "address",
          name: "verifyingContract",
        },
      ],
      SafeTx: [
        { name: "to", type: "address" },
        { name: "value", type: "uint256" },
        { name: "data", type: "bytes" },
        { name: "operation", type: "uint8" },
        { name: "safeTxGas", type: "uint256" },
        { name: "baseGas", type: "uint256" },
        { name: "gasPrice", type: "uint256" },
        { name: "gasToken", type: "address" },
        { name: "refundReceiver", type: "address" },
        { name: "nonce", type: "uint256" },
      ],
    },
    primaryType: "SafeTx",
    domain: {
      chainId: BigInt(client.chain.id),
      verifyingContract: safeAddress,
    },
    message: {
      to: to,
      value: value ?? 0n,
      data: data ?? "0x",
      operation: operation ?? 0,
      safeTxGas: safeTxGas ?? 0,
      baseGas: baseGas ?? 0,
      gasPrice: gasPrice ?? 0n,
      gasToken: gasToken ?? zeroAddress,
      refundReceiver: refundReceiver ?? zeroAddress,
      nonce: nonce ?? 0n,
    },
  })

}
