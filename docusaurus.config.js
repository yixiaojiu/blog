// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github')
const darkCodeTheme = require('prism-react-renderer/themes/dracula')

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '翊小久',
  tagline: 'Dinosaurs are cool',
  favicon: 'img/avatar-transparent.png',

  // Set the production url of your site here
  url: 'https://blog-yixiaojiu.vercel.app/',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
        },
        blog: {
          showReadingTime: true,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/avatar-transparent.png',
      navbar: {
        title: '翊小久',
        logo: {
          alt: 'logo',
          src: 'img/avatar-transparent.png',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'note',
            position: 'left',
            label: '📃小记',
          },
          {
            type: 'docSidebar',
            sidebarId: 'bagu',
            position: 'left',
            label: '📙每天一个小知识',
          },
          {
            type: 'docSidebar',
            sidebarId: 'learn',
            position: 'left',
            label: '⚙技术学习',
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
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
}

module.exports = config
