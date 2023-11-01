import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Piggybank',
  description: 'An unofficial Safe library',
  themeConfig: {
    nav: [{ text: 'Docs', link: '/' }],
    search: {
      provider: 'local',
    },

    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'Getting started', link: '/' },
          { text: 'Examples', link: '/docs/examples' },
        ],
      },
      {
        text: 'Public Actions',
        items: [
          {
            text: 'estimateSafeTransactionBaseGas',
            link: '/docs/actions/public/estimateSafeTransactionBaseGas',
          },
          {
            text: 'estimateSafeTransactionGas',
            link: '/docs/actions/public/estimateSafeTransactionGas',
          },
          {
            text: 'getSafeTransactionHash',
            link: '/docs/actions/public/getSafeTransactionHash',
          },
          {
            text: 'getSafeNonce',
            link: '/docs/actions/public/getSafeNonce',
          },
        ],
      },
      {
        text: 'Wallet Actions',
        items: [
          {
            text: 'generateSafeTransactionSignature',
            link: '/docs/actions/wallet/generateSafeTransactionSignature',
          },
        ],
      },
      {
        text: 'API Client',
        link: '/docs/api',
        items: [
          {
            text: 'proposeTransaction',
            link: '/docs/api/proposeTransaction',
          },
        ],
      },
    ],
    socialLinks: [{ icon: 'github', link: 'https://github.com/StauroXYZ/piggybank' }],
  },
})
