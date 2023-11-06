# getDelegates

Get a list of delegates for a Safe. Filtering and pagination are supported.

```ts
import { ApiClient } from '@stauro/piggybank/api'
import { goerli } from 'viem/chains'
import { EIP3770Address } from '@stauro/piggybank/types'

const safeAddress = process.env.SAFE_ADDRESS as EIP3770Address

const apiClient = new ApiClient({ url: 'https://safe-transaction-goerli.safe.global', safeAddress, chainId: goerli.id })

const response = await apiClient.getDelegates({ limit: '100' })

console.log(`List of delegates for ${safeAddress}:\n`)

for (const delegate of response.results) {
  console.log(`${delegate.label}: ${delegate.delegate}`)
}
```