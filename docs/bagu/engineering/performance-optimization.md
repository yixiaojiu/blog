# 性能优化

- 小图片 Base64
- 使用缓存
- 不使用css@import: css@import会造成额外的请求
- html, css, js 压缩
- 图片压缩
- 使用 CDN，CDN 预解析
- 异步 script 标签
- 模块按需加载，路由懒加载
- 资源的预加载，通过 link 标签的 rel="preload"
- 使用骨架屏与 loading 动画

## 图片懒加载

参考 [五种方式实现图片懒加载](https://juejin.cn/post/7080544007834730510)

1. HTML元素延迟加载属性, loading="lazy"
2. offsetTop - scrollTop < = innerHeight

给img的src设为loading图片的路径，data-src设为图片真实路径

监听 scroll 进行判断

```js
function isInViewPortOfOne(el) {
  const viewPortHeight = document.documentElement.clientHeight

  const offsetTop = el.offsetTop
  const scrollTop = document.documentElement.scrollTop
  const top = offsetTop - scrollTop
  return top <= viewPortHeight
}
```

3. getBoundingClientRect

```js
function isInViewPort(element) {
  const viewWidth = window.innerWidth || document.documentElement.clientWidth;
  const viewHeight = window.innerHeight || document.documentElement.clientHeight;
  const {
    top,
    right,
    bottom,
    left,
  } = element.getBoundingClientRect();
​
  return (
    top >= 0 &&
    left >= 0 &&
    right <= viewWidth &&
    bottom <= viewHeight
  );
}

```

4. IntersectionObserver

判断两个元素是否重叠
