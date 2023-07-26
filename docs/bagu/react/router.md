# 路由

## react-router 里的 Link 标签和 a 标签的区别

react-router 接管了其默认的链接跳转行为，只会触发相匹配的 route 对应的页面内容更新。而不会刷新整个页面

`<Link>` 做了 3 件事情:

- 有 onclick 那就执行 onclick
- click 的时候阻止 a 标签默认事件
- 在页面不刷新的情况下跳转路由

## a 标签默认事件禁掉之后做了什么才实现了跳转?

```js
let domArr = document.getElementsByTagName('a')
[...domArr].forEach(item=>{
    item.addEventListener('click',function () {
        location.href = this.href
    })
})
```

## React-Router 的实现原理

基于 `history` 库来实现上述不同客服端路由

**hash 路由：** 监听 hashchange 事件，通过 location.hash=xxx 改变 hash 值

**H5 history 路由：** 通过 history.pushState 和 resplaceState 改变路由，通过自定义事件触发实现
