import { networks } from '../src/utils/networks.js'
import { FORK_BLOCK_NUMBER, FORK_URL, TEST_NETWORK_TYPE } from './constants.js'
import { startProxy } from '@viem/anvil'

export default async function () {
  return await startProxy({
    options: {
      chainId: networks[TEST_NETWORK_TYPE].id,
      forkUrl: FORK_URL,
      forkBlockNumber: FORK_BLOCK_NUMBER
    }
  })
}