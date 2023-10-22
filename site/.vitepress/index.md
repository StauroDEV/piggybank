# OP Viem

## Overview

(unofficial) [Safe](https://safe.global) library, powered by [viem](https://viem.sh).

## Features

- All kits in one package
- TypeScript-ready
- Makes it possible to interact with Safe using [viem](https://viem.sh), since Safe Protocol Kit and API Kit only support web3 and ethers.

::: warning
piggybank is currently in alpha. The docs are not complete. Only Safe v1.3 is supported. Don't use in production.
:::

## Installation

::: code-group

```bash [npm]
npm i viem piggybank
```

```bash [pnpm]
pnpm i viem piggybank
```

```bash [bun]
bun i viem piggybank
```

:::

## Example

```ts
// import modules
import { createWalletClient, createPublicClient, custom, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { mainnet, base } from 'viem/chains'
import { publicSafeActions, walletSafeActions } from 'piggybank/actions'

// create clients
export const walletClient = createWalletClient({
  chain: mainnet,
  transport: custom(window.ethereum),
}).extend(walletSafeActions())

export const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(),
}).extend(publicSafeActions(safeAddress))

// write base transaction data
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
