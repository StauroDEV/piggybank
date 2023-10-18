# piggybank

A super-lightweight unofficial SDK for Safe Global, powered by viem.

> At the moment only Safe v1.3 is supported

## Examples

### Submitting a transaction to a Safe wallet

```ts
import { ApiClient } from 'piggybank/api'
import { publicSafeActions } from 'piggybank/actions'
import { createWalletClient } from 'viem'

const client = new ApiClient({ url: '' })

const publicClient = createPublicClient({
  transport: http(),
  chain: goerli,
}).extend(publicSafeActions(safeAddress))

await client.proposeTransaction({})
```
