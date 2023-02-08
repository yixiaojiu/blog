import type { DefaultTheme } from 'vitepress'
import { note } from './note'
import { baguNote } from './baguNote'
import { frontEnd } from './frontEnd'

export const sidebar: DefaultTheme.Sidebar = {
  ...note,
  ...baguNote,
  ...frontEnd,
}
