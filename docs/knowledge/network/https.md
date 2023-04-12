# HTTPS

> 内容与图片均来自 [小林 coding](https://xiaolincoding.com/)

## HTTPS 解决了 HTTP 的哪些问题？

HTTP 的问题：

- 窃听风险：通过信息加密，交互信息无法被窃取
- 篡改风险：通过校验机制，无法篡改通信内容，篡改了就不能正常显示
- 冒充风险：通过身份证书，验证服务端身份

## 一些名词

- 混合加密：对称加密和非对称加密结合
- 摘要：用哈希函数来计算出内容的哈希值
- 数字签名：通过「私钥加密，公钥解密」的方式，来确认消息的身份，不过私钥加密内容不是内容本身，而是对内容的哈希值加密

## 非对称加密算法的目的

- **公钥加密，私钥解密：** 这个目的是为了保证内容传输的安全，因为被公钥加密的内容，其他人是无法解密的，只有持有私钥的人，才能解密出实际的内容；
- **私钥加密，公钥解密：** 这个目的是为了保证消息不会被冒充，验证身份，因为私钥是不可泄露的，如果公钥能正常解密出私钥加密的内容，就能证明这个消息是来源于持有私钥身份的人发送的。

## 数字证书签发和验证流程

![小林 coding](https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost4@main/%E7%BD%91%E7%BB%9C/https/%E8%AF%81%E4%B9%A6%E7%9A%84%E6%A0%A1%E9%AA%8C.png)

证书信任链

![小林 coding](https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost4@main/%E7%BD%91%E7%BB%9C/https/%E8%AF%81%E4%B9%A6%E9%93%BE.png)

证书链的原因：为了确保根证书的绝对安全性，将根证书隔离地越严格越好，不然根证书如果失守了，那么整个信任链都会有问题。

## RSA 握手

1. TLS 第一次握手
   - 客户端发送 `Client Hello `，里面包含生成的**随机数(Client Random)**、TLS 版本号、支持的密码套件列表
2. TLS 第二次握手
   - `Server Hello`，里面包含确认的 TSL 版本号，生成的**随机数(Server Random)**，合适的密码套件
   - `Certificate`，包含数字证书
   - `Server Hello Done`，告知该发的东西已经发了，本次打招呼结束
3. TLS 第三次握手
   - 客户端验证数字证书
   - `Client Key Exchange`，生成新的**随机数(pre-master)**，用服务器的 RSA 公钥(从数字证书获得)加密，通过消息传给服务端
   - 双方都已经得到三个随机数，生成会话密钥
   - `Change Cipher Spec`，告知服务端使用加密方式发送消息
   - `Encrypted Handshake Message`，把之前所有发送的数据做个摘要，让服务端做个验证
4. TLS 第四次握手 -服务端发送`Change Cipher Spec`和`Encrypted Handshake Message`
   - 如果双方都验证加密和解密没问题，那么握手正式完成

![RSA](https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost4@main/%E7%BD%91%E7%BB%9C/https/https_rsa.png)

使用 RSA 密钥协商算法的最大问题是不支持前向保密。因为客户端传递随机数（用于生成对称加密密钥的条件之一）给服务端时使用的是公钥加密的，服务端收到后，会用私钥解密得到随机数。所以一旦服务端的私钥泄漏了，过去被第三方截获的所有 TLS 通讯密文都会被破解。

## 离散对数

![](https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost4@main/%E7%BD%91%E7%BB%9C/https/%E7%A6%BB%E6%95%A3%E5%AF%B9%E6%95%B0.png)

当模数 p 是一个很大的质数，即使知道底数 a 和真数 b，也很难推算出离散对数

## DH 算法

假设通信双方为小红和小明

1. 首先确定模数（P）和底数（G）
2. 双方生成随机整数作为私钥，小红记为 a，小明记为 b
3. 双方算出公钥并交换，小红的公钥记作 A，A = G ^ a ( mod P )；小明的公钥记作 B，B = G ^ b ( mod P )
4. 离散对数的幂运算有交换律，双方计算出对称加密密钥。小红：K = B ^ a ( mod P )；小明：K = A ^ b ( mod P )

![](https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost4@main/%E7%BD%91%E7%BB%9C/https/dh%E7%AE%97%E6%B3%95.png)

整个密钥协商过程中，小红和小明公开了 4 个信息：P、G、A、B，很难算出 a、b

## DHE 算法

根据私钥生成的方式，DH 算法分为两种实现：

- static DH 算法，已废弃。一方的私钥（一般是服务器）不变，如果这个私钥泄漏，之前截获的加密数据会被破解，所以 **static DH 算法不具备前向安全性**
- DHE 算法，现在常用的。双方都是随机的

## ECDHE 算法

[ECDHE bilibili 技术蛋老师](https://www.bilibili.com/video/BV1BY411M74G)

DHE 算法计算性能不佳，ECDHE 算法是在 DHE 算法的基础上利用了 ECC 椭圆曲线特性

椭圆曲线特性 a(bG) = b(aG)，这里的 bG 意思是，在椭圆曲线上对 G 点画切线，每画一次会相交新的点，画 b 次切线

小红和小明使用 ECDHE 密钥交换算法的过程：

1. 确定椭圆曲线和基点 G
2. 双方生成随机整数作为私钥，小红记为 d1，小明记为 d2
3. 双方算出公钥并交换，小红的公钥记作 Q1 = d1G；小明的公钥记作 Q2 = d2G
4. 最后小红计算点（x1，y1） = d1Q2，小明计算点（x2，y2） = d2Q1，椭圆曲线上是可以满足乘法交换和结合律，所以双方的 x 坐标是一样的

## ECDHE 握手过程

1. TLS 第一次握手
   - 客户端发送 `Client Hello`，里面包含生成的**随机数(Client Random)**、TLS 版本号、支持的密码套件列表
2. TLS 第二次握手
   - `Server Hello`，里面包含确认的 TSL 版本号，生成的**随机数(Server Random)**，合适的密码套件
   - `Certificate`，发送证书
   - `Server Key Exchange`，生成私钥，算出公钥。为了保证公钥不被第三方篡改，对公钥进行数字签名
3. TLS 第三次握手
   - 客服端校验数字证书
   - `Client Key Exchange`，生成私钥，算出公钥并发送
   - 双方所需要的信息已经齐全，算出 x 坐标，用 **（客户端随机数 + 服务端随机数 + x）** 算出会话密钥
   - `Change Cipher Spec`，告诉服务端后续改用对称算法加密通信
   - `Encrypted Handshake Message`，对之前的消息要给摘要，让服务端做验证
4. TLS 第四次握手

最后，服务端也会有一个同样的操作，发 `Change Cipher Spec` 和 `Encrypted Handshake Message`

## RSA 和 ECDHE 握手过程的区别：

- RSA 不支持向前保密
- ECDHE 算法不要等最后一次 TLS 握手就可以发送数据
- ECDHE 在第二次握手时，服务端会发送 `Server Key Exchange`
