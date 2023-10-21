import {
  Account,
  Address,
  Chain,
  Hash,
  Hex,
  Transport,
  WalletClient,
} from 'viem'
import { signSafeTransactionHash } from './signSafeTransactionHash.js'

export type WalletSafeActions = {
  signSafeTransactionHash: (hash: Hash) => Promise<Hex>
}

export const walletSafeActions = <TAccount extends Account>(): ((
  client: WalletClient<Transport, Chain, TAccount>
) => WalletSafeActions) => {
  return (client) => ({
    signSafeTransactionHash: (args) => signSafeTransactionHash(client, args),
  })
}
