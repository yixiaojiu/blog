import type { DefaultTheme } from 'vitepress'

export const baguNote: DefaultTheme.SidebarMulti = {
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
        { text: '为什么0.1 + 0.2 不等于0.3', link: '/bagu-note/js/浮点数精度' },
        { text: '手写', link: '/bagu-note/js/jsAchieve' },
        { text: 'JavaScript 基础', link: '/bagu-note/js/javascript-basics' },
        { text: 'JavaScript 进阶', link: '/bagu-note/js/javascript-advanced' },
      ],
    },
    {
      text: '计算机网络',
      collapsible: true,
      collapsed: true,
      items: [
        {
          text: 'HTTPS-RSA-握手解析',
          link: 'bagu-note/network/HTTPS-RSA-握手解析',
        },
      ],
    },
    {
      text: '包管理工具',
      collapsed: true,
      collapsible: true,
      items: [
        {
          text: 'npm run xxx 和 npm link',
          link: '/bagu-note/package-management-tool/npmrun和link',
        },
      ],
    },
  ],
}
