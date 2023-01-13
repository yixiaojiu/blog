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
      items: [
        { text: 'BFC', link: '/bagu-note/html-css/CSS继承属性' },
        { text: 'CSS继承属性', link: '/bagu-note/html-css/CSS继承属性' },
        { text: 'CSS实现三角形', link: '/bagu-note/html-css/CSS实现三角形' },
        { text: 'CSS选择器权重', link: '/bagu-note/html-css/CSS选择器权重' },
        { text: '垂直水平居中', link: '/bagu-note/html-css/垂直水平居中' },
        { text: 'flex', link: '/bagu-note/html-css/flex' },
        { text: 'HTML5 语义化', link: '/bagu-note/html-css/HTML5语义化' },
        { text: '重排重绘', link: '/bagu-note/html-css/重排重绘' },
        { text: '实体编码', link: '/bagu-note/html-css/实体编码' },
        { text: '层叠上下文', link: '/bagu-note/html-css/层叠上下文' },
      ],
    },
    {
      text: 'js',
      collapsed: true,
      collapsible: true,

      items: [
        { text: 'FormData', link: '/bagu-note/js/FormData' },
        {
          text: 'Event Loop',
          link: '/bagu-note/js/EventLoop',
        },
        { text: '防抖节流', link: '/bagu-note/js/防抖节流' },
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
        {
          text: 'npm run xxx 和 npm link',
          link: '/bagu-note/package-management-tool/npmrun和link',
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
