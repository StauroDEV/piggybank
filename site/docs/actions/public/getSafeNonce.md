# getSafeNonce

Obtain a nonce (index of latest transaction) for a Safe.

```ts
import { getSafeNonce } from '@stauro/piggybank/actions'

const nonce = await getSafeNonce(client, safeAddress)
```
