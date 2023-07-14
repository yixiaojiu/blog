# Webpack

[Webpack](https://kiraraty.github.io/fe-doc/#/interview/webpack)

## Webpack 一些核心概念

- Entry：入口，指示 Webpack 应该使用哪个模块，来作为构建其内部 依赖图(dependency graph) 的开始。
- Output：输出结果，告诉 Webpack 在哪里输出它所创建的 bundle，以及如何命名这些文件。
- Module：模块，在 Webpack 里一切皆模块，一个模块对应着一个文件。Webpack 会从配置的 Entry 开始递归找出所有依赖的模块。
- Chunk：代码块，一个 Chunk 由多个模块组合而成，用于代码合并与分割。
- Loader：模块代码转换器，让 webpack 能够去处理除了 JS、JSON 之外的其他类型的文件，并将它们转换为有效 模块，以供应用程序使用，以及被添加到依赖图中。
- Plugin：扩展插件。在 webpack 运行的生命周期中会广播出许多事件，plugin 可以监听这些事件，在合适的时机通过 webpack 提供的 api 改变输出结果。常见的有：打包优化，资源管理，注入环境变量。
- Mode：模式，告知 webpack 使用相应模式的内置优化
- Browser Compatibility：浏览器兼容性，Webpack 支持所有符合 ES5 标准 的浏览器（IE8 以上版本）

## loader

loader 的执行顺序是从右向左执行的。因为 webpack 选择了 compose 这样的函数式编程方式

- `css-loader`：将 CSS 等价翻译为形如 `module.exports = "${css}"` 的 JavaScript 代码
- `style-loader`：该 Loader 将在产物中注入一系列 runtime 代码，这些代码会将 CSS 内容注入到页面的 `<style>` 标签，使得样式生效
- `mini-css-extract-plugin`：该插件会将 CSS 代码抽离到单独的 `.css` 文件，并将文件通过 `<link>` 标签方式插入到页面中

## bundle，chunk，module

- bundle：是由 webpack 打包出来的⽂件；
- chunk：代码块，⼀个 chunk 由多个模块组合⽽成，⽤于代码的合并和分割；
- module：是开发中的单个模块，在 webpack 的世界，⼀切皆模块，⼀个模块对应⼀个⽂件，webpack 会从配置的 entry 中递归开始找出所有依赖的模块。

## 并行构建

- HappyPack 已经不再维护
- Thread-loader 由 Webpack 官方提供，目前还处于持续迭代维护状态
