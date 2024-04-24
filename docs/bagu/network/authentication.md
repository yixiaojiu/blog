# 认证

> [傻傻分不清之 Cookie、Session、Token、JWT](https://juejin.cn/post/6844904034181070861)

cookie 是服务器发送到用户浏览器并保存在本地的一小块数据，它会在浏览器下次向同一服务器再发起请求时被携带并发送到服务器上。

session 是基于 cookie 实现的，session 存储在服务器端，sessionId 会被存储到客户端的cookie 中

Token 的简单组成 uid(用户唯一的身份标识)、time(当前时间的时间戳)、sign

JWT 类似这样 `Authorization: Bearer <token>`

## Token 和 JWT 的区别

- Token：服务端验证客户端发送过来的 Token 时，还需要查询数据库获取用户信息，然后验证 Token 是否有效。
- JWT： 将 Token 和 Payload 加密后存储于客户端，服务端只需要使用密钥解密进行校验（校验也是 JWT 自己实现的）即可，不需要查询或者减少查询数据库，因为 JWT 自包含了用户信息和加密的数据。
