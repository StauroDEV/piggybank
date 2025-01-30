import { sepolia } from 'viem/chains'
import { FORK_BLOCK_NUMBER, FORK_URL } from './constants.js'
import { createServer } from 'prool'
import { anvil } from 'prool/instances'

export default async function () {
  const server = createServer({
    instance: anvil({
      chainId: sepolia.id,
      forkUrl: FORK_URL,
      forkBlockNumber: FORK_BLOCK_NUMBER,
    }),
  })

  return server.start()
}
