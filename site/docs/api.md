# API Client

Safe API Client is a lightweight replacement of [Safe API Kit](https://docs.safe.global/safe-core-aa-sdk/api-kit), included into piggybank by default.

::: warning
Currently only a fraction of the API kit is implemented.
:::

## Import

```js
import { ApiClient } from 'piggybank/api'
```

## Usage

To initalize the client you need to pass a Safe address and a service URL.

```js
import { ApiClient } from 'piggybank/api'

const apiClient = new ApiClient({
  url: 'https://safe-transaction-goerli.safe.global',
  safeAddress: '0x_YOUR_SAFE_ADDRESS',
})
```
