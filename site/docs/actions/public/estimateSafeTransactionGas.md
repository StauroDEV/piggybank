# estimateSafeTransactionGas

Estimate a Safe transaction gas by simulating the transaction and parsing the revert message.

```ts
import { publicSafeActions } from 'piggybank'
import { createPublicClient, parseEther } from 'viem'

const txData = {
  to,
  value: parseEther('0.001'),
  operation: OperationType.Call,
  gasPrice: await publicClient.getGasPrice(),
  data: '0x' as Hex,
  nonce: 0,
}

const safeTxGas = await publicClient.estimateSafeTransactionGas(txData) // Estimate safe tx gas
```
