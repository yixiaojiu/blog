# JavaScript 进阶

> 参考[前端学习文档](https://kiraraty.github.io/fe-doc/#/interview/javascript%E8%BF%9B%E9%98%B6)

## let const var

|                    | var | let | const |
| ------------------ | :-: | :-: | :---: |
| 是否有块级作用域   |  ×  |  ✔  |   ✔   |
| 是否存在变量提升   |  ✔  |  ×  |   ×   |
| 是否添加全局属性   |  ✔  |  ×  |   ×   |
| 能否重复声明变量   |  ✔  |  ×  |   ×   |
| 是否存在暂时性死区 |  ×  |  ✔  |   ✔   |
| 是否必须设置初始值 |  ×  |  ×  |   ✔   |
| 能否改变指针指向   |  ✔  |  ✔  |   ×   |

## 作用域和作用域链

### 作用域

作用域是在程序运行时代码中的某些特定部分中变量、函数和对象的可访问性

### 作用域分类

作用域又分为`全局作用域`和`局部作用域`。在 ES6 之前，局部作用域只包含了`函数作用域`，ES6 的到来为我们提供了 `块级作用域`（由一对花括号包裹），可以通过新增命令 let 和 const 来实现

### 作用域链

概念： 多个作用域对象连续引用形成的链式结构

函数的作用域是在函数定义的时候就被决定了，与函数在哪里被调用无关

## 原型和原型链

在 JavaScript 中是使用构造函数来新建一个对象的，每一个构造函数的内部都有一个 prototype 属性，它的属性值是一个对象，这个对象包含了可以由该构造函数的所有实例共享的属性和方法。

```js
Person.prototype = {
  getName: function () {},
}
var p = new Person('hello')
p.constructor = Person
console.log(p.__proto__ === Person.prototype) // true
console.log(p.__proto__ === p.constructor.prototype) // true

p.__proto__ // Person.prototype
Person.prototype.__proto__ // Object.prototype
p.__proto__.__proto__ //Object.prototype
p.__proto__.constructor.prototype.__proto__ // Object.prototype
Person.prototype.constructor.prototype.__proto__ // Object.prototype
p1.__proto__.constructor // Person
Person.prototype.constructor // Person
```

## Generator 函数

Generator 函数可以返回（yield）多个值，在调用函数时，不会运行其代码，返回一个被称为 “generator object” 的特殊对象，可以与 `iterable` 结合使用

```js
function* generateSequence() {
  yield 1
  yield 2
  return 3
}
const res = generateSequence()
console.log(res.next()) // { value: 1, done: false }
console.log(res.next()) // { value: 2, done: false }
console.log(res.next()) // { value: 3, done: true }
```

### “yield” 是一条双向路

它不仅可以向外返回结果，而且还可以将外部的值传递到 generator 内。

```js
function* gen() {
  const result = yield '2 + 2 = ?'
  console.log(result)
}
const res = gen()
console.log(res.next()) // { value: '2 + 2 = ?', done: false }
res.next(4) // 4
```

`generator.throw` yield 可以接受值，那么它也可以抛出一个错误

`generator.return(value)` 完成 generator 的执行并返回给定的 value
