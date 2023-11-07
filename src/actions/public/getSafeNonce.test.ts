import { describe, it, expect } from 'vitest'
import { getSafeNonce } from './getSafeNonce.js'
import { publicClient } from '../../../tests/utils.js'
import { EIP3770Address } from '../../types.js'

describe('getSafeNonce', () => {
  it('should retrieve the current nonce', () => {
    getSafeNonce(publicClient, process.env.VITE_SAFE_ADDRESS as EIP3770Address).then((nonce) => {
      expect(nonce).toBeTypeOf('bigint')
    })
  })
})