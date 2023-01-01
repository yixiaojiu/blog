import type { DefaultTheme } from 'vitepress'
export const sidebar: DefaultTheme.Sidebar = {
  '/note/': [
    {
      text: '小记',
      collapsed: true,
      collapsible: true,
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
      collapsed: true,
      collapsible: true,
      items: [{ text: '2022年终总结', link: '/note/other/2022年终总结' }],
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
    {
      text: '包管理工具',
      collapsed: true,
      collapsible: true,
      items: [
        {
          text: 'pnpm 优势',
          link: '/bagu-note/package-management-tool/pnpm优势.md',
        },
      ],
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
