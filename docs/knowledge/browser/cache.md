# 浏览器缓存

## 强缓存

> [HTTP 缓存](https://juejin.cn/post/7060876277376352293)

Cache-Control 相对时间，Expires 绝对时间，Cache-Control 的优先级高于 Expires

**Cache-Control 参数：**

可缓存性

- `public` 表明响应可以被任何对象（包括：发送请求的客户端，代理服务器，等等）缓存
- `private` 表明响应只能被单个用户缓存，不能作为共享缓存（即代理服务器不能缓存它）
- `no-cache` 不使用强缓存，但有协商缓存
- `no-store` 不使用任何缓存

过期

- `max-age=<seconds>` 缓存存储的最大周期，超过这个周期被认为过期

重新验证和重新加载

- `must-revalidate` 如页面过期，则去服务器进行获取

其他

- `only-if-cached` 不进行网络请求，完全只使用缓存

## 协商缓存

**【注意】** 强缓存没用命中会走协商缓存，直接开启协商缓存的办法是 Cache-Control 设置为 no-cache

**Last-Modified、If-Modified-Since**

GMT 格式的时间字符串，代表的是文件的最后修改时间

1. 响应头 Last-Modified 告诉浏览器资源的最后修改时间
2. 请求时 If-Modified-Since 带上 Last-Modified 的时间
3. 服务端进行对比，如果一致，则返回 304；如果已经修改，则返回资源和 200

**Etag、If-None-Match**

## 为什么需要缓存

- 减少了服务器的负担，提高了网站的性能
- 加快了客户端网页的加载速度
- 减少了多余网络数据传输

## 缓存存储位置

优先级从高到低分别是：

1. Service Worker：Service Worker 运行在 JavaScript 主线程之外，它可以让我们自由控制缓存哪些文件、如何匹配缓存、如何读取缓存
2. Memory Cache：缓存持续性很短，会随着进程的释放而释放
3. Disk Cache：即使在跨站点的情况下，相同地址的资源一旦被硬盘缓存下来，就不会再次去请求数据。