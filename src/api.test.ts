import { describe, it, expect } from 'vitest'
import { ApiClient } from './api.js'
import { sepolia } from 'viem/chains'
import { TEST_ADDRESS, EXAMPLE_SAFE_ADDRESS, EXAMPLE_SAFE } from '../tests/constants.js'
import { EXAMPLE_SAFE_INFO_RESPONSE, MULTISIG_TRANSACTION_TEST_RESPONSE_0, MULTISIG_TRANSACTION_TEST_RESPONSE_1, NONCE_0, TEST_TRANSACTION_HASH_0 } from '../tests/test-data.js'

describe('ApiClient', () => {
  it('initializes properly', () => {
    const api = new ApiClient({ url: 'http://localhost:8080', chainId: 1, safeAddress: EXAMPLE_SAFE })

    expect(api.safeAddress).toEqual(EXAMPLE_SAFE)
    expect(api.chainId).toEqual(1)
  })

  describe('getSafeInfo', () => {
    it('should return the safe info', async () => {
      const api = new ApiClient({ url: 'https://safe-transaction-sepolia.safe.global', chainId: sepolia.id, safeAddress: EXAMPLE_SAFE })
      const result = await api.getSafeInfo(EXAMPLE_SAFE)

      expect(result).toEqual(EXAMPLE_SAFE_INFO_RESPONSE)
    })
  })

  describe('getTransaction', () => {
    it('should return a transaction for a given tx hash', async () => {
      const api = new ApiClient({ url: 'https://safe-transaction-sepolia.safe.global', chainId: sepolia.id, safeAddress: EXAMPLE_SAFE })
      const result = await api.getTransaction(TEST_TRANSACTION_HASH_0)

      expect(result).toEqual(MULTISIG_TRANSACTION_TEST_RESPONSE_0)
    })
  })

  describe.skip('getMultisigTransactions', () => {
    it('should return a list of transactions for a given safe address', async () => {
      const api = new ApiClient({ url: 'https://safe-transaction-sepolia.safe.global', chainId: sepolia.id, safeAddress: EXAMPLE_SAFE })
      const result = await api.getMultisigTransactions(EXAMPLE_SAFE)

      const firstTx = result?.results.find(tx => tx.nonce == NONCE_0)
      expect(firstTx).toEqual(MULTISIG_TRANSACTION_TEST_RESPONSE_0)
    })
  })

  describe.skip('getPendingTransactions', () => {
    it('should return a list of pending transactions', async () => {
      const api = new ApiClient({ url: 'https://safe-transaction-sepolia.safe.global', chainId: sepolia.id, safeAddress: EXAMPLE_SAFE })

      const result = await api.getPendingTransactions({ safeAddress: EXAMPLE_SAFE })

      expect(result).toEqual(
        {
          count: 1,
          next: null,
          previous: null,
          results: [MULTISIG_TRANSACTION_TEST_RESPONSE_1],
          countUniqueNonce: 2,
        })
    })
  })

  describe('getDelegates', () => {
    it('should list all delegates', async () => {
      const api = new ApiClient({ url: 'https://safe-transaction-sepolia.safe.global', chainId: sepolia.id, safeAddress: 'sep:0x4bCdCa2D6fa461Af5c326a3124C1F8b6e3D11538' })

      const result = await api.getDelegates()

      expect(result).toEqual(
        {
          count: 1,
          next: null,
          previous: null,
          results: [
            {
              delegate: '0x972A34a8A7B9E19DA849921F8d9D58F3D2DF568b',
              delegator: '0xD3B282e9880cDcB1142830731cD83f7ac0e1043f',
              expiryDate: null,
              label: 'Delegate #1',
              safe: '0x4bCdCa2D6fa461Af5c326a3124C1F8b6e3D11538',
            },
          ],
        },
      )
    })
  })

  describe('getSafesByOwner', () => {
    it('should list all safes owned by an address', async () => {
      const api = new ApiClient({ url: 'https://safe-transaction-sepolia.safe.global', chainId: sepolia.id, safeAddress: EXAMPLE_SAFE })

      const result = await api.getSafesByOwner(TEST_ADDRESS)

      expect(result.safes).includes(EXAMPLE_SAFE_ADDRESS)
    })
  })
})
