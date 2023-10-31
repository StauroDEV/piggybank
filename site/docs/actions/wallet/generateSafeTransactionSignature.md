# generateSafeTransactionSignature

Sign a Safe transaction data using `eth_signTypedData_v4` method.

```ts
const safeTxHash = await publicClient.getSafeTransactionHash(transaction)

const senderSignature = await walletClient.generateSafeTransactionSignature(safeTxHash)
```
