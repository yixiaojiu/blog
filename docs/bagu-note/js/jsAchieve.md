# 手写

> 参考[前端学习文档](https://kiraraty.github.io/fe-doc/#/interview/%E4%BB%A3%E7%A0%81%E9%A2%98)

## 数组去重

```ts
const deleteRepeat = (array: number[]) => Array.from(new Set(array))

const deleteRepeat = (array: number[]) =>
  array.filter((item, index) => array.indexOf(item) === index)

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

## 排序

### 冒泡排序

比较相邻的两个元素，较大的元素放到后面，每遍历一遍，将当前最大数放到最后

```js
const bubbleSort = (array) => {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        ;[array[j], array[j + 1]] = [array[j + 1], array[j]]
      }
    }
  }
  return array
}
```

### 选择排序

每遍历一次找到最小元素的下标，与起始位置交换

```js
const selectionSort = (array) => {
  let minIndex = 0
  for (let i = 0; i < array.length - 1; i++) {
    minIndex = i
    for (let j = i + 1; j < array.length; j++) {
      if (array[j] < array[minIndex]) {
        minIndex = j
      }
    }
    if (minIndex !== i) {
      ;[array[i], array[minIndex]] = [array[minIndex], array[i]]
    }
  }
  return array
}
```

### 快速排序

> 参考 [排序算法:快速排序的理解与实现](https://juejin.cn/post/6844904122274185224)

选取基准值，比基准值小的放到左边数组，比基准值大的放到右边数组，在分别对左右数组进行递归排序

```js
const quickSort = (array) => {
  if (array.length < 2) return array
  const left = []
  const right = []
  const pivot = Math.floor(Math.random() * array.length)
  for (let i = 0; i < array.length; i++) {
    if (pivot !== i && array[i] >= array[pivot]) {
      right.push(array[i])
    }
    if (pivot !== i && array[i] < array[pivot]) {
      left.push(array[i])
    }
  }
  return [...quickSort(left), array[pivot], ...quickSort(right)]
}
```

原地快排

> 参考 [掘金](https://juejin.cn/post/7203714680316592188)

```js
const quickSort = (array) => {
  const sort = (left, right) => {
    if (left >= right) return

    const pivot = array[left]
    let i = left
    let j = right
    while (i < j) {
      while (i < j && array[j] >= pivot) j--
      if (i < j) {
        array[i] = array[j]
        i++
      }
      while (i < j && array[i] <= pivot) i++
      if (i < j) {
        array[j] = array[i]
        j--
      }
    }
    array[i] = pivot
    sort(left, i - 1)
    sort(i + 1, right)
  }
  sort(0, array.length - 1)
  return array
}
```

## myInstanceof

```js
function myInstanceof(left, right) {
  let proto = Object.getPrototypeOf(left)
  const prototype = right.prototype
  while (true) {
    if (!proto) return false
    if (proto === prototype) return true
    proto = Object.getPrototypeOf(proto)
  }
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
function deepClone(target) {
  if (target === null || typeof target !== 'object') return target
  if (target instanceof Date) return new Date(target)
  if (target instanceof RegExp) return new RegExp(target)
  const cloneTarget = Array.isArray(target) ? [] : {}
  for (const key in target) {
    if (target.hasOwnProperty(key)) {
      cloneTarget[key] = deepClone(target[key])
    }
  }
  return cloneTarget
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
    throw new TypeError('args is not a array')
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
function curry(func) {
  const length = func.length // 函数参数
  return function temp(...args) {
    if (args.length >= length) {
      return func(...args)
    } else {
      return function () {
        return temp(...args, ...arguments)
      }
    }
  }
}
```

### 不固定参数

```js

```
