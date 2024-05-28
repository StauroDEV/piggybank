import { Account, Address, Chain, Hex, Transport, WalletClient } from 'viem'
import { SignSafeTransactionHashArgs, generateSafeTransactionSignature } from './generateSafeTransactionSignature.js'
import { EIP3770Address } from '../../types.js'

export type WalletSafeActions = {
  generateSafeTransactionSignature: (hash: SignSafeTransactionHashArgs) => Promise<Hex>
}

export const walletSafeActions = (
  safeAddress: EIP3770Address | Address,
): ((client: WalletClient<Transport, Chain, Account>) => WalletSafeActions) => {
  return client => ({ generateSafeTransactionSignature: args => generateSafeTransactionSignature(client, safeAddress, args) })
}

export { generateSafeTransactionSignature }
