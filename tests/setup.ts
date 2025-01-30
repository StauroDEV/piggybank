import { FORK_BLOCK_NUMBER, FORK_URL } from './constants.js'
import { pool } from './utils.js'
import { afterAll, afterEach, beforeAll } from 'vitest'

import { sepolia } from 'viem/chains'
import { anvil } from 'prool/instances'

async function fetchLogs(url: string, id: number): Promise<string[]> {
  const response = await fetch(new URL(`${id}/logs`, url), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const result = (await response.json())

  if (result.success === false) {
    throw new Error(result.reason)
  }

  return result.logs
}

const server = anvil({
  chainId: sepolia.id,
  forkUrl: FORK_URL,
  forkBlockNumber: FORK_BLOCK_NUMBER,
})

beforeAll(() => {
  return server.start()
})

afterAll(async () => {
  await server.stop()
})

afterEach(async (context) => {
  context.onTestFailed(async () => {
    // If a test fails, you can fetch and print the logs of your anvil instance.
    const logs = await fetchLogs('http://localhost:8545', pool)
    // Only print the 20 most recent log messages.
    console.log(...logs.slice(-20))
  })
})
