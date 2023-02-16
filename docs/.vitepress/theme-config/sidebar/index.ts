import type { DefaultTheme } from 'vitepress'
import { note } from './note'
import { baguNote } from './baguNote'
import { learn } from './learn'

export const sidebar: DefaultTheme.Sidebar = {
  ...note,
  ...baguNote,
  ...learn,
}
