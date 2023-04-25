# Webpack

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
