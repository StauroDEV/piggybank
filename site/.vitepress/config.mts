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
        ],
      },
      {
        text: 'Wallet Actions',
        items: [
          {
            text: 'signSafeTransactionHash',
            link: '/docs/actions/public/estimateSafeTransactionBaseGas',
          },
        ],
      },
      {
        text: 'Glossary',
        items: [
          {
            text: 'Types',
            link: '/docs/glossary/types',
          },
        ],
      },
    ],
    socialLinks: [{ icon: 'github', link: 'https://github.com/StauroXYZ/piggybank' }],
  },
})
