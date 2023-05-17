import type { DefaultTheme } from 'vitepress'

export const note: DefaultTheme.SidebarMulti = {
  '/note/': [
    {
      text: '小记',
      items: [
        { text: 'vscode', link: '/note/study/vscode' },
        { text: '杂乱笔记', link: '/note/study/杂乱笔记' },
        { text: '项目配置', link: '/note/study/项目配置' },
        { text: 'react小技巧', link: '/note/study/react' },
      ],
    },
    {
      text: 'linux',
      collapsed: true,
      items: [
        { text: 'linux笔记', link: '/note/linux/linux笔记' },
        { text: '常用命令', link: '/note/linux/commands' },
        { text: 'Vim', link: '/note/linux/vim' },
        { text: 'archlinux', link: '/note/linux/archlinux' },
        { text: 'MySql', link: '/note/linux/mysql' },
        { text: '挂载磁盘', link: '/note/linux/mount-disk' },
        { text: 'zsh', link: '/note/linux/zsh' },
        { text: '踩坑', link: '/note/linux/error-resolve' },
      ],
    },
    {
      text: 'Mac',
      collapsed: true,
      items: [
        { text: 'Mac使用', link: '/note/mac/mac-use' },
        { text: 'Chrome', link: '/note/mac/chrome' },
        { text: 'VS Code', link: '/note/mac/vscode' },
      ],
    },
    {
      text: '其他',
      collapsed: true,
      items: [
        { text: '2022年终总结', link: '/note/other/2022年终总结' },
        {
          text: '踩坑',
          link: '/note/other/踩坑',
        },
      ],
    },
  ],
}
