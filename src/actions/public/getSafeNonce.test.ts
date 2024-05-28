import { describe, it, expect } from 'vitest'
import { getSafeNonce } from './getSafeNonce.js'
import { publicClient } from '../../../tests/utils.js'
import { EIP3770Address } from '../../types.js'
import { EXAMPLE_SAFE } from '../../../tests/constants.js'

describe('getSafeNonce', () => {
  it('should retrieve the current nonce', () => {
    getSafeNonce(publicClient, EXAMPLE_SAFE as EIP3770Address).then((nonce) => {
      expect(nonce).toBeTypeOf('bigint')
    })
  })
})
