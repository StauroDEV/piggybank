import { http, createPublicClient, parseEther, getAddress, createWalletClient, Hex } from 'viem'
import { goerli } from 'viem/chains'
import { publicSafeActions, walletSafeActions } from '../src/actions.js'
import { OperationType } from '../src/types.js'
import { ApiClient } from '../src/api.js'
import { privateKeyToAccount } from 'viem/accounts'

const safeAddress = getAddress(process.env.SAFE_ADDRESS as Hex)

const publicClient = createPublicClient({
  transport: http(),
  chain: goerli,
}).extend(publicSafeActions(safeAddress))

const walletClient = createWalletClient({
  transport: http(),
  chain: goerli,
  account: privateKeyToAccount(process.env.PK as Hex),
}).extend(walletSafeActions(safeAddress))


const txData = {
  to: getAddress(process.env.TO_ADDRESS as Hex),
  value: parseEther('0.001'),
  operation: OperationType.Call,
  gasPrice: await publicClient.getGasPrice(),
}

const safeTxGas = await publicClient.estimateSafeTransactionGas(txData)

const baseGas = await publicClient.estimateSafeTransactionBaseGas({ ...txData, safeTxGas })

const nonce = await publicClient.getSafeNonce()

const safeTxHash = await publicClient.getSafeTransactionHash({ ...txData, safeTxGas, baseGas, nonce })

const senderSignature = await walletClient.generateSafeTransactionSignature({
  ...txData,
  nonce,
  safeTxGas,
  baseGas
})

const apiClient = new ApiClient({ url: 'https://safe-transaction-goerli.safe.global', safeAddress })

await apiClient.proposeTransaction({
  safeTransactionData: { ...txData, safeTxGas, baseGas, nonce },
  senderAddress: walletClient.account.address,
  safeTxHash,
  senderSignature,
  chainId: goerli.id,
  origin: 'Piggybank',
  nonce
})
