import type { DefaultTheme } from 'vitepress'

export const nav: DefaultTheme.NavItem[] = [
  {
    text: '小记',
    items: [
      {
        text: '学习相关',
        items: [
          { text: '杂乱笔记', link: '/note/study/杂乱笔记' },
          { text: '项目配置', link: '/note/study/项目配置' },
          { text: 'archlinux安装', link: '/note/study/archlinux安装' },
          { text: 'linux笔记', link: '/note/study/linux笔记' },
          { text: 'vim-vscode', link: '/note/study/vim-vscode' },
        ],
      },
      {
        text: '其他',
        items: [{ text: '2022年终总结', link: '/note/other/2022年终总结' }],
      },
    ],
  },
  {
    text: '八股笔记',
    items: [
      {
        text: 'html css',
        items: [
          { text: 'BFC', link: '/bagu-note/html-css/BFC' },
          { text: 'CSS继承属性', link: '/bagu-note/html-css/CSS继承属性' },
          { text: 'CSS实现三角形', link: '/bagu-note/html-css/CSS实现三角形' },
          { text: 'CSS选择器权重', link: '/bagu-note/html-css/CSS选择器权重' },
          { text: '垂直水平居中', link: '/bagu-note/html-css/垂直水平居中' },
        ],
      },
      {
        text: 'js',
        items: [{ text: 'FormData', link: '/bagu-note/js/FormData' }],
      },
      {
        text: '计算机网络',
        items: [{ text: 'HTTPS-RSA-握手解析', link: 'bagu-note/network/HTTPS-RSA-握手解析' }],
      },
      {
        text: '包管理工具',
        items: [
          {
            text: 'pnpm 优势',
            link: '/bagu-note/package-management-tool/pnpm优势',
          },
          {
            text: 'npm run xxx 和 npm link',
            link: '/bagu-note/package-management-tool/npmrun和link',
          },
        ],
      },
    ],
  },
  {
    text: '技术学习',
    items: [
      { text: 'vitepress', link: '/technology-learn/vitepress' },
      {
        text: 'pnpm',
        link: '/technology-learn/pnpm',
      },
    ],
  },
]
