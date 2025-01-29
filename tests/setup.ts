import { FORK_BLOCK_NUMBER, FORK_URL } from './constants.js'
import { pool, testClient } from './utils.js'
import { afterAll, afterEach } from 'vitest'

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

afterAll(async () => {
  // If you are using a fork, you can reset your anvil instance to the initial fork block.
  await testClient.reset({
    jsonRpcUrl: FORK_URL,
    blockNumber: FORK_BLOCK_NUMBER,
  })
})

afterEach(async (context) => {
  context.onTestFailed(async () => {
    // If a test fails, you can fetch and print the logs of your anvil instance.
    const logs = await fetchLogs('http://localhost:8545', pool)
    // Only print the 20 most recent log messages.
    console.log(...logs.slice(-20))
  })
})
