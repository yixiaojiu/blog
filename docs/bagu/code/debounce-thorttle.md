# 防抖 节流

> 参考[山月](https://q.shanyue.tech/fe/code/3.html)

## 防抖

防止抖动，单位时间内事件触发会被重置，避免事件被误触发多次。

代码实现重在清零

**使用场景**

- 登录、发短信等按钮避免用户点击太快，以致于发送了多次请求，需要防抖
- 调整浏览器窗口大小时，resize 次数过于频繁，造成计算过多，此时需要一次到位，就用到了防抖
- 文本编辑器实时保存，当无任何更改操作一秒后进行保存

**简单实现**

```js
function debounce(fn, wait) {
  let timer
  return function () {
    let _this = this
    let args = arguments
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(function () {
      fn.apply(_this, args)
    }, wait)
  }
}
```

## 节流

**简单实现**
控制事件发生的频率，单位时间内事件只能触发一次，如控制为 1s 发生一次

代码实现重在开锁关锁

**使用场景**

- scroll 事件，每隔一秒计算一次位置信息等
- 浏览器播放事件，每个一秒计算一次进度信息等
- input 框实时搜索并发送请求展示下拉列表，每隔一秒发送一次请求 (也可做防抖)

```js
// 方式1: 使用定时器
function thorttle1(fn, wait) {
  let timer
  return function () {
    let _this = this
    let args = arguments

    if (!timer) {
      timer = setTimeout(function () {
        timer = null
        fn.apply(_this, args)
      }, wait)
    }
  }
}
// 方式2: 使用时间戳
function throttle2(fn, wait) {
  let time = 0
  return function () {
    let _this = this
    let args = arguments
    let now = Date.now()
    if (now - time > wait) {
      fn.apply(_this, args)
      time = now
    }
  }
}
```

## 不完善 ts 版

```ts
type Fn = (...args: any) => any
function debounce<T extends Fn>(fn: T, wait?: number) {
  let timer: NodeJS.Timeout
  return function (this: any, ...args: Parameters<T>) {
    const _this = this
    if (timer) clearTimeout(timer)

    timer = setTimeout(() => {
      fn.apply(_this, args)
    }, wait)
  }
}
function thorttle<T extends Fn>(fn: T, wait?: number) {
  let timer: NodeJS.Timeout | null
  return function (this: any, ...args: Parameters<T>) {
    const _this = this
    if (!timer) {
      timer = setTimeout(() => {
        timer = null
        fn.apply(_this, args)
      }, wait)
    }
  }
}
```
