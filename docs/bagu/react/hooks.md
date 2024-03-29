# hooks

## 对 hooks 的理解

hooks 增强了函数式组件的功能，使函数式组件有了状态。

函数组件真正地将数据和渲染绑定到了一起。函数组件是一个更加匹配其设计理念、也更有利于逻辑拆分与重用的组件表达形式。

## 为什么 useState 的返回值要使用数组而不是对象

数组解构后可以对数组元素进行重命名，而对象解构后需要使用别名

## React Hooks 解决了哪些问题

- 组件之间难以复用状态逻辑
- 复杂组件变得难以理解

## React Hook 的限制

- 不要在循环、条件或嵌套函数中调用 Hook
- 在 React 的函数组件中调用 Hook

因为 Hooks 的设计是基于链表实现，在调用时按顺序加入链表中，如果使用循环、条件或嵌套函数很有可能导致链表取值错位，执行错误的 Hook

## useEffect 与 useLayoutEffect 的区别

useEffect 在 React 的渲染过程中是被**异步调用**的，且在 dom 更新后；而 useLayoutEffect 会在所有的 DOM 更新前**同步调用**，主要用于处理 DOM 操作、调整样式、避免页面闪烁等问题

## useTransition

在 concurrency 模式下，useTransition 可以将某些更新标记为`可中断的`和`非紧急的`
