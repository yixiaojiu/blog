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
