# 基础

> 参考 [前端面试题之 React 篇](https://www.yuque.com/cuggz/interview/pgw8v4)

## 事件机制

> 参考 [React17 事件机制](https://juejin.cn/post/7164583106920316941)

React 将所有 dom 的事件都委托到一个节点上，React 16 为 document，React 17 为 根 DOM 容器。

**合成事件** `SyntheticEvent` 是 React 事件系统对于原生事件跨浏览器包装器。它除了兼容所有浏览器外，它还拥有和浏览器原生事件相同的接口，包括 stopPropagation() 和 preventDefault()

![react_17_delegation](https://legacy.reactjs.org/static/bb4b10114882a50090b8ff61b3c4d0fd/78612/react_17_delegation.png)

- 将事件都代理到了根节点上，减少了事件监听器的创建，节省了内存
- 磨平浏览器差异，开发者无需兼容多种浏览器写法，如想阻止事件传播只需写 `event.stopPropagation()`

## React Fiber

React Fiber 为了解决 stack reconciler 无法中断，导致渲染线程挂起的问题。Fiber 把一个渲染任务分解为多个渲染任务，在空闲时间里去执行任务，可以让出控制权执行其他任务，实现更流畅的用户体验

## 为什么 useState 的返回值要使用数组而不是对象

数组解构后可以对数组元素进行重命名，而对象解构后需要使用别名

## React Hook 的限制

- 不要在循环、条件或嵌套函数中调用 Hook
- 在 React 的函数组件中调用 Hook

因为 Hooks 的设计是基于链表实现，在调用时按顺序加入链表中，如果使用循环、条件或嵌套函数很有可能导致链表取值错位，执行错误的 Hook

## useEffect 与 useLayoutEffect 的区别

useEffect 在 React 的渲染过程中是被**异步调用**的，且在 dom 更新后；而 useLayoutEffect 会在所有的 DOM 更新前**同步调用**，主要用于处理 DOM 操作、调整样式、避免页面闪烁等问题

## useTransition

在 concurrency 模式下，useTransition 可以将某些更新标记为`可中断的`和`非紧急的`

## 对虚拟 DOM 的理解

- 对虚拟 DOM 将 DOM 抽象成 JS 对象，配合不同渲染工具，使跨平台渲染成为可能。
- 通过事务处理机制，将多次 DOM 修改的结果一次性的更新到页面上，从而有效的减少页面渲染的次数，减少修改 DOM 的重绘重排次数，提高渲染性能

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

## React-Router 的实现原理

基于 `history` 库来实现上述不同客服端路由

**hash 路由：** 监听 hashchange 事件，通过 location.hash=xxx 改变 hash 值

**H5 history 路由：** 通过 history.pushState 和 resplaceState 改变路由，通过自定义事件触发实现
