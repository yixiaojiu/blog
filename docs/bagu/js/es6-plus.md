# ES6+ 新特性

> 整理 [掘金 ES6、ES7、ES8、ES9、ES10 新特性一览](https://juejin.cn/post/6844903811622912014)

## ES6

- 块级作用域，Let 与 Const
- 类
- 模块化
- 箭头函数
- 模板字符串
- 函数参数默认值
- 剩余参数和延展操作符（只用于数组）
- 解构赋值
- 对象属性简写
- Promise
- 迭代器和生成器
- Proxy 和 Reflect
- Symbol 和 Symbol.iterator
- 数组的新方法，如 Array.from()、Array.of()、Array.prototype.find() 和 Array.prototype.findIndex() 等。

## ES7

- 数组 includes()方法
- a \*\* b 指数运算符

## ES8

- async/await
- Object.values() 返回的是 Object 自身属性的所有值，不包括继承的值。
- Object.entries()
- String padding: padStart()和 padEnd()，填充字符串达到当前长度
- 函数参数列表结尾允许逗号
- Object.getOwnPropertyDescriptors()
- ShareArrayBuffer 和 Atomics 对象，用于从共享内存位置读取和写入

## ES9

- 异步迭代

```js
async function process(array) {
  for await (let i of array) {
    doSomething(i)
  }
}
```

- Promise.finally()
- Rest/Spread 可用于对象
- 正则表达式命名捕获组（Regular Expression Named Capture Groups）
- 正则表达式反向断言（lookbehind）
- 正则表达式 dotAll 模式
- 正则表达式 Unicode 转义
- 非转义序列的模板字符串

## ES10

- 行分隔符（U + 2028）和段分隔符（U + 2029）符号现在允许在字符串文字中，与 JSON 匹配
- 更加友好的 JSON.stringify
- 新增了 Array 的 `flat()` 方法和 `flatMap()` 方法
- 新增了 String 的 `trimStart()` 方法和 `trimEnd()` 方法
- Object.fromEntries()
- Symbol.prototype.description
- String.prototype.matchAll
- Function.prototype.toString()现在返回精确字符，包括空格和注释
- 简化 try {} catch {},修改 catch 绑定
- 新的基本数据类型 `BigInt`
- globalThis
- import()
- Legacy RegEx
- 私有的实例方法和访问器
