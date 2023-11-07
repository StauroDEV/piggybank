import {
  type Chain,
  createPublicClient,
  createTestClient,
  createWalletClient,
  http, HttpTransport,
  PublicClient,
  WalletClient
} from 'viem'
import { goerli } from 'viem/chains'
  
/**
   * The id of the current test worker.
   *
   * This is used by the anvil proxy to route requests to the correct anvil instance.
   */
export const pool = Number(process.env.VITEST_POOL_ID ?? 1)
export const anvil = {
  ...goerli, // We are using a mainnet fork for testing.
  id: 5, // We configured our anvil instance to use `123` as the chain id (see `globalSetup.ts`);
  rpcUrls: {
    // These rpc urls are automatically used in the transports.
    default: {
      // Note how we append the worker id to the local rpc urls.
      http: [`http://127.0.0.1:8545/${pool}`],
      webSocket: [`ws://127.0.0.1:8545/${pool}`]
    },
    public: {
      // Note how we append the worker id to the local rpc urls.
      http: [`http://127.0.0.1:8545/${pool}`],
      webSocket: [`ws://127.0.0.1:8545/${pool}`]
    }
  }
} as const satisfies Chain
  
export const testClient = createTestClient({
  chain: anvil,
  mode: 'anvil',
  transport: http()
})
  
export const publicClient: PublicClient<HttpTransport, typeof anvil> = createPublicClient({
  chain: anvil,
  transport: http()
})
  
export const walletClient: WalletClient<HttpTransport, typeof anvil> = createWalletClient({
  chain: anvil,
  transport: http()
})