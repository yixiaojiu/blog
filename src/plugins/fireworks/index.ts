import path from 'node:path'
import type { Plugin } from '@docusaurus/types'

export default function (): Plugin {
  return {
    name: 'fireworks',

    injectHtmlTags() {
      return {
        postBodyTags: [
          {
            tagName: 'canvas',
            attributes: {
              class: 'fireworks',
              style:
                'position: fixed; left: 0; top: 0; z-index: 500; pointer-events: none',
            },
          },
        ],
      }
    },

    getClientModules() {
      return [path.join(__dirname, './initFireworks')]
    },
  }
}
