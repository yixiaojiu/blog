# 状态管理

## setState

在代码中调用 setState 函数之后，React 会将传入的参数对象与组件当前的状态合并，然后触发调和过程(Reconciliation)

如果在短时间内频繁 setState。React 会将 state 的改变压入栈中，在合适的时机，批量更新 state 和视图

## setState 是同步还是异步的

react 18 以前，通过 `isBatchingUpdates` 来判断 setState 是先存进 state 队列还是直接更新，如果值为 true 则执行异步操作，为 false 则直接更新

**异步：** 在 React 可以控制的地方，就为 true，比如在 React 生命周期事件和合成事件中，都会走合并操作，延迟更新的策略
**同步：** 在 React 无法控制的地方，比如原生事件，具体就是在 addEventListener 、setTimeout、setInterval 等事件中，就只能同步更新。

react 18 以后，setState 都为异步，可以使用 `flushSync` 方法，使之变为同步

## React 中 setState 的第二个参数作用是什么

是一个回调函数，在组件重新渲染后执行，可以拿到更新后的 state。等价于在 componentDidUpdate 生命周期内执行

## React 中怎么检验 props

```js
import PropTypes from 'prop-types'

class Greeting extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>
  }
}

Greeting.propTypes = {
  name: PropTypes.string,
}
```

## Redux 和 Vuex 异同

### 共同思想

- 单—的数据源
- 变化可以预测

### 区别

- Vuex 改进了 Redux 中的 Action 和 Reducer 函数，以 mutations 变化函数取代 Reducer，无需 switch，只需在对应的 mutation 函数里改变 state 值即可
- Vuex 由于 Vue 自动重新渲染的特性，无需订阅重新渲染函数，只要生成新的 State 即可
