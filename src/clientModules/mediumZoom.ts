import mediumZoom from 'medium-zoom'
import type { ClientModule } from '@docusaurus/types'

function getBackgroundColor() {
  const isDarkMode = document.querySelector('html[data-theme="dark"]')

  return isDarkMode ? 'rgb(50, 50, 50)' : 'rgb(255, 255, 255)'
}

const module: ClientModule = {
  onRouteDidUpdate() {
    const zoomObject = mediumZoom('.markdown img', {
      background: getBackgroundColor(),
    })
    const observer = new MutationObserver(function () {
      if (!zoomObject) {
        return
      }

      zoomObject.update({ background: getBackgroundColor() })
    })

    const htmlNode = document.querySelector('html')

    observer.observe(htmlNode!, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })
  },
}
export default module
