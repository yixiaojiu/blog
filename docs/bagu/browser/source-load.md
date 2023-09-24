# 资源加载

- 图片/视频/字体会阻塞页面加载嘛？

不会阻塞 DOM 的加载与渲染，但会影响 onload 事件的触发

- CSS 加载阻塞

CSS 不会阻塞 DOM 的解析，但会阻塞 DOM 的渲染

## script 标签执行顺序

![javascript order](./images/javascript-loading-order.jpeg)

[图片来源](https://twitter.com/wesbos/status/1694081235729928529/photo/1)

1. async 属性，异步请求脚本。如果请求完成时，HTML 还没有解析完，会暂停 HTML 解析，执行 JS 代码。多个 async script 标签，执行顺序不确定
2. defer 属性，异步请求脚本，等待 HTML 解析完毕再执行 JS 代码。多个 defer script 标签，按照 HTML 中出现的顺序执行
3. 动态创建 DOM 方式

## DOMContentLoaded 和 onload

- `onload`：当页面所有资源（包括 CSS、JS、图片、字体、视频等）都加载完成才触发，而且它是绑定到 window 对象上；
- `DOMContentLoaded`：当 HTML 已经完成解析，并且构建出了 DOM，但此时外部资源比如样式和脚本可能还没加载完成，并且该事件需要绑定到 document 对象上；

## link标签 rel 属性

- `preload`：提升了资源加载的优先级，使得它提前开始加载（预加载）
- `prefetch`：用于加载未来（比如下一个页面）会用到的资源，并且告诉浏览器在空闲的时候去下载，它会将下载资源的优先级降到最低
- `preconnect`：用于跨域请求资源，提前与其他域名建立连接
- `dns-prefetch`：提起解析其他域名，优先级高的资源用 preconnect，优先级低的用 dns-prefetch
