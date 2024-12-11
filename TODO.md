- 把 b 站的回到顶部按钮偷过来 https://space.bilibili.com/412686493/dynamic
- 在每个 blog 顶部添加随机图片
- [参考这个](https://github.com/kuizuo/blog/blob/main/src/pages/friends/index.tsx) 实现友链

## 文档加密插件

思路：

- 提供 CLI 工具用于加密与解密文档，在 commit 之前对文档进行加密，需要修改与打包时进行解密
- 使用对称加密算法进行加解密，密钥放到环境变量中
- 提供组件包裹文档，在页面中输入密码才能访问文档，对密钥进行 hash 处理，在密码比对时与 hash 值进行比较
- 尝试提供工具，自动使用组件包裹文档
- 提供配置项，配置需要加密的文档路径或目录

## 重写 UI

参考

- [https://blog.tangbao.ltd](https://blog.tangbao.ltd) 抄一下底部波浪
- [https://www.liveout.cn](https://www.liveout.cn)
- [https://lin66.site](https://lin66.site) 抄一下首页

colors [https://materialui.co/colors](https://materialui.co/colors)
