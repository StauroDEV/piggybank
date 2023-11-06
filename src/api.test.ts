import { describe, it } from 'node:test'
import { expect } from 'expect'
import { ApiClient } from './api.js'
import { goerli } from 'viem/chains'

const EXAMPLE_SAFE = 'gor:0x04786B39Bd84b3a5344dC7355e4d8785b0981902'

describe('ApiClient', () => {
  it('initializes properly', () => {
    const api = new ApiClient({ url: 'http://localhost:8080', chainId: 1, safeAddress: EXAMPLE_SAFE })

    expect(api.safeAddress).toEqual(EXAMPLE_SAFE)
    expect(   api.chainId).toEqual(1)
  })
})

describe('getDelegates', () => {
  it('should list all delegates', async () => {
    const api = new ApiClient({ url: 'https://safe-transaction-goerli.safe.global', chainId: goerli.id, safeAddress: EXAMPLE_SAFE }) 
    
    const result = await api.getDelegates()

    expect(result).toEqual(
      {
        count: 1,
        next: null,
        previous: null,
        results: [
          {
            safe: '0x04786B39Bd84b3a5344dC7355e4d8785b0981902',
            delegate: '0x54bCee87c3397AF31a92b8faf27faB77758a27Ce',
            delegator: '0xcC528c1bC5F43D15C0b9DC41b510E764Dc19da4D',
            label: 'Delegate'
          }
        ]
      }
    )
  })
})