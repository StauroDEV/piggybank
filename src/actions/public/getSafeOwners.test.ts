import { describe, it, expect } from 'vitest'
import { getSafeOwners } from './getSafeOwners.js'
import { publicClient } from '../../../tests/utils.js'
import { EIP3770Address } from '../../types.js'
import { EXAMPLE_SAFE, TEST_ADDRESS } from '../../../tests/constants.js'
import { parseEip3770Address } from '../../utils/eip-3770.js'

describe('getSafeOwners', () => {
  it('should retrieve the safes owners', () => {
    getSafeOwners(publicClient, EXAMPLE_SAFE as EIP3770Address).then((owners) => {
      expect(owners).includes(parseEip3770Address(TEST_ADDRESS).address)
    })
  })
})
