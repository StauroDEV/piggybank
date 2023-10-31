import { Account, Address, Chain, Hex, Transport, WalletClient } from 'viem'
import { SignSafeTransactionHashArgs, generateSafeTransactionSignature } from './generateSafeTransactionSignature.js'

export type WalletSafeActions = {
  generateSafeTransactionSignature: (hash: SignSafeTransactionHashArgs) => Promise<Hex>
}

export const walletSafeActions = (safeAddress: Address): ((client: WalletClient<Transport, Chain, Account>) => WalletSafeActions) => {
  return (client) => ({
    generateSafeTransactionSignature: (args) => generateSafeTransactionSignature(client, safeAddress, args),
  })
}

export { generateSafeTransactionSignature }
