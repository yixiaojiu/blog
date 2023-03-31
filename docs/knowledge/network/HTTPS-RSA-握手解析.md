# HTTPS TLS 握手解析

> 总结自[小林](https://xiaolincoding.com/network/2_http/https_rsa.html#tls-握手过程)

HTTPS 在 HTTP 与 TCP 层之间加入 TLS 协议来解决 HTTP 的三个问题: 窃听风险、篡改风险、冒充风险

TLS 通过信息加密、校验机制、身份证明来解决 HTTP 的安全问题

---

## TLS 握手过程

TSL 版本 1.2
不对称加密用 RSA

1. TLS 第一次握手
   - 客户端发送 `Client Hello `，里面包含生成的**随机数(Client Random)**、TLS 版本号、支持的密码套件列表
2. TLS 第二次握手
   - 收到客户端的`Client Hello`返回`Server Hello`，里面包含确认的 TSL 版本号，生成的**随机数(Server Random)**，从客户端支持的密码套件列表中选择一个合适的密码套件
   - 服务端发送`Server Certificate`，包含数字证书
   - 服务端发生`Server Hello Done`，告知该发的东西已经发了，本次打招呼结束
   - 客户端验证数字证书
3. TLS 第三次握手
   - 客户端生成新的**随机数(pre-master)**，用服务器的 RSA 公钥(从数字证书获得)加密，通过`Client Key Exchange`消息传给服务端
   - 双方都已经得到三个随机数，分别是`Client Random、Server Random、pre-master`，生成会话密钥
   - 客户端发送`Change Cipher Spec`，告知服务端使用加密方式发送消息
   - 客户端发送`Encrypted Handshake Message（Finishd）`，把之前所有发送的数据做个**摘要**，让服务端做个验证
4. TLS 第四次握手 -服务端发送`Change Cipher Spec`和`Encrypted Handshake Message`
   - 如果双方都验证加密和解密没问题，那么握手正式完成
