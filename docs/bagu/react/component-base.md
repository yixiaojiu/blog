# 组件基础

> 参考 [前端面试题之 React 篇](https://www.yuque.com/cuggz/interview/pgw8v4)

## 事件机制

> 参考 [React17 事件机制](https://juejin.cn/post/7164583106920316941)

React 将所有 dom 的事件都委托到一个节点上，React 16 为 document，React 17 为 根 DOM 容器。

**合成事件** `SyntheticEvent` 是 React 事件系统对于原生事件跨浏览器包装器。它除了兼容所有浏览器外，它还拥有和浏览器原生事件相同的接口，包括 stopPropagation() 和 preventDefault()

![react_17_delegation](https://legacy.reactjs.org/static/bb4b10114882a50090b8ff61b3c4d0fd/78612/react_17_delegation.png)

- 将事件都代理到了根节点上，减少了事件监听器的创建，节省了内存
- 磨平浏览器差异，开发者无需兼容多种浏览器写法，如想阻止事件传播只需写 `event.stopPropagation()`

## React 高阶组件、Render props、hooks

- `高阶组件(HOC)` 是参数为组件，返回值为新组件的函数，是一种基于 React 的组合特性而形成的设计模式
- `render props` 将一个渲染函数作为 props ，类似插槽
- `Hooks` 通过自定义 hook，可以复用代码逻辑

## React Fiber

React Fiber 为了解决 stack reconciler 无法中断，导致渲染线程挂起的问题。Fiber 把一个渲染任务分解为多个渲染任务，在空闲时间里去执行任务，可以让出控制权执行其他任务，实现更流畅的用户体验

## React.PureComponent

当组件更新时，如果组件的 props 或者 state 都没有改变，render 函数就不会触发。现在 React 官方已经不推荐使用 class 组件

## React 重新渲染

- setState 方法被调用。特殊情况：setState 传入 null 时，并不会触发 render
- useReducer 返回的 dispatch
- 组件订阅的 context value 发生变更
- 父组件重新渲染。

## React 如何判断什么时候重新渲染组件？

当 React 将要渲染组件时会执行 shouldComponentUpdate 方法来看它是否返回 true，所以重写 shouldComponentUpdate 方法

## createPortal

使得组件可以脱离父组件层级挂载在 DOM 树的任何位置

```js
ReactDOM.createPortal(child, container)
```

## 受控组件和非控组件

输入类的 DOM 如果是现用现取的称为非受控组件，而通过 setState 将输入的值维护到了 state 中，需要时再从 state 中取出，这里的数据就受到了 state 的控制，称为受控组件

## 类组件与函数组件有什么异同

### 相同点

- 无论是函数组件还是类组件，在使用方式和最终呈现效果上都是完全一致的
- 在现代浏览器中，闭包和类的性能只在极端场景下才会有明显的差别

### 不同点

- 开发时的心智负担不同。类组件是基于面向对象编程的，它主打的是继承、生命周期等核心概念；而函数组件内核是函数式编程，主打的是 immutable、没有副作用、引用透明等特点
- 官方更推崇“组合优于继承”的设计概念，hooks 也让生命周期的概念渐渐淡出
- 性能优化上，类组件主要依靠 shouldComponentUpdate 阻断渲染来提升性能，而函数组件依靠 React.memo 缓存渲染结果来提升性能
- 类组件在未来时间切片与并发模式中，由于生命周期带来的复杂度，并不易于优化
