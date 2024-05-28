import { describe, it, expect } from 'vitest'
import { estimateSafeTransactionGas } from './estimateSafeTransactionGas.js'
import { publicClient } from '../../../tests/utils.js'
import { zeroAddress } from 'viem'
import { EIP3770Address, OperationType } from '../../types.js'
import { EXAMPLE_SAFE } from '../../../tests/constants.js'

describe('estimateSafeTransactionGas', () => {
  it('should estimate fixed gas on a eth transfer tx', async () => {
    const gas1 = await estimateSafeTransactionGas(publicClient, EXAMPLE_SAFE as EIP3770Address, {
      to: zeroAddress,
      value: 1n,
      operation: OperationType.Call,
    })
    const gas2 = await estimateSafeTransactionGas(publicClient, EXAMPLE_SAFE as EIP3770Address, {
      to: zeroAddress,
      value: 8n,
      operation: OperationType.Call,
    })
    expect(gas1).toEqual(gas2)
  })
})
