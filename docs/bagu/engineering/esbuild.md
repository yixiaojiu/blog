# Esbuild

Esbuild 提供了两个 API，分别是 `transform` 和 `build`。

- `transform` 操作单个字符串，而不访问文件系统
- `build` 操作文件系统中的一个或多个文件。 它允许文件互相引用并且打包在一起

Esbuild 原生支持编译 `ts`, `css`, `jsx` 等，而且压缩性能优秀，适合做 Bundler 和 Minimizer。
