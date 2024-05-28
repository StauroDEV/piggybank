# proposeTransaction

Proposes a Safe transaction to a Safe API Service.

```ts
await apiClient.proposeTransaction({
  safeTransactionData: { ...txData, safeTxGas, baseGas, nonce },
  senderAddress: walletClient.account.address,
  safeTxHash,
  senderSignature,
  chainId: sepolia.id,
  origin: 'Piggybank',
  nonce,
})
```
