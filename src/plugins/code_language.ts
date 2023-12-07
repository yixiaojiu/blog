import { Plugin, LoadContext } from '@docusaurus/types'

export default function myPlugin(context: LoadContext): Plugin {
  return {
    name: 'code_language',
    contentLoaded({ content, actions }) {
      console.log(content)
    },
  }
}
