import type { Plugin } from '@docusaurus/types'

export default function (): Plugin {
  return {
    name: 'busuanzi',

    injectHtmlTags() {
      return {
        headTags: [
          {
            tagName: 'script',
            attributes: {
              async: true,
              src: '//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js',
            },
          },
        ],
      }
    },
  }
}
