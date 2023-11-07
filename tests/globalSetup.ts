import { FORK_BLOCK_NUMBER, FORK_URL } from './constants.js'
import { startProxy } from '@viem/anvil'

export default async function() {
  return await startProxy({
    options: {
      chainId: 5,
      forkUrl: FORK_URL,
      forkBlockNumber: FORK_BLOCK_NUMBER
    }
  })
}