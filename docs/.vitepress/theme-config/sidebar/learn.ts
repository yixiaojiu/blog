import type { DefaultTheme } from 'vitepress'

export const learn: DefaultTheme.SidebarMulti = {
  '/learn/': [
    {
      text: '前端',
      collapsible: true,
      items: [
        { text: 'vitepress', link: '/learn/front-end/vitepress' },
        { text: 'pnpm', link: '/learn/front-end/pnpm' },
        { text: 'eslint', link: '/learn/front-end/eslint' },
        { text: 'typescript', link: '/learn/front-end/typescript' },
        { text: 'vite', link: '/learn/front-end/vite' },
      ],
    },
    {
      text: '其他',
      collapsible: true,
      collapsed: true,
      items: [
        { text: 'ssh', link: '/learn/other/ssh' },
        { text: 'git', link: '/learn/other/git' },
      ],
    },
  ],
}
