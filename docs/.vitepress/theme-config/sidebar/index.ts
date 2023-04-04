import type { DefaultTheme } from 'vitepress'
import { note } from './note'
import { knowledge } from './knowledge'
import { learn } from './learn'

export const sidebar: DefaultTheme.Sidebar = {
  ...note,
  ...knowledge,
  ...learn,
}
