# JavaScript 基础

## 数据类型

### 八种数据类型

`undefined`、`null`、`Boolean`、`Number`、`String`、`Object`、`Symbol`、`BigInt`

- 使用 `void` 对表达式求值都返回 `undefined`
- `typeof null` 结果为 object
- 在进行转换的时候我们可以看出对于引用类型的值都会转为`true`,基本类型 Number 中 0、NaN 以及''、null、undefined 会被转换为 false
- `NaN` 不等于 `NaN`，只有使用 `Object.is()` 时才相等
- Symbol 的使用

```js
const symbol = Symbol('foo') // 接受一个可选的描述符

// 共享symbol
// 首先在全局查找是否有 ssn 的 symbol，如果有就返回，没有就创建
const sharedSymbol = Symbol.for('ssn')

// 获取symbol的键
// 只能获得 Symbol.for 的 key，Symbol() 会返回 undefined，即使传入 description
Symbol.for(sharedSymbol) // ssn

// Symbol.toStringTag
let myObj = {}
Object.defineProperty(myObj, Symbol.toStringTag, { value: 'Yuhua' })
console.log(Object.prototype.toString.call(myObj)) //[object Yuhua]
```

## 检测数据类型的方法

- typeof 只能判断八种类型，在基本数据类型中去掉 `null`，多一个 `function`
- instanceOf 只能正确判断引用数据类型，而不能判断基本数据类型
- constructor

```js
console.log((2).constructor === Number) // true
console.log(true.constructor === Boolean) // true
console.log('str'.constructor === String) // true
```

- Object.prototype.toString.call()

## `Object.is() == ===` 区别

1. `==` 两边值类型不同时，先进行类型转换再比较
2. `===` 严格相等
3. `Object.is()` 与`===` 基本一样，区别在 +0 不等于 -0，NaN 等于自身

## 类数组

- 函数里面的参数对象 arguments
- 用 getElementsByTagName/ClassName/Name 获得的 HTMLCollection
- 用 querySelector 获得的 NodeList

### 类数组转为数组

1. 借助数组方法

```js
const arrayLike = {
  0: 'java',
  1: 'script',
  length: 2,
}
Array.prototype.push.call(arrayLike, 'jack', 'lily')
console.log(arrayLike)
// {0: "java", 1: "script", 2: "jack", 3: "lily", length: 4}
```

Array.prototype.slice.call(arrayLike)

2. 借用 ES6 方法

- `Array.from(arrayLike)`
- `[...arguments]`

## 取消请求

axios 也支持

```js
const controller = new AbortController()
fetch('', {
  signal: controller.signal,
})
controller.abort()
```
