# 手写

> 参考[前端学习文档](https://kiraraty.github.io/fe-doc/#/interview/%E4%BB%A3%E7%A0%81%E9%A2%98)

## 数组去重

```ts
const deleteRepeat = (array: number[]) => Array.from(new Set(array))

const deleteRepeat = (array: number[]) => array.filter((item, index) => array.indexOf(item) === index)

const deleteRepeat = (array: number[]) => {
  const res: number[] = []
  for (let i = 0; i < array.length; i++) {
    // 或者indexOf
    if (!res.includes(array[i])) {
      res.push(array[i])
    }
  }
  return res
}
```

## 数组扁平化

```js
const flat = (array) => array.toString().split(',')

const flat = (array) => array.join().split(',')

const flat = (array, depth = 1) => {
  const res = []
  for (const item of array) {
    if (Array.isArray(item) && depth > 0) {
      res.push(...flat(item, depth - 1))
    } else {
      res.push(item)
    }
  }
  return res
}
```

## myInstanceof

```js
function myInstanceOf(left, right) {
  let proto = Object.getPrototypeOf(left)
  const prototype = right.prototype
  while (proto) {
    if (proto === prototype) {
      return true
    } else {
      proto = Object.getPrototypeOf(proto)
    }
  }
  return false
}
```

## 浅拷贝与深拷贝

### 浅拷贝

浅拷贝是指，一个新的对象对原始对象的属性值进行精确地拷贝，如果拷贝的是基本数据类型，拷贝的就是基本数据类型的值，如果是引用数据类型，拷贝的就是内存地址。如果其中一个对象的引用内存地址发生改变，另一个对象也会发生变化。

- Object.asssign()，语法：`Object.assign(target, source1, ···)`

- 扩展运算符，语法：`let cloneObj = {...obj };`

- Array.prototype.slice()

- Array.prototype.concat()

- 手写浅拷贝

```js
function shallowCopy(object) {
  if (!object || typeof object !== 'object') return
  const newObject = Array.isArray(object) ? [] : {}
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      newObject[key] = object[key]
    }
  }
  return newObject
}
```

### 深拷贝

- JSON.stringify()，拷贝的对象中如果有函数，undefined， symbol，当使用过 JSON.stringify() 进行处理之后，都会消失

- 手写深拷贝

```js
function deepClone(obj, hash = new WeakMap()) {
  if (obj === null) return obj // 如果是null或者undefined我就不进行拷贝操作
  if (obj instanceof Date) return new Date(obj)
  if (obj instanceof RegExp) return new RegExp(obj)
  // 可能是对象或者普通的值  如果是函数的话是不需要深拷贝
  if (typeof obj !== 'object') return obj
  // 是对象的话就要进行深拷贝
  if (hash.get(obj)) return hash.get(obj)
  let cloneObj = new obj.constructor()
  // 找到的是所属类原型上的constructor,而原型上的 constructor指向的是当前类本身
  hash.set(obj, cloneObj)
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      // 实现一个递归拷贝
      cloneObj[key] = deepClone(obj[key], hash)
    }
  }
  return cloneObj
}
```

## 使用 promise 实现 ajax

```js
function request(option) {
  const { url, method, data } = option
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open(method.toUpperCase(), url, true)
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 4) return
      const res = {
        code: xhr.status,
        body: xhr.response,
      }
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(res)
      } else {
        reject(res)
      }
    }
    xhr.onerror = () => {
      reject(new Error(xhr.statusText))
    }
    xhr.responseType = 'json'
    xhr.setRequestHeader('Accept', 'application/json')
    xhr.send(JSON.stringify(data))
  })
}
```

## 手写 apply call bind

### apply

```js
Function.prototype.myApply = function (context, args) {
  if (args && !(args instanceof Array)) {
    throw new TypeError('args is not an array')
  }
  context = context || window
  const func = Symbol('func')
  context[func] = this
  let res = undefined
  if (args) {
    res = context[func](...args)
  } else {
    res = context[func]()
  }
  delete context[func]
  return res
}
```

### call

```js
Function.prototype.myCall = function (context, ...args) {
  context = context || window
  const func = Symbol('func')
  context[func] = this
  const res = context[func](...args)
  delete context[func]
  return res
}
```

### bind

```js
Function.prototype.Mybind = function (context, ...args) {
  context = context || window
  const func = this
  return function (...fnArgs) {
    let res = undefined
    if (this instanceof func) {
      res = new func(args, fnArgs)
    } else {
      res = func.call(context, ...args, ...fnArgs)
    }
    return res
  }
}
```

## 洗牌算法

```js
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}
```

## 函数柯里化

### 固定参数

```js
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args)
    } else {
      return function (...args2) {
        return curried.apply(this, args.concat(args2))
      }
    }
  }
}
```

### 不固定参数

```js
function currying(fnc) {
  // 存储参数
  let args = []
  return function temp(...newArgs) {
    if (newArgs.length) {
      args.push(...newArgs)
      return temp
    } else {
      // 当最后一次调用，没有参数时，执行函数
      const res = fnc.apply(this, args)
      args = []
      return res
    }
  }
}
```

## new

```js
function myNew(fn, ...args) {
  const obj = Object.create(fn.prototype)
  const result = fn.apply(obj, args)
  return result instanceof Object ? result : obj
}
```

## Object.create()

```js
function create(target) {
  function Fn() {}
  Fn.prototype = target
  return new Fn()
}
```

## compose

```js
function compose(...funcs) {
  if (funcs.length === 1) {
    return funcs[0]
  }

  return funcs.reduce(
    (a, b) =>
      (...args) =>
        a(b(...args))
  )
}
```
