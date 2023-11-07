import { describe, it, expect } from 'vitest'
import { parseEip3770Address, getEip3770Address } from './eip-3770.js'
 
describe('parseEip3770Address', () => {
  it('should parse an EIP-3770 address with a prefix', () => {
    expect(parseEip3770Address('eth:0x1234567890000000000000000000000000000000')).toEqual({ prefix: 'eth', address: '0x1234567890000000000000000000000000000000' })
  })
  it('should parse a regular Ethereum address', () => {
    expect(parseEip3770Address('0x1234567890000000000000000000000000000000')).toEqual({ prefix: '', address: '0x1234567890000000000000000000000000000000' })
  })
})

describe('getEip3770Address', () => {
  it('should parse an EIP-3770 address with a prefix', () => {
    expect(getEip3770Address({ fullAddress:'eth:0x1234567890000000000000000000000000000000', chainId: 1 })).toEqual({ prefix: 'eth', address: '0x1234567890000000000000000000000000000000' })
  })
  it('should parse a regular Ethereum address', () => {
    expect(getEip3770Address({ fullAddress:'0x1234567890000000000000000000000000000000', chainId: 1 })).toEqual({ prefix: '', address: '0x1234567890000000000000000000000000000000' })
  })
  it('should throw on invalid address', () => {
    expect(() => getEip3770Address({ fullAddress:'0x123456789000', chainId: 1 })).toThrow('Address "0x123456789000" is invalid.')
  })
})