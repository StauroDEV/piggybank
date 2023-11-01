# estimateSafeTransactionGas

Estimate a Safe transaction base gas.

```ts
import { publicSafeActions } from '@stauro/piggybank/actions'
import { createPublicClient, parseEther } from 'viem'

const txData = {
  to,
  value: parseEther('0.001'),
  operation: OperationType.Call,
  gasPrice: await publicClient.getGasPrice(),
  data: '0x' as Hex,
  nonce: 0,
}

const safeTxGas = await estimateSafeTransactionGas(client, safeAddress, txData) // Estimate safe tx gas
```
