import { createFireworks } from '@explosions/fireworks'
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment'
// import type { ClientModule } from '@docusaurus/types'

if (ExecutionEnvironment.canUseDOM) {
  createFireworks({
    selector: 'canvas.fireworks',
    // colors: ['#66A7DD', '#3E83E1', '#214EC2'],
    colors: ['#FFC0D9', '#FFD1DA', '#F1B4BB'],
  })
}

// const module: ClientModule = {
//   onRouteDidUpdate() {
//     if (typeof window === 'undefined') return

//     createFireworks({
//       selector: 'canvas.fireworks',
//       // colors: ['#66A7DD', '#3E83E1', '#214EC2'],
//       colors: ['#FFC0D9', '#FFD1DA', '#F1B4BB'],
//     })
//   },
// }

// export default module
