import { themes } from 'prism-react-renderer'
import { themeNavbar } from './navbar'
import tailwindcss from '@tailwindcss/postcss'
import type { Config } from '@docusaurus/types'
import type { Options } from '@docusaurus/preset-classic'
import type { CustomFields } from '@site/src/lib/types/config'

const lightTheme = themes.github
const darkTheme = themes.dracula

const config: Config = {
  title: '翊小久',
  favicon: 'img/avatar.webp',
  staticDirectories: ['static'],

  i18n: {
    defaultLocale: 'zh-CN',
    locales: ['zh-CN'],
  },

  url: 'https://note.yixiaojiu.top',
  baseUrl: '/',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  plugins: [
    function tailwindcssPlugin() {
      return {
        name: 'docusaurus-tailwindcss',
        configurePostCss(postcssOptions) {
          postcssOptions.plugins.push(tailwindcss())
          return postcssOptions
        },
      }
    },
  ],

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
          customCss: ['./src/css/custom.css', './src/css/define.css'],
        },
        gtag: {
          trackingID: ['G-YSFLC9Y69J'],
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
    image: 'img/avatar.webp',
    navbar: {
      title: '首页',
      items: [...themeNavbar, { to: '/blog', label: 'Blog', position: 'left' }],
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
  },

  customFields: {
    nickname: '翊小久',
    uid: 'yixiaojiu',
    biography: '忘れたくない思い、ありますか？',
    externalLinks: [
      {
        type: 'github',
        href: 'https://github.com/yixiaojiu',
      },
      {
        type: 'bilibili',
        href: 'https://space.bilibili.com/412686493',
      },
      {
        type: 'rednote',
        href: 'https://www.xiaohongshu.com/user/profile/64570d3d0000000010027733',
      },
    ],
    defaultBlogImage: '/img/blog-defalut-img.webp',
  } satisfies CustomFields,
}

export default config
