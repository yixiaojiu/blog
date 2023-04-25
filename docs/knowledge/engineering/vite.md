# Vite

## 依赖预构建

使用 Esbuild 进行预构建，主要做了两件事情：

1. 将其他格式(如 UMD 和 CommonJS)的产物转换为 ESM 格式，使其在浏览器通过 `<script type="module"><script>`的方式正常加载。
2. 打包第三方库的代码，将各个第三方库分散的文件合并到一起，减少 HTTP 请求数量，避免页面加载性能劣化。

Vite Dev Server 为构建的文件设置强缓存和本地文件系统的缓存，所有的预构建产物默认缓存在`node_modules/.vite`目录中。如果以下 3 个地方都没有改动，Vite 将一直使用缓存文件:

1. package.json 的 `dependencies` 字段
2. lock 文件
3. `optimizeDeps` 配置内容

在动态 import 的情况下，这些依赖只能在运行时被识别出来，可以使用 `optimizeDeps.include` 强制预构建

## Esbuild 的作用

- 依赖预构建——作为 Bundle 工具
- 单文件编译——作为 TS 和 JSX 编译工具
- 代码压缩——作为压缩工具

## HMR

> [掘金 一起学 Vite ｜ HMR，你好[下]](https://juejin.cn/post/7196842170640433209)

1. 监听文件变化，创建一个 websocket 服务，将变化通知到客服端
2. 在 index.html 中注入一段拉取客户端代码的脚本

```html
<head>
  <script type="module" src="/@vite/client"></script>
</head>
```

3. 根据服务器派发的 update 信息找到对应的边界模块的热更新回调并执行以完成最终的更新

Vite 在 `import.meta.hot` 定义了一套完整的属性和方法

## 构建名词

- `bundle` 指的是整体的打包产物，包含 JS 和各种静态资源
- `chunk` 指的是打包后的 JS 文件，是 bundle 的子集
- `vendor` 是指第三方包的打包产物，是一种特殊的 chunk

## 代码拆分

利用 Rollup 的 manualChunks，让我们能自定义拆包策略

```ts
export default {
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          lodash: ['lodash-es'],
        },
      },
    },
  },
}
```

使用插件进行 vite-plugin-chunk-split 进行分包

## 浏览器兼容

1. **语法降级问题：** 如 Babel、SWC
2. **Polyfill：** 如 corejs

插件 `@vitejs/plugin-legacy`，会分别打包出 Modern 模式和 Legacy 模式的产物

Modern 产物被放到 type="module"的 script 标签中，而 Legacy 产物则被放到带有 nomodule 的 script 标签中

现代浏览器加载 Modern 产物，低版本浏览器加载 Legacy 产物

## SSR

服务端生成好完整的 HTML 内容，浏览器能够渲染出完整的首屏内容

SSR 中只能生成页面的内容和结构，并不能完成事件绑定，因此需要在浏览器中执行 JS 脚本，完成事件绑定，让页面拥有交互的能力，这个过程被称作 hydrate（翻译为注水或者激活）

## Module Federation

1. **实现任意粒度的模块共享：** 包括第三方 npm 依赖、业务组件、工具函数，甚至可以是整个前端应用
2. **优化构建产物体积：** 远程模块可以从本地模块运行时被拉取，而不用参与本地模块的构建，可以加速构建过程，同时也能减小构建产物
3. **运行时按需加载：** 远程模块导入的粒度可以很小，这样就很好地实现了模块按需加载
4. **第三方依赖共享：** 通过模块联邦中的共享依赖机制，我们可以很方便地实现在模块间公用依赖代码

### 实现模块联邦有三大主要的要素

1. Host 模块：即本地模块，用来消费远程模块
2. Remote 模块: 即远程模块，用来生产一些模块，并暴露运行时容器供本地模块消费
3. Shared 依赖: 即共享依赖，用来在本地模块和远程模块中实现第三方依赖的共享

## import map

浏览器可以使用包含`type=module`属性的 script 的标签加载 ES 模块，但仅支持相对路径和绝对路径，不支持 bare import

- 绝对路径：如 https://cdn.skypack.dev/react
- 相对路径：如./module-a
- bare import：即直接写一个第三方包名，如 react、lodash

import map 就是为了解决不支持 bare import 的问题

```html
<script type="importmap">
  {
    "imports": {
      "react": "https://cdn.skypack.dev/react"
    }
  }
</script>

<script type="module">
  import React from 'react'
  console.log(React)
</script>
```

可以使用 [ES Module Shims](https://github.com/guybedford/es-module-shims) 解决兼容性问题

## NodeJS 包导出

在 `package.json` 中有 main 和 exports，exports 的优先级比 main 更高

```json
{
  "main": "./dist/index.js",
  "exports": {
    // 默认导出，使用方式: import a from 'package-a'
    ".": "./dist/index.js",
    // 子路径导出，使用方式: import d from 'package-a/dist'
    "./dist": "./dist/index.js",
    "./dist/*": "./dist/*", // 这里可以使用 `*` 导出目录下所有的文件
    // 条件导出，区分 ESM 和 CommonJS 引入的情况
    "./main": {
      "import": "./main.js",
      "require": "./main.cjs"
    }
  }
}
```
