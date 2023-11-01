# getSafeTransactionHash

Calculate a Safe's transaction hash using Safe's `getTransactionHash` contract method.

```ts
import { getSafeTransactionHash } from '@stauro/piggybank/actions'

const safeTxHash = await getSafeTransactionHash({ ...txData, safeTxGas, baseGas })
```
