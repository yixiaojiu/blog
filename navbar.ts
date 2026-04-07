/**
 * 这个文件在 themeConfig.navbar 被用到，siderbars.ts 文件基本没动
 */
import {
  baguSiderbar,
  mnoteSiderbar,
  noteSiderbar,
  recordSiderbar,
} from './sidebars'

interface DocLinkNavbarItem {
  type: 'doc'
  docId: string
  label: string
}

interface NavbarItem {
  type: 'dropdown'
  label: string
  position: 'left'
  items: DocLinkNavbarItem[]
}

const noteDocIdMap: Record<string, string> = {
  AI: 'note/ai/llm',
  android: 'note/android/everything',
  前端: 'note/frontend/client-redirect',
  后端: 'note/backend/distributed',
  CS: 'note/cs/compilation-principle',
  Linux: 'note/linux/archlinux',
  Mac: 'note/mac/chrome',
  Rust: 'note/rust/basic',
  Windows: 'note/windows/chrome',
  杂货箱: 'note/everything/everything',
}

const mnoteDocIdMap: Record<string, string> = {
  摘抄: 'mnote/excerpt/everything',
  音乐: 'mnote/music/everything',
  碎碎念: 'mnote/thoughts/white-album2',
  赴日旅游攻略: 'mnote/travel-tips/everything',
  杂货箱: 'mnote/everything/yuiju',
}

const recordDocIdMap: Record<string, string> = {
  年度报告: 'record/annual-report/2024',
  橱窗: 'record/show-window/bangumi',
  OKR: 'record/okr/okr',
}

export const themeNavbar: NavbarItem[] = [
  {
    type: 'dropdown',
    items: (baguSiderbar as any[]).map((item) => ({
      type: 'doc',
      label: item.label,
      docId: item.items[0],
    })),
    position: 'left',
    label: '📙八股',
  },
  {
    type: 'dropdown',
    items: (noteSiderbar as any[]).map((item) => ({
      type: 'doc',
      label: item.label,
      docId: noteDocIdMap[item.label],
    })),
    position: 'left',
    label: '📃技术小记',
  },
  {
    type: 'dropdown',
    items: (mnoteSiderbar as any[]).map((item) => ({
      type: 'doc',
      label: item.label,
      docId: mnoteDocIdMap[item.label],
    })),
    position: 'left',
    label: '📝杂记',
  },
  {
    type: 'dropdown',
    items: (recordSiderbar as any[]).map((item) => ({
      type: 'doc',
      label: item.label,
      docId: recordDocIdMap[item.label],
    })),
    position: 'left',
    label: '🎫记录',
  },
]
