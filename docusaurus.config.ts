import { themes } from 'prism-react-renderer'
import type { Config } from '@docusaurus/types'
import type { ThemeConfig, Options } from '@docusaurus/preset-classic'

const lightTheme = themes.github
const darkTheme = themes.dracula

export default {
  title: '翊小久',
  favicon: 'img/avatar-transparent.png',
  staticDirectories: ['static'],

  i18n: {
    defaultLocale: 'zh-CN',
    locales: ['zh-CN'],
  },

  url: 'https://note.yixiaojiu.top/',
  baseUrl: '/',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  plugins: ['docusaurus-plugin-medium-zoom'],

  presets: [
    [
      'classic',
      {
        docs: {
          showLastUpdateTime: true,
          sidebarPath: './sidebars.ts',
        },
        blog: {
          showReadingTime: true,
          postsPerPage: 5,
        },
        theme: {
          customCss: ['./src/css/custom.css', './src/css/atomic.css'],
        },
        gtag: {
          trackingID: ['G-9VQBN5ZTSH', 'G-YSFLC9Y69J'],
          anonymizeIP: true,
        },
        sitemap: {
          lastmod: 'date',
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
          createSitemapItems: async (params) => {
            const { defaultCreateSitemapItems, ...rest } = params
            const items = await defaultCreateSitemapItems(rest)
            return items.filter((item) => !item.url.includes('/page/'))
          },
        },
      } satisfies Options,
    ],
  ],

  themeConfig: {
    image: 'img/avatar-transparent.png',
    navbar: {
      title: '翊小久的笔记',
      // logo: {
      //   alt: 'logo',
      //   src: 'img/avatar-transparent.png',
      // },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'bagu',
          position: 'left',
          label: '📙八股',
        },
        {
          type: 'docSidebar',
          sidebarId: 'note',
          position: 'left',
          label: '📃技术小记',
        },
        {
          type: 'docSidebar',
          sidebarId: 'record',
          position: 'left',
          label: '📝杂记',
        },
        { to: '/blog', label: 'Blog', position: 'left' },
        {
          href: 'https://github.com/yixiaojiu/blog',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    prism: {
      theme: lightTheme,
      darkTheme: darkTheme,
      additionalLanguages: ['bash', 'diff', 'json', 'toml'],
    },
    algolia: {
      appId: 'U89O3UO43H',
      apiKey: '4873c9c78b5bba9543b388f35018fe54',
      indexName: 'note',
    },
  } satisfies ThemeConfig,
} as Config
