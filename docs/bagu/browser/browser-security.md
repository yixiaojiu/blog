# 浏览器安全

> 内容来自 [语雀 CUGGZ](https://www.yuque.com/cuggz/interview/browser)

## XSS 攻击

XSS 攻击指的是跨站脚本攻击，是一种代码注入攻击。攻击者通过在网站注入恶意脚本，使之在用户的浏览器上运行

1. 反射型 XSS

攻击者构造出特殊的 URL，比如在查询参数上做手脚

2. 存储型 XSS

攻击者将恶意代码提交到⽬标⽹站的数据库中

3. DOM 型 XSS

攻击者构造出特殊的 URL，因为浏览器不会将 hash 值发给服务器，所以可以在 hash 上做手脚。

DOM 型 XSS 跟前两种 XSS 的区别是，取出和执⾏恶意代码由浏览器端完成，属于前端 JavaScript ⾃身的安全漏洞，⽽其他两种 XSS 都属于服务端的安全漏洞

## 如何防御 XSS 攻击？

- 从浏览器的执行来进行预防，对需要插入到 HTML 中的代码做好充分的转义
- 使用 CSP（内容安全策略），告诉浏览器哪些外部资源可以加载和执行。设置 HTTP 首部中的 Content-Security-Policy，或者 `<meta http-equiv="Content-Security-Policy" content="default-src 'self'; img-src https://*; child-src 'none';" />`
- 对一些敏感信息进行保护，比如 cookie 使用 http-only

## CSRF 攻击

CSRF 攻击指的是跨站请求伪造攻击，攻击者诱导用户进入一个第三方网站，然后该网站向被攻击网站发送跨站请求（会带上 cookie）。

CSRF 攻击的本质是利用 cookie 会在同源请求中携带发送给服务器的特点，以此来实现用户的冒充

## 如何防御 CSRF 攻击？

- **进行同源检测：** 服务器根据 http 请求头中 origin 或者 referer 信息来判断请求是否为允许访问的站点，如果不存在这些字段，直接阻止请求。这种方式可能把搜索引擎的页面请求给屏蔽掉
- **使用 Token 进行验证：**
- **对 Cookie 进行双重验证：** 向域名中注入一个随机字符串的 Cookie，客户端发起请求时在 URL 中带上这个 Cookie，然后服务器通过对 cookie 中的数据和参数中的数据进行比较
- **在设置 cookie 属性的时候设置 Samesite：** 限制 cookie 不能作为被第三方使用。Samesite 一共有两种模式，一种是严格模式，任何情况都不可用；在宽松模式下，cookie 可以被请求是 GET 请求，且会发生页面跳转的请求所使用。

## 中间人攻击

攻击者与通讯的两端分别创建独⽴的联系

## 网络劫持

1. DNS 劫持：输⼊京东被强制跳转到淘宝这就属于 dns 劫持
2. HTTP 劫持: 访问⾕歌但是⼀直有贪玩蓝⽉的⼴告,由于 http 明⽂传输,运营商会修改你的 http 响应内容(即加⼴告)

## DDoS 攻击

防护思路：设置预值限速、封禁 IP 段、设置特殊请求头并进行校验（比如对请求头进行 hash）
