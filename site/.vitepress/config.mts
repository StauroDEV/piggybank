import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Piggybank',
  description: 'An unofficial Safe library',
  // TODO remove
  ignoreDeadLinks: true,

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
        ],
      },
      {
        text: 'Wallet Actions',
        items: [
          {
            text: 'signSafeTransactionHash',
            link: '/docs/actions/wallet/signSafeTransactionHash',
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
