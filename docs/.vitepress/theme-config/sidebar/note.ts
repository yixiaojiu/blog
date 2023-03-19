import type { DefaultTheme } from 'vitepress'

export const note: DefaultTheme.SidebarMulti = {
  '/note/': [
    {
      text: '小记',
      collapsible: true,
      items: [
        { text: 'vscode', link: '/note/study/vscode' },
        { text: '杂乱笔记', link: '/note/study/杂乱笔记' },
        { text: '项目配置', link: '/note/study/项目配置' },
        { text: 'vim-vscode', link: '/note/study/vim-vscode' },
        { text: 'react小技巧', link: '/note/study/react' },
      ],
    },
    {
      text: '其他',
      collapsed: true,
      collapsible: true,
      items: [
        { text: '2022年终总结', link: '/note/other/2022年终总结' },
        {
          text: '踩坑',
          link: '/note/other/踩坑',
        },
      ],
    },
    {
      text: 'linux',
      collapsed: true,
      collapsible: true,
      items: [
        { text: '挂载磁盘', link: '/note/linux/mount-disk' },
        { text: 'linux笔记', link: '/note/linux/linux笔记' },
        { text: 'archlinux', link: '/note/linux/archlinux' },
        { text: '踩坑', link: '/note/linux/error-resolve' },
      ],
    },
  ],
}
