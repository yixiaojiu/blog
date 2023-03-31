# HTTP

> [小林 coding](https://xiaolincoding.com/network/2_http/http_interview.htm)

## 状态码

> [一篇梳理 http 返回的状态码](https://juejin.cn/post/7030428038953173029) [MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status)

### 信息响应

1xx 类状态码属于提示信息，是协议处理中的一种中间状态，实际用到的比较少

- 100 `Continue` 客户端应该继续请求
- 101 `Switching Protocols` 该代码是响应客户端的 Upgrade 请求头发送的，指明服务器即将切换的协议，比如：websocket

### 成功响应

- 201 `Created` 该请求已成功，并因此创建了一个新的资源。这通常是在 POST 请求，或是某些 PUT 请求之后返回的响应。
- 202 `Accepted` 已接受。已经接受请求，但未处理完成
- 203 `Non-Authoritative Information` 非授权信息。请求成功。但返回的 meta 信息不在原始的服务器，而是一个副本
- 204 `No Content` 对于该请求没有的内容可发送，但头部字段可能有用。用户代理可能会用此时请求头部信息来更新原来资源的头部缓存字段。
- 205 `Reset Content` 告诉用户代理重置发送此请求的文档。
- 206 `Partial Content` 当从客户端发送 Range 范围标头以只请求资源的一部分时，将使用此响应代码。

### 重定向消息

- 300 `Multiple Choice` 请求的资源可包括多个位置，用户代理或者用户应当从中选择一个
- 301 `Moved Permanently` 请求资源的 URL 已永久更改。在响应中给出了新的 URL。
- 302 `Found` 资源临时移动，未来可能会对 URI 进行进一步的改变
- 303 `See Other` 服务器发送此响应，以指示客户端通过一个 GET 请求在另一个 URI 中获取所请求的资源
- 304 `Not Modified` 缓存的目的。它告诉客户端资源还没有被修改
- 305 `Use Proxy` 所请求的资源必须通过代理访问。已被弃用
- 306 `unused` 此响应代码不再使用；它只是保留。它曾在 HTTP/1.1 规范的早期版本中使用过。
- 307 `Temporary Redirect` 与 302 具有相同的语义，但需要使用在前一个请求中使用的相同方法在另一个 URI 上获取所请求的资源
- 308 `Permanent Redirect` 与 301 具有相同的语义，但需要使用在前一个请求中使用的相同方法在另一个 URI 上获取所请求的资源

### 客户端错误响应

- 400 `Bad Request` 客户端错误，服务器无法或不会处理请求。
- 401 `Unauthorized` 客户端必须对自身进行身份验证才能获得请求的响应
- 402 `Payment Required` 保留供将来使用，最初目的是将其用于数字支付系统
- 403 `Forbidden` 客户端没有访问内容的权限，与 401 不同，服务器知道客户端的身份
- 405 `Method Not Allowed` 请求方法不允许
- 406 `Not Acceptable` 服务器无法根据客户端请求的内容特性完成请求
- 407 `Proxy Authentication Required` 类似于 401，但是认证需要由代理完成。
- 410 `Gone` 当请求的内容已从服务器中永久删除且没有转发地址时

### 服务端错误响应

- 500 `Internal Server Error` 服务器遇到了不知道如何处理的情况
- 501 `Not Implemented` 服务器不支持请求的功能，无法完成请求
- 502 `Bad Gateway` 网关或代理的服务器，从上游服务器中接收到的响应是无效的
- 503 `Service Unavailable` 由于超载或系统维护，服务器暂时的无法处理客户端的请求，`Retry-After` 字段应该包含恢复服务之前的估计时间
- 504 `Gateway Timeout` 当服务器充当网关且无法及时获得响应时，会给出此错误响应。

## URL URI

URL 是 URI 的一个子集

HTTP 的 URL 使用定位的方式实现的 URI

## HTTP 协议组成

请求行 请求头 空行 请求体

## HTTP 请求方法

- `HEAD` 获取报文首部，与 GET 相比，不返回报文主体部分
- `OPTION` 询问支持的请求方法，用来跨域请求

## 常见的 HTTP 请求头和响应头

### 请求头

> [HTTP headers 之 host, referer, origin](https://juejin.cn/post/6844903954455724045)

- Accept：浏览器能够处理的 MIME 类型
- Accept-Charset：浏览器能够显示的字符集
- Accept-Encoding：浏览器能够处理的压缩编码
- Accept-Language：浏览器当前设置的语言
- Connection：浏览器与服务器之间连接的类型，keep-alive，close
- Range：用于断点续传，告诉服务器自己想取哪一部分
- Host：指明了请求服务器的域名/IP 地址和端口号，有了 Host 字段，就可以将请求发往同一台服务器上的不同网站
- Referer：发出请求的页面的 URL，可以设置防盗链
- Origin：不包含任何路径信息，与 Referer 首部字段相似，用于 CORS

### 响应头

- Date：当前的 GMT 时间
- Refresh：表示浏览器应该在多少时间之后刷新文档
- Allow：服务器支持哪些请求方法
- Location：重定向
- Server：服务器名字
- Expires：应该在什么时候认为文档已经过期
- Cache-Control：缓存
- Pragma: no-cache HTTP/1.0 中规定的通用首部，那时候 HTTP/1.1 协议中的 Cache-Control 还没有出来

## 缓存

### 强缓存

> [HTTP 缓存](https://juejin.cn/post/7060876277376352293)

Cache-Control 相对时间，Expires 绝对时间，Cache-Control 的优先级高于 Expires

**Cache-Control 参数：**

可缓存性

- `public` 表明响应可以被任何对象（包括：发送请求的客户端，代理服务器，等等）缓存
- `private` 表明响应只能被单个用户缓存，不能作为共享缓存（即代理服务器不能缓存它）
- `no-cache` 不使用强缓存，需要与服务器验协商缓存验证
- `no-store` 不使用任何缓存

过期

- `max-age=<seconds>` 缓存存储的最大周期，超过这个周期被认为过期

重新验证和重新加载

- `must-revalidate` 如页面过期，则去服务器进行获取

其他

- `only-if-cached` 不进行网络请求，完全只使用缓存

### 协商缓存

**Last-Modified、If-Modified-Since**

GMT 格式的时间字符串，代表的是文件的最后修改时间

1. 响应头 Last-Modified 告诉浏览器资源的最后修改时间
2. 请求时 If-Modified-Since 带上 Last-Modified 的时间
3. 服务端进行对比，如果一致，则返回 304；如果已经修改，则返回资源和 200

**Etag、If-None-Match**

过程与上面一致

## HTTP/1.1 特性

优点：简单，灵活和易于扩展，应用广泛和跨平台
缺点：无状态双刃剑，不安全

HTTP/1.1 性能

1. 长连接
2. 管道网络传输

即可在同一个 TCP 连接里面，客户端可以发起多个请求，只要第一个请求发出去了，不必等其回来，就可以发第二个请求出去

但是服务器必须按照接收请求的顺序发送对这些管道化请求的响应

如果服务端在处理 A 请求时耗时比较长，那么后续的请求的处理都会被阻塞住，这称为「队头堵塞」

## HTTP 演变

### HTTP/1.1 相比 HTTP/1.0

- 使用长连接的方式改善了 HTTP/1.0 短连接造成的性能开销
- 支持管道（pipeline）网络传输

### HTTP/2

HTTP/2 协议是基于 HTTPS

- 头部压缩：如果你同时发出多个请求，他们的头是一样的或是相似的，那么，协议会帮你消除重复的部分。
- 二进制格式：头信息和数据体都是二进制，并且统称为帧
- 并发传输：引出了 Stream 概念，多个 Stream 复用在一条 TCP 连接
- 服务器主动推送资源：

在 TCP 这一层，存在“队头阻塞”的问题

### HTTP/3

基于 UDP 的 QUIC 协议 可以实现类似 TCP 的可靠性传输

QUIC 有以下 3 个特点

- 无队头阻塞
- 更快的连接建立
- 连接迁移
