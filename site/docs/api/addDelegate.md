# addDelegate

Add a delegate address to a Safe. Supports both V1 and V2 authorization.

```ts
import { ApiClient } from '@stauro/piggybank/api'
import { sepolia } from 'viem/chains'
import { EIP3770Address } from '../src/types.js'
import { createWalletClient, http, Hex, Address } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { generateSafeDelegateSignature } from '@stauro/piggybank/actions'

const safeAddress = process.env.SAFE_ADDRESS as EIP3770Address

const delegate = process.env.SAFE_DELEGATE as Address

const apiClient = new ApiClient({ url: 'https://safe-transaction-sepolia.safe.global', safeAddress, chainId: sepolia.id })

const walletClient = createWalletClient({
  transport: http(),
  chain: sepolia,
  account: privateKeyToAccount(process.env.PK as Hex),
})

const signature = await generateSafeDelegateSignature(walletClient, {
  delegate,
})

await apiClient.createDelegate({
  delegate,
  delegator: walletClient.account.address,
  signature,
  label: 'Delegate #1',
})
```