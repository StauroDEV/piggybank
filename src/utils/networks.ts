interface NetworkShortName {
  shortName: string
  chainId: number
}

export const networkShortNames: NetworkShortName[] = [
  { chainId: 1, shortName: 'eth' },
  { chainId: 11155111, shortName: 'sep' },
]
