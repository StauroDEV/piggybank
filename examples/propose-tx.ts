import { http, createPublicClient, createWalletClient, Hex, parseEther } from 'viem'
import { sepolia } from 'viem/chains'
import { publicSafeActions, walletSafeActions } from '../src/actions.js'
import { EIP3770Address, OperationType, SafeTransactionData } from '../src/types.js'
import { ApiClient } from '../src/api.js'
import { privateKeyToAccount } from 'viem/accounts'

const safeAddress = process.env.SAFE_ADDRESS as EIP3770Address

const config = {
  transport: http(),
  chain: sepolia,
} as const

const publicClient = createPublicClient(config).extend(publicSafeActions(safeAddress))

const walletClient = createWalletClient({
  ...config,
  account: privateKeyToAccount(process.env.PK as Hex),
}).extend(walletSafeActions(safeAddress))

const txData: Pick<SafeTransactionData, 'to' | 'operation' | 'value'> = {
  to: process.env.SAFE_TO as EIP3770Address,
  operation: OperationType.Call,
  value: parseEther('0.001'),
}

const nonce = await publicClient.getSafeNonce()

const safeTxHash = await publicClient.getSafeTransactionHash({ ...txData, nonce })

const senderSignature = await walletClient.generateSafeTransactionSignature({ ...txData, nonce })

const apiClient = new ApiClient({ url: 'https://safe-transaction-sepolia.safe.global', safeAddress, chainId: sepolia.id })

await apiClient.proposeTransaction({
  safeTransactionData: { ...txData, nonce },
  senderAddress: walletClient.account.address,
  safeTxHash,
  senderSignature,
  origin: 'Piggybank',
})
