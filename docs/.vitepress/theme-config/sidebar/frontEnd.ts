import type { DefaultTheme } from 'vitepress'

export const frontEnd: DefaultTheme.SidebarMulti = {
  '/front-end/': [
    {
      text: '前端学习',
      collapsible: true,
      items: [
        { text: 'vitepress', link: '/front-end/vitepress' },
        { text: 'pnpm', link: '/front-end/pnpm' },
        { text: 'eslint', link: '/front-end/eslint' },
      ],
    },
  ],
}
