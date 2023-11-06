# Safe versions

## hasSafeFeature

Checks if a feature is supported by a Safe.

```ts
import { SAFE_FEATURES, hasSafeFeature } from '@stauro/piggybank/utils'

hasSafeFeature(SAFE_FEATURES.ACCOUNT_ABSTRACTION, '1.3.0') // true
```