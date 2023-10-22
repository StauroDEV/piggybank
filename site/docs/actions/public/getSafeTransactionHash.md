# getSafeTransactionHash

Calculate a Safe's transaction hash using Safe's `getTransactionHash` contract method.

```ts
const safeTxHash = await publicClient.getSafeTransactionHash({ ...txData, safeTxGas, baseGas })
```
