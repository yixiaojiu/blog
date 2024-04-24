# 原理

[图解 React](https://7km.top/)

重点：

- [主干逻辑](https://7km.top/main/workloop#%E4%B8%BB%E5%B9%B2%E9%80%BB%E8%BE%91)

## 算法

### 位运算

通过位移的方式, 定义一些枚举常量

```js
const A = 1 << 0 // 0b00000001
const B = 1 << 1 // 0b00000010
const C = 1 << 2 // 0b00000100
```

增加属性：`ABC = A | B | C`

删除属性：`AB = ABC & ~C`

判断属性：`AB & B === B`

**应用：** 优先级管理 lanes

## 包结构

- `react` 提供定义 react 组件(ReactElement)的必要函数
- `react-dom` 渲染器之一
- `react-reconciler` react 得以运行的核心包，管理应用状态的输入和结果的输出
- `scheduler` 控制由react-reconciler送入的回调函数的执行时机

![core-packages](https://7km.top/static/core-packages.c2850581.png)

## 两大循环

### 任务调度循环

是以二叉堆为数据结构, 循环执行堆的顶点, 直到堆被清空。不关心这个任务具体，具体任务其实就是执行回调函数performSyncWorkOnRoot或performConcurrentWorkOnRoot

### fiber构造循环

是以树为数据结构, 从上至下执行深度优先遍历

fiber构造循环是任务调度循环中的任务(task)的一部分. 它们是从属关系, 每个任务都会重新构造一个fiber树.

### 主逻辑

1. 输入: 将每一次更新(如: 新增, 删除, 修改节点之后)视为一次更新需求(目的是要更新DOM节点).
2. 注册调度任务: react-reconciler收到更新需求之后, 并不会立即构造fiber树, 而是去调度中心scheduler注册一个新任务task, 即把更新需求转换成一个task.
3. 执行调度任务(输出): 调度中心scheduler通过任务调度循环来执行task(task的执行过程又回到了react-reconciler包中).

   - fiber构造循环是task的实现环节之一, 循环完成之后会构造出最新的 fiber 树.
   - commitRoot是task的实现环节之二, 把最新的 fiber 树最终渲染到页面上, task完成.

## 优先级管理

可中断渲染, 时间切片(time slicing), 异步渲染(suspense)等特性, 在源码中得以实现都依赖于优先级管理。

fiber优先级(LanePriority)，调度优先级(SchedulerPriority)，优先级等级(ReactPriorityLevel)：负责上述 2 套优先级体系的转换。

## 调度原理

**时间切片(time slicing):** 执行时间分割, 让出主线程(把控制权归还浏览器, 浏览器可以处理用户输入, UI 绘制等紧急任务).

taskQueue是一个小顶堆数组，消费任务队列的过程中, 可以消费1~n个 task, 甚至清空整个 queue. 但是在每一次具体执行task.callback之前都要进行超时检测, 如果超时可以立即退出循环并等待下一次调用。

**可中断渲染：** task.callback执行过程中自己检测是否超时, 所以在 fiber 树构造过程中, 每构造完成一个单元, 都会检测一次超时，如遇超时就退出fiber树构造循环, 并返回一个新的回调函数(就是此处的continuationCallback)并等待下一次回调继续未完成的fiber树构造。

## fiber树构造

双缓冲技术

![double buffering](https://7km.top/static/fibertreecreate1-progress.ec005c03.png)

## React diff

[图解 React 的 diff 算法：核心就两个字 —— 复用](https://juejin.cn/post/7131741751152214030)

浏览器下使用 react-dom 的渲染器，会先把 vdom 转成 fiber，找到需要更新 dom 的部分，打上增删改的 effectTag 标记，这个过程叫做 reconcile，可以打断，由 scheducler 调度执行。reconcile 结束之后一次性根据 effectTag 更新 dom，叫做 commit。

diff 发生在 vdom 与 老 fiber 之间

react 的 diff 算法分为两个阶段：

1. 对比，如果可以复用就下一个，不可以复用就结束
2. 把剩下的老 fiber 放到 map 里，遍历剩余的 vdom，一一查找 map 中是否有可复用的节点。

最后把剩下的老 fiber 删掉，剩下的新 vdom 新增

## Hook

![hook](https://7km.top/static/hook-linkedlist.d52c2c25.png)

无论状态Hook或副作用Hook都按照调用顺序存储在fiber.memoizedState链表中

![hook](https://7km.top/static/mount-after-renderwithhooks.fb7b72a5.png)

![hook](https://7km.top/static/update-after-renderwithhooks.e3518dec.png)

在 fiber 树渲染阶段，处理 effect 回调

## 合成事件

1. 监听原生事件: 对齐DOM元素和fiber元素
2. 收集listeners: 遍历fiber树, 收集所有监听本事件的listener函数.
3. 派发合成事件: 构造合成事件, 遍历listeners进行派发.

![dispatchEvent](https://7km.top/static/dispatch-event.46e8e5ef.png)
