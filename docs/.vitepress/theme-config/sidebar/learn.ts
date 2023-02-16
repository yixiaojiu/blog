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
      ],
    },
  ],
}
