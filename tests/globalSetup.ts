import { anvil } from 'prool/instances'
import { FORK_URL, FORK_BLOCK_NUMBER } from './constants.js'
import { sepolia } from 'viem/chains'

const server = anvil({
  chainId: sepolia.id,
  forkUrl: FORK_URL,
  forkBlockNumber: FORK_BLOCK_NUMBER,
})

export default async function () {
  return server.start()
}
