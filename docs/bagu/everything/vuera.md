# vuera

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
