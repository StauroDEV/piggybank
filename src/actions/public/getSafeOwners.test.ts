import { describe, it, expect } from 'vitest'
import { getSafeOwners } from './getSafeOwners.js'
import { publicClient } from '../../../tests/utils.js'
import { EIP3770Address } from '../../types.js'
import { SAFE_ADDRESS, TEST_ADDRESS } from '../../../tests/constants.js'

describe.only('getSafeOwners', () => {
  it('should retrieve the safes owners', () => {
    getSafeOwners(publicClient, SAFE_ADDRESS as EIP3770Address).then((owners) => {
      expect(owners).includes(TEST_ADDRESS)
    })
  })
})