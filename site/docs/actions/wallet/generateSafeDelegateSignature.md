# generateSafeDelegateSignature

Generate a signature for adding a delegate to a Safe. Support both V1 authorization (delegate address + TOTP) and V2 with typed data.

```ts
const signature = await generateSafeDelegateSignature(walletClient, {
  delegate,
  version: '2'
})
```