# Examples

## Propose a transaction to a Safe wallet

### 1. Set up clients

```ts
import { http, createPublicClient, parseEther, getAddress, createWalletClient, Hex } from 'viem'
import { sepolia } from 'viem/chains'
import { publicSafeActions, walletSafeActions } from '@stauro/piggybank/actions'

const safeAddress = getAddress('0x_MY_SAFE_ADDRESS')

const publicClient = createPublicClient({
  transport: http(),
  chain: sepolia,
}).extend(publicSafeActions(safeAddress))

const walletClient = createWalletClient({
  transport: http(),
  chain: sepolia,
  account: privateKeyToAccount(process.env.PK as Hex),
}).extend(walletSafeActions())
```

### 2. Set up base transaction data

```ts
import { parseEther, getAddress, type Hex } from 'viem'

const txData = {
  to: getAddress(process.env.TO_ADDRESS as Hex),
  value: parseEther('0.001'),
  operation: OperationType.Call,
}
```

### 3. Get nonce, transaction hash and signature

```ts
const nonce = await publicClient.getSafeNonce()

const safeTxHash = await publicClient.getSafeTransactionHash({ ...txData, nonce })

const senderSignature = await walletClient.generateSafeTransactionSignature({ ...txData, nonce })
```

### 5. Propose the transaction

```ts
import { ApiClient } from '@stauro/piggybank/api'

const apiClient = new ApiClient({ url: 'https://safe-transaction-sepolia.safe.global', safeAddress })

await apiClient.proposeTransaction({
  safeTransactionData: { ...txData, nonce },
  senderAddress: walletClient.account.address,
  safeTxHash,
  senderSignature,
  origin: 'Piggybank',
})
```
