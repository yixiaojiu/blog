# 事件循环

> 参考
>
> - [带你深入理解 js 事件循环机制](https://juejin.cn/post/7150103625270820901)
> - [面试题：说说事件循环机制(满分答案来了)](https://juejin.cn/post/6844904079353708557)
> - [Node.js 标准课程：3.事件循环](https://www.bilibili.com/video/BV13A4y1Q7N5)
> - [前端程序员｜一次性说清楚「事件循环」是什么？你知道面试官会怎么提问吗？](https://www.bilibili.com/video/BV1864y117PQ)

---

## 浏览器事件循环

|                      | **宏任务（macrotask）**                                                        | **微任务（microtask）**                |
| :------------------- | ------------------------------------------------------------------------------ | -------------------------------------- |
| 具体事件             | script(整体代码) setTimeout setInterval setImmediate(支持非常差) I/O UI render | Promise MutationObserve queueMicrotask |
| 谁先运行             | 后运行                                                                         | 先运行                                 |
| 会触发新一轮 Tick 吗 | 会                                                                             | 不会                                   |

### 执行过程

1. 先执行所有同步任务，碰到异步任务放到任务队列中
2. 同步任务执行完毕，开始执行当前所有的异步任务
3. 先执行任务队列里面所有的微任务
4. 然后执行一个宏任务
5. 然后再执行所有的微任务
6. 再执行一个宏任务，再执行所有的微任务·······依次类推到执行结束。

3-6 的这个循环称为事件循环(Event Loop)

### async/await

使用 await 时，会从右往左执行，当遇到 await 时，会阻塞函数内部处于它后面的代码，去执行该函数外部的同步代码，当外部同步代码执行完毕，再回到该函数内部执行剩余的代码, 并且当 await 执行完毕之后，会先处理微任务队列的代码

**示例**

```js
async1()
async function async1() {
  console.log('async1 start')
  await async2()
  console.log('async1 end')
}
async function async2() {
  console.log('async2 end')
}

Promise.resolve().then(() => {
  console.log('promise')
})
console.log('script end')

// output
// async1 start -> async2 end -> script end -> async1 end -> promise
```

在 async2 中增加点代码

<!-- prettier-ignore-start -->
```js
async1()
async function async1() {
  console.log('async1 start')
  await async2()
  console.log('async1 end')
}
async function async2() {
  console.log('async2 end')
  return Promise.resolve().then(() => { // [!code ++]
    console.log('async2 promise end') // [!code ++]
  }) // [!code ++]
}

Promise.resolve().then(() => {
  console.log('promise')
})
console.log('script end')

// output
// async1 start -> async2 end -> script end -> async2 promise end -> promise -> async1 end
```
<!-- prettier-ignore-end -->

### 记背

```js
Promise.resolve()
  .then(() => {
    console.log(1)
    // 导致延迟2个then
    return Promise.resolve() // [!code warning]
  })
  .then(() => {
    console.log(3)
  })

Promise.resolve()
  .then(() => {
    console.log(2)
  })
  .then(() => {
    console.log(4)
  })
  .then(() => {
    console.log(6)
  })
  .then(() => {
    console.log(8)
  })

// output
// 1 -> 2 -> 4 -> 6 -> 3 -> 8
```

```js
Promise.resolve()
  .then(() => {
    console.log(1)
    Promise.resolve().then(() => {
      console.log(2)
    })
  })
  .then(() => {
    console.log(3)
  })

// output
// 1 -> 2 -> 3
// 个人理解: 第二个then的回调函数必须在第一个then执行完后才入队列，所以log(2)的回调函数先于第二个then进入队列
```

### w3c

随着浏览器的复杂度急剧提升 W3C 不再使用宏队列的说法

在目前 chrome 的实现中 至少包含了下面的队列：

- 延时队列 : 用于存放计时器到达后的回调任务 , 优先级中
- 交互列队 : 用于存放用户操作后产生的事件处理任务 , 优先级高
- 微队列 : 用户存放需要最快执行的任务 优先级最高

## node 中的事件循环

### node 运行过程

函数调用栈 -> 异步模块 -> 事件循环

当 Node.js 启动后，它会初始化事件循环

### 异步模块

nextTick 和 Promise

next Tick 先与 Promise 执行

### 事件循环

node 的事件循环有 6 个阶段，日常开发中只需要关注 poll、check、timers 这 3 个阶段

每个阶段都有一个 FIFO 队列来执行回调。虽然每个阶段都是特殊的，但通常情况下，当事件循环进入给定的阶段时，它将执行特定于该阶段的任何操作，然后执行该阶段队列中的回调，直到队列用尽或已经执行到最大的回调数。当该队列已用尽或达到回调限制，事件循环将移动到下一阶段，以此类推。

**timers**

timers 阶段会执行 setTimeout 和 setInterval 回调，并且是由 poll 阶段控制的。 在 Node 中定时器指定的时间也不是准确时间(浏览器也是)，只能是尽快执行

**check**
直接执行 setImmdiate 的回调

**poll**

检索新的 I/O 事件，执行与 I/O 相关的回调，正常情况下,node 将在此阻塞

执行流程:

1. 如果当前已经存在定时器，而且有定时器到时间了，拿出来执行，eventLoop 将回到 timers 阶段。
2. 如果 poll 队列为空时，会有两件事发生
   1. 如果有 setImmediate 回调需要执行，poll 阶段会停止并且进入到 check 阶段执行回调
   2. 如果没有 setImmediate 回调需要执行，会等待回调被加入到队列中并立即执行回调，这里同样会有个超时时间设置防止一直等待下去,一段时间后自动进入 check 阶段。

### 记背

1. 一般情况下`setTimeout` 与 `setImmediate`执行顺序不确定

示例

```js
setTimeout(() => {
  console.log('timeOut')
}, 0)

setImmediate(() => {
  console.log('Immediate')
})
```

**原因**
`setTimeout`的 ms 参数最小为 1，受到系统调用的影响，可能在 1ms 内事件循环就已经开启,此时`setTimeout`的回调还没有进入`Timer`队列

**解决办法**

加一个`nextTick`或者`Promise`

<!-- prettier-ignore-start -->
```js
setTimeout(() => {
  console.log('timeOut')
}, 0)

setImmediate(() => {
  console.log('Immediate')
})
process.nextTick(() => { // [!code ++]
  console.log('nextTick') // [!code ++]
}) // [!code ++]

// output
// nextTick -> timeOut -> Immediate
```
<!-- prettier-ignore-end -->
