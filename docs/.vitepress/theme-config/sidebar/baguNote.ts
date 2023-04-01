import type { DefaultTheme } from 'vitepress'

export const baguNote: DefaultTheme.SidebarMulti = {
  '/knowledge/': [
    {
      text: 'html css',
      collapsible: true,
      items: [
        { text: 'BFC', link: '/knowledge/html-css/BFC' },
        { text: 'CSS继承属性', link: '/knowledge/html-css/CSS继承属性' },
        { text: 'CSS实现三角形', link: '/knowledge/html-css/CSS实现三角形' },
        { text: 'CSS选择器权重', link: '/knowledge/html-css/CSS选择器权重' },
        { text: '垂直水平居中', link: '/knowledge/html-css/垂直水平居中' },
        { text: 'flex', link: '/knowledge/html-css/flex' },
        { text: 'HTML5 语义化', link: '/knowledge/html-css/HTML5语义化' },
        { text: '重排重绘', link: '/knowledge/html-css/重排重绘' },
        { text: '实体编码', link: '/knowledge/html-css/实体编码' },
        { text: '层叠上下文', link: '/knowledge/html-css/层叠上下文' },
      ],
    },
    {
      text: 'JS',
      collapsed: true,
      collapsible: true,

      items: [
        { text: 'FormData', link: '/knowledge/js/FormData' },
        { text: 'Event Loop', link: '/knowledge/js/EventLoop' },
        { text: '防抖节流', link: '/knowledge/js/防抖节流' },
        { text: '为什么0.1 + 0.2 不等于0.3', link: '/knowledge/js/浮点数精度' },
        { text: '手写', link: '/knowledge/js/jsAchieve' },
        { text: 'JavaScript 基础', link: '/knowledge/js/javascript-basics' },
        { text: 'JavaScript 进阶', link: '/knowledge/js/javascript-advanced' },
        { text: '正则', link: '/knowledge/js/regexp' },
      ],
    },
    {
      text: 'TS',
      collapsed: true,
      collapsible: true,
      items: [
        { text: '面试题', link: '/knowledge/ts/understand' },
        { text: '类型体操', link: '/knowledge/ts/gymnastics' },
      ],
    },
    {
      text: 'VUE',
      collapsed: true,
      collapsible: true,
      items: [
        { text: '基础', link: '/knowledge/vue/base' },
        { text: 'Vue3 源码', link: '/knowledge/vue/source-code' },
      ],
    },
    {
      text: 'React',
      collapsed: true,
      collapsible: true,
      items: [
        { text: '组件基础', link: '/knowledge/react/component-base' },
        { text: '状态管理', link: '/knowledge/react/state-managemnet' },
        { text: '生命周期', link: '/knowledge/react/lifecycle' },
        { text: '路由', link: '/knowledge/react/router' },
        { text: 'hooks', link: '/knowledge/react/hooks' },
      ],
    },
    {
      text: '计算机网络',
      collapsible: true,
      collapsed: true,
      items: [
        { text: '网络模型', link: 'knowledge/network/network-model' },
        { text: 'HTTP', link: 'knowledge/network/http' },
        { text: 'HTTPS-RSA-握手解析', link: 'knowledge/network/HTTPS-RSA-握手解析' },
        { text: 'TCP', link: 'knowledge/network/tcp' },
      ],
    },
    {
      text: '包管理工具',
      collapsed: true,
      collapsible: true,
      items: [{ text: 'npm run xxx 和 npm link', link: '/knowledge/package-management-tool/npmrun和link' }],
    },
  ],
}
