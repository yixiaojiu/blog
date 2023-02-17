## vite 启动项目初体验

> 本文是学习[bilibili](https://www.bilibili.com/video/BV1GN4y1M7P5)这个视频时的笔记

在默认情况下，我们的 es module 去导入资源的时候，要么是绝对路径，要么是相对路径

浏览器不知道 node_modules, 所以不能使用包名导入

```js
import _ from 'lodash'
```

## 为什么浏览器不去搜寻 node_modules

因为，浏览器加载 js 都需要通过网络下载 js 文件。而一个库往往会依赖其他的库，这样对导致巨大的性能开销

## vite 的预加载

```js
import _ from 'lodash'
```

在处理的过程中如果看到了有非绝对路径或者相对路径的引用，它会尝试开启路径补全

```js
import __vite__cjsImport0_lodash from '/node_modules/.vite/deps/lodash.js?v=19679e9c'
```

**依赖预构建**

首先 vite 会找对对用的依赖，然后调用 esbuild(对 js 语法进行解析的库), 将其转换成 es module, 然后放到`/node_modules/.vite/deps`目录下, 同时对 es module 规范的各个模块进行统一

这解决了 3 个问题:

1. 不同的第三方包会有不同的导出方式，这是 vite 所无法约束的
2. 引入模块，对路径的处理上可以直接使用.vite/deps,方便路径重写
3. 网络多包传输的性能问题(也是原生 es module 规范不敢支持 node_modules 的原因之一)

## 配置文件处理细节

1. vite 配置文件的语法提示
   1. webstorm 自带提示
   2. vs code 的语法提示处理

```js
// 第一种方式
import { defineConfig } from 'vite'
export default defineConfig({})

// 第二种方式
/** @type import("vite").UserConfig */
const viteConfig = {}
```

2. 关于环境的处理

```js
export default defineConfig({ command } => {})
// commmand会区分生产环境和开发环境
// command 的值取决于，运行的命令是dev，还是build
```

**补充:为什么 vite.config.js 可以写成 es module 的形式**

因为 vite 在读取 vite.config.js 时会率先用 node 解析文件语法，如果是 es module 会直接替换成 commonjs 规范

## vite 环境变量配置

### 服务端

vite 使用 dotenv 库

dotenv 会自动读取.env 文件，并解析文件对应的环境变量，注入到 process.env 对象下

可以使用 loadEnv 手动加载

```js
export default defineConfig(({ command, mode }) => {})
// mode为 pnpm dev --mode development  --mode的参数
// mode默认情况下为development和production
```

### 客服端

vite 会将环境变量注入到 `import.meta.env`

只会注入以**VITE**开头的变量

更改前缀，可以使用**envPrefix**配置

## vite 中处理 css

vite 天生就支持对 css 文件的直接处理

1. vite 在读取到 main.js 中引用到了 index.css
2. 直接创建一个 style 标签，并插入到 index.html 的 head 中
3. 将 css 文件中的内容替换成 js 脚本(方便热更新或者 css 模块化), 同时设置`Content-Type`为`application/javascript`

**CSS 模块化**会对所有类名进行一定规则的替换，防止协同开发时的类名冲突

## vite 在生产环境对静态资源的处理

**为什么打包后的静态资源有 hash**

浏览器有缓存机制，静态资源只要不改名字，就直接走缓存，导致即使文件有更改，也没有请求最新的文件

## vite 插件

> vite 会在生命周期的不同阶段去调用不同的插件以达到不同的目的
> 生命周期：vite 从开始执行到执行结束，那么这整个过程就是 vite 的生命周期
>
> 当别人问道中间件、插件是干什么的?
> 中间件、插件会在生命周期的不同阶段去做不同的事情

## ts

```ts
/// <reference types="vite/client" />
```

当 vite 读取到这个文件时会导入 vite/client 类型

## vite 性能优化概述

- 开发时态的构建速度优化
- 页面性能指标：和我们怎么写代码有关

  - 首屏渲染时
    - 懒加载
    - http 优化：协商缓存 强缓存
  - 页面中最大元素的渲染时长: lcp(large content paint)

- js 逻辑

  - 清除副作用
  - requestIdleCallback requestAnimationFrame 卡浏览器帧率
  - 防抖 节流
  - 对作用域的控制

    ```js
    const arr = [1, 2, 3]
    // 每次访问arr 的length都是for循环自己的作用域
    for (let i = 0, len = arr.length; i < len; i++) {}
    ```

    ```js
    const arr = Array.from({ length: 10000 })
    console.time('test1')
    for (let i = 0; i < arr.length; i++) {}
    console.timeEnd('test1')
    console.time('test2')
    for (let i = 0, len = arr.length; i < len; i++) {}
    console.timeEnd('test2')

    // test1: 0.182ms
    // test2: 0.117ms
    ```

- css

  - 关注继承属性：能继承的，就不要重复写
  - 尽量避免太过于深的 css 嵌套

- 生产的优化
  - 优化体积：压缩，treeshaking，图片资源压缩，cdn 加载，分包

### 分包策略

业务代码变化，但是引用的库没有变，打包后的 js 文件每次都发生改变，导致性能损耗

把一些不会常规更新的文件，进行单独打包处理

```js
 build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'
          }
        }
      }
    },
  }
```

### gzip 压缩

vite 插件[vite-plugin-compression](https://www.npmjs.com/package/vite-plugin-compression)

请求时的响应头设置为`content-encoding: gzip`

### cdn 加速

将我们依赖的第三方模块全部写成 cdn 的形式，保证自己代码的小体积

vite 插件[vite-plugin-cdn-import](https://www.npmjs.com/package/vite-plugin-cdn-import)
