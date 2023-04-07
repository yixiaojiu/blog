# HTML

## SEO 优化

[掘金 前端 SEO 优化](https://juejin.cn/post/6844903824428105735)

- 网站结构布局优化：控制首页链接数量、扁平化的目录层次（网站路由不要嵌套过深）
- meta 标签：name（Keywords、description、author）

```html
<meta name="keywords" content="HTML,SEO,blog,翊小久" />
```

- 使用语义化标签
- 前端网站性能优化：减少 http 请求数量、采用 lazyload、利用浏览器缓存、启用 GZIP 压缩，浏览速度变快，搜索引擎的蜘蛛抓取信息量也会增大

## SPA 怎么进行 SEO 优化

## HTML5 语义化

> 参考[语雀](https://www.yuque.com/cuggz/interview/gme0bw#2526e56666786604b36e9d839b72bcff)

语义化是指根据内容的结构化（内容语义化），选择合适的标签（代码语义化）。通俗来讲就是用正确的标签做正确的事情。

- 有利于 SEO，有助于爬虫抓取更多的有效信息
- 增强了可读性，结构更加清晰，便于团队的开发与维护
- 有利于不同设备解析代码（屏幕阅读器，盲人阅读器...）

### 有哪些语义化标签

header、footer、main、aside、article、section、h1/h2、p、strong/italic

## src 与 href 的区别

src 用于替换当前内容，href 用于在当前文档和引用资源之间确立联系
