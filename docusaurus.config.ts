import { themes } from 'prism-react-renderer'
import { resolve } from 'node:path'

import type { Config } from '@docusaurus/types'
import type { ThemeConfig, Options } from '@docusaurus/preset-classic'

const lightTheme = themes.github
const darkTheme = themes.dracula

export default {
  title: '翊小久',
  tagline: 'Dinosaurs are cool',
  favicon: 'img/avatar-transparent.png',
  staticDirectories: ['static'],

  plugins: [
    [
      '@docusaurus/plugin-google-gtag',
      {
        trackingID: 'G-9VQBN5ZTSH',
        anonymizeIP: true,
      },
    ],
  ],

  i18n: {
    defaultLocale: 'zh-CN',
    locales: ['zh-CN'],
  },

  url: 'https://blog-yixiaojiu.vercel.app/',
  baseUrl: '/',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: resolve(__dirname, './sidebars.ts'),
        },
        blog: {
          showReadingTime: true,
        },
        theme: {
          customCss: resolve('./src/css/custom.css'),
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
          label: '📙每天一个小知识',
        },
        {
          type: 'docSidebar',
          sidebarId: 'note',
          position: 'left',
          label: '📃小记',
        },
        {
          type: 'docSidebar',
          sidebarId: 'record',
          position: 'left',
          label: '📝记录',
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
      additionalLanguages: ['bash', 'diff', 'json'],
    },
    algolia: {
      appId: 'JAAWQG3A68',
      apiKey: '87e211738846e5f93f13f10cbf360190',
      indexName: 'yixiaojiu',
    },
  } satisfies ThemeConfig,
} as Config
