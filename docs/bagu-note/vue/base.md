# Vue 基础

## Vue 中封装的数组方法有哪些，其如何实现页面更新

push, pop, shift, unshift, splice, sort, reverse

Object.defineProperty() 不是不能监听到数组方法，而是 Vue 为了性能，没有对数组进行响应式处理。

## 观察者模式

> [kiraraty.github.io](https://kiraraty.github.io/fe-doc/#/interview/%E4%BB%A3%E7%A0%81%E9%A2%98?id=%e8%a7%82%e5%af%9f%e8%80%85%e6%a8%a1%e5%bc%8f)

在观察者模式中，只有两个主体，分别是目标对象`Subject`，观察者`Observer`

- 观察者需`Observer`要实现`update`方法
- `Subject`需要维护自身的观察者数组 `observerList`，当自身发生变化时，通过调用自身的 `notify` 方法，依次通知每一个观察者执行 `update` 方法

```js
// 观察者
class Observer {
  /**
   * 构造器
   * @param {Function} cb 回调函数，收到目标对象通知时执行
   */
  constructor(cb) {
    if (typeof cb === 'function') {
      this.cb = cb
    } else {
      throw new Error('Observer构造器必须传入函数类型！')
    }
  }
  /**
   * 被目标对象通知时执行
   */
  update() {
    this.cb()
  }
}

// 目标对象
class Subject {
  constructor() {
    // 维护观察者列表
    this.observerList = []
  }
  /**
   * 添加一个观察者
   * @param {Observer} observer Observer实例
   */
  addObserver(observer) {
    this.observerList.push(observer)
  }
  /**
   * 通知所有的观察者
   */
  notify() {
    this.observerList.forEach((observer) => {
      observer.update()
    })
  }
}

const observer = new Observer(() => {
  console.log('我被通知了')
})

const subject = new Subject()
subject.addObserver(observer)
subject.notify()
```

## 发布订阅模式

发布订阅模式中，对于发布者 Publisher 和订阅者 Subscriber 没有特殊的约束，他们好似是匿名活动，借助事件调度中心提供的接口发布和订阅事件，互不了解对方是谁。

类比于 DOM 事件中的 dispatchEvent 和 addEventListener

```js
class PubSub {
  constructor() {
    // 维护事件及订阅行为
    this.events = {}
  }
  /**
   * 注册事件订阅行为
   * @param {String} type 事件类型
   * @param {Function} cb 回调函数
   */
  subscribe(type, cb) {
    if (!this.events[type]) {
      this.events[type] = []
    }
    this.events[type].push(cb)
  }
  /**
   * 发布事件
   * @param {String} type 事件类型
   * @param  {...any} args 参数列表
   */
  publish(type, ...args) {
    if (this.events[type]) {
      this.events[type].forEach((cb) => {
        cb(...args)
      })
    }
  }
}
```

## vue 初始化页面闪动问题

使用 vue 开发时，在 vue 初始化之前，由于 div 是不归 vue 管的，所以我们写的代码在还没有解析的情况下会容易出现花屏现象，看到类似于{{message}}的字样，虽然一般情况下这个时间很短暂，但是还是有必要让解决这个问题的。

```css
[v-cloak] {
  display: none;
}
```

如果没有彻底解决问题，则在根元素加上`style="display: none;" :style="{display: 'block'}"`

## 渐进式，声明式

渐进式就是逐渐上手，随着应用规模不断扩大，我们才可能逐渐引入路由、状态管理、vue-cli 等库和工具

声明式就是不需要去关注 dom，只想关注数据，由框架处理数据到视图的渲染。而命令式，例如 jquery，每一步操作都是明确的
