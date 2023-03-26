# 虚拟 DOM

## 对虚拟 DOM 的理解

- 对虚拟 DOM 将 DOM 抽象成 JS 对象，配合不同渲染工具，使跨平台渲染成为可能。
- 通过事务处理机制，将多次 DOM 修改的结果一次性的更新到页面上，从而有效的减少页面渲染的次数，减少修改 DOM 的重绘重排次数，提高渲染性能

## React diff

[图解 React 的 diff 算法：核心就两个字 —— 复用](https://juejin.cn/post/7131741751152214030)

ssr 没有 diff

浏览器下使用 react-dom 的渲染器，会先把 vdom 转成 fiber，找到需要更新 dom 的部分，打上增删改的 effectTag 标记，这个过程叫做 reconcile，可以打断，由 scheducler 调度执行。reconcile 结束之后一次性根据 effectTag 更新 dom，叫做 commit。

react 的 diff 算法分为两个阶段：

1. 对比，如果可以复用就下一个，不可以复用就结束
2. 把剩下的老 fiber 放到 map 里，遍历剩余的 vdom，一一查找 map 中是否有可复用的节点。

最后把剩下的老 fiber 删掉，剩下的新 vdom 新增

## 虚拟 DOM 的引入与直接操作原生 DOM 相比，哪一个效率更高，为什么

虚拟 DOM 相对原生的 DOM 不一定是效率更高

虚拟 DOM 的优越之处在于，它能够在提供更爽、更高效的研发模式（也就是函数式的 UI 编程方式）的同时，仍然保持一个还不错的性能。
