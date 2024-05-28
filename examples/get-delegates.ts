import { ApiClient } from '../src/api.js'
import { sepolia } from 'viem/chains'
import { EIP3770Address } from '../src/types.js'

const safeAddress = process.env.SAFE_ADDRESS as EIP3770Address

const apiClient = new ApiClient({ url: 'https://safe-transaction-sepolia.safe.global', safeAddress, chainId: sepolia.id })

const response = await apiClient.getDelegates({ limit: '100' })

console.log(`List of delegates for ${safeAddress}:\n`)

for (const delegate of response.results) {
  console.log(`${delegate.label}: ${delegate.delegate}`)
}
