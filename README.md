# piggybank

A super-lightweight unofficial SDK for Safe Global, powered by viem.

> At the moment only Safe v1.3 is supported

## Examples

### Submitting a transaction to a Safe wallet

```ts
import {
  ApiKit,
  piggybankWalletActions,
  piggybankPublicActions,
} from 'piggybank'
import { createWalletClient } from 'viem'
```
