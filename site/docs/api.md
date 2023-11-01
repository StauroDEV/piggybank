# API Client

Safe API Client is a lightweight replacement of [Safe API Kit](https://docs.safe.global/safe-core-aa-sdk/api-kit), included into piggybank by default.

::: warning
API Client is in progress.
:::

## Import

```js
import { ApiClient } from '@stauro/piggybank/api'
```

## Usage

To initalize the client you need to pass a Safe address and a service URL.

```js
import { ApiClient } from '@stauro/piggybank/api'

const apiClient = new ApiClient({
  url: 'https://safe-transaction-goerli.safe.global',
  safeAddress: '0x_YOUR_SAFE_ADDRESS',
})
```
