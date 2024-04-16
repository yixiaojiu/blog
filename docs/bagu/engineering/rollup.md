# Rollup

## 打包原理

> [从 rollup 初版源码学习打包原理](https://github.com/woai3c/Front-end-articles/issues/5)

每个文件都是一个模块

1. 为每个文件实例化 `Module`
2. 分析导入和导出的模块，将引入的模块和导出的模块填入对应的对象。

```js
imports = {
  foo1: { source: './foo', name: 'foo1', localName: 'foo1' },
}
exports = {}
```

3. 分析每个 AST 节点间的作用域，找出每个 AST 节点定义的变量。
4. 分析标识符，如果标识符在当前模块的作用域中都未找到，说明依赖其他模块，将它添加到 Module 的 `_dependsOn` 对象
5. 根据依赖项，读取对应的文件。
