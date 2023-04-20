import type { DefaultTheme } from 'vitepress'

export const knowledge: DefaultTheme.SidebarMulti = {
  '/knowledge/': [
    {
      text: 'html css',
      collapsible: true,
      items: [
        { text: 'HTML', link: '/knowledge/html-css/html' },
        { text: 'CSS', link: '/knowledge/html-css/css' },
        { text: 'BFC', link: '/knowledge/html-css/BFC' },
        { text: 'CSS继承属性', link: '/knowledge/html-css/CSS继承属性' },
        { text: 'CSS实现三角形', link: '/knowledge/html-css/CSS实现三角形' },
        { text: 'CSS选择器权重', link: '/knowledge/html-css/CSS选择器权重' },
        { text: '垂直水平居中', link: '/knowledge/html-css/垂直水平居中' },
        { text: '重排重绘', link: '/knowledge/html-css/重排重绘' },
        { text: '层叠上下文', link: '/knowledge/html-css/层叠上下文' },
      ],
    },
    {
      text: 'JS',
      collapsed: true,
      collapsible: true,

      items: [
        { text: 'FormData', link: '/knowledge/js/FormData' },
        { text: '为什么0.1 + 0.2 不等于0.3', link: '/knowledge/js/浮点数精度' },
        { text: 'JavaScript 基础', link: '/knowledge/js/javascript-basics' },
        { text: 'JavaScript 进阶', link: '/knowledge/js/javascript-advanced' },
        { text: '正则', link: '/knowledge/js/regexp' },
        { text: 'ES6+ 新特性', link: '/knowledge/js/es6-plus' },
      ],
    },
    {
      text: 'TS',
      collapsed: true,
      collapsible: true,
      items: [
        { text: '基础', link: '/knowledge/ts/understand' },
        { text: '类型体操', link: '/knowledge/ts/gymnastics' },
      ],
    },
    {
      text: 'Vue',
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
        { text: 'HTTPS', link: 'knowledge/network/https' },
        { text: 'TCP', link: 'knowledge/network/tcp' },
      ],
    },
    {
      text: '浏览器',
      collapsed: true,
      collapsible: true,
      items: [
        { text: '浏览器安全', link: '/knowledge/browser/browser-security' },
        { text: '事件机制', link: '/knowledge/browser/event-mechanism' },
        { text: '浏览器缓存', link: '/knowledge/browser/cache' },
        { text: '事件循环', link: '/knowledge/browser/EventLoop' },
      ],
    },
    {
      text: '前端工程化',
      collapsed: true,
      collapsible: true,
      items: [
        { text: 'ESlint', link: '/knowledge/engineering/eslint' },
        { text: '包管理工具', link: '/knowledge/engineering/package-management-tool' },
      ],
    },
    {
      text: '代码篇',
      collapsed: true,
      collapsible: true,
      items: [
        { text: '手写', link: '/knowledge/code/jsAchieve' },
        { text: '防抖节流', link: '/knowledge/code/debounce-thorttle' },
        { text: 'Promise', link: '/knowledge/code/promise' },
      ],
    },
    {
      text: '面经',
      collapsed: true,
      collapsible: true,
      items: [
        { text: '实在智能', link: '/knowledge/interview/1' },
        { text: '佰邦达', link: '/knowledge/interview/2' },
        { text: '海管家物流科技', link: '/knowledge/interview/3' },
        { text: 'Mobvista 汇量科技', link: '/knowledge/interview/4' },
      ],
    },
  ],
}
