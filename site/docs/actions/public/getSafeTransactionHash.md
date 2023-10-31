# getSafeTransactionHash

Calculate a Safe's transaction hash using Safe's `getTransactionHash` contract method.

```ts
import { getSafeTransactionHash } from 'piggybank/actions'

const safeTxHash = await getSafeTransactionHash({ ...txData, safeTxGas, baseGas })
```
