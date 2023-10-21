import { Account, Chain, Hash, Hex, Transport, WalletClient } from 'viem'
import { signSafeTransactionHash } from './signSafeTransactionHash.js'

export type WalletSafeActions = {
  signSafeTransactionHash: (hash: Hash) => Promise<Hex>
}

export const walletSafeActions = (): ((client: WalletClient<Transport, Chain, Account>) => WalletSafeActions) => {
  return (client) => ({
    signSafeTransactionHash: (args) => signSafeTransactionHash(client, args),
  })
}
