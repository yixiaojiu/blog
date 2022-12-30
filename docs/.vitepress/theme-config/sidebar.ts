import type { DefaultTheme } from 'vitepress'
export const sidebar: DefaultTheme.Sidebar = {
  '/note/': [
    {
      text: '小记',
      collapsed: true,
      collapsible: true,
      items: [
        { text: '杂乱笔记', link: '/note/杂乱笔记' },
        { text: '项目配置', link: '/note/项目配置' },
        { text: 'archlinux安装', link: '/note/archlinux安装' },
        { text: 'linux笔记', link: '/note/linux笔记' },
        { text: 'vim-vscode', link: '/note/vim-vscode' },
      ],
    },
  ],
  '/bagu-note/': [
    {
      text: 'html css',
      collapsible: true,
      collapsed: true,
      items: [
        { text: 'BFC', link: '/bagu-note/html-css/CSS继承属性' },
        { text: 'CSS继承属性', link: '/bagu-note/html-css/CSS继承属性' },
        { text: 'CSS实现三角形', link: '/bagu-note/html-css/CSS实现三角形' },
        { text: 'CSS选择器权重', link: '/bagu-note/html-css/CSS选择器权重' },
      ],
    },
    {
      text: '计算机网络',
      collapsible: true,
      collapsed: true,
      items: [{ text: 'HTTPS-RSA-握手解析', link: 'bagu-note/network/HTTPS-RSA-握手解析' }],
    },
  ],
  '/technology-learn/': [
    {
      text: '技术学习',
      collapsed: true,
      collapsible: true,
      items: [{ text: 'vitepress', link: '/technology-learn/vitepress' }],
    },
  ],
}
