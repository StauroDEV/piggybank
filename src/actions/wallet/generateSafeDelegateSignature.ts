import { Account, Address } from 'viem/accounts'
import { WalletClient, Transport, Chain, Hex, padHex } from 'viem'
import { ArgsWithChainId } from '../../types.js'

export type SafeDelegateSignatureArgs = ArgsWithChainId<{
  delegate: Address
  version?: '1' | '2'
}>

export async function generateSafeDelegateSignature(client: WalletClient<Transport, Chain, Account>, { delegate, chainId, version = '2' }: SafeDelegateSignatureArgs): Promise<Hex> {
  const totp = Math.floor(Date.now() / 1000 / 3600)
  const paddedAddress = padHex(delegate, { dir: 'right', size: 32 })

  if (version === '2') {
    return await client.signTypedData({
      types: {
        EIP712Domain: [
          { name: 'name', type: 'string' },
          { name: 'version', type: 'string' },
          { name: 'chainId', type: 'uint256' },
        ],
        Delegate: [
          { name: 'delegateAddress', type: 'bytes32' },
          { name: 'totp', type: 'uint256' },
        ],
      },
      primaryType: 'Delegate',
      domain: {
        name: 'Safe Transaction Service',
        version: '1.0',
        chainId: BigInt(chainId || client.chain.id),
      },
      message: {
        delegateAddress: paddedAddress,
        totp: BigInt(totp),
      },

    })
  }
  else {
    return await client.signMessage({ message: delegate + totp })
  }
}
