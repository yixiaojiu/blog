# vuera 和 全屏

## vuera

> [掘金](https://juejin.cn/post/7124084852499939358)

### React in Vue

ReactWrapper 导出一个 Vue 组件。该组件以 div 作为跟容器挂载 React 组件

创建两个 ref: `react` 和 `reactComponentRef`

- `react`: 用于储存跟节点(div)，在 ReactWrapper 销毁前执行 `ReactDOM.unmountComponentAtNode(this.$refs.react)`
- `reactComponentRef`: 用于储存 React 实例

### Vue in React

VueWrapper 导出一个 React 组件。该组件以 div 作为跟容器挂载 Vue 组件

用 `vueInstance` 保存 new Vue 创建的实例

## 全屏

> [前端 JS-全屏总结](https://juejin.cn/post/7251415042742321212)

在全屏容器没有设置背景时，默认背景是黑色。解决方案：给全屏容器设置背景颜色

全屏

- element.requestFullScreen，退出全屏 document.exitFullScreen
- display: fixed;

缩放

- scale: 会改变一些东西，缩放之后，固定定位会变成绝对定位
- zoom: FireFox 不支持
