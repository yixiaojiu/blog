import { defineConfig } from 'vitepress'
import { themeConfig } from './theme-config'

export default defineConfig({
  lang: 'zh',
  title: '翊小久',
  description: '翊小久の个人博客',
  lastUpdated: true,
  themeConfig,
})
