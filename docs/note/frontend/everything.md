# 杂货

## Data URL

[MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/Data_URLs)

## Delete `␍`eslint(prettier/prettier)

> 参考[掘金](https://juejin.cn/post/6844904069304156168)

文件换行符问题

## CSS

### CSS Module

[< Less >css modules中的使用](https://juejin.cn/post/7089664776682340382)

在 css module 下修改组件库的底层样式，需要用 `:global` 包裹

### scrollbar-width

[MDN scrollbar-width](https://developer.mozilla.org/zh-CN/docs/Web/CSS/scrollbar-width)

scrollbar-width 控制滚动条的宽度，或直接不显示滚动条

## 小知识

### View Transition API

在一个步骤中更改 DOM，同时创建两种状态之间的动画转换。

[chrome for developers](https://developer.chrome.com/docs/web-platform/view-transitions)

### Chrome Devtool 请求排序

在 Name 标签上右键点击，选择最下面的 `Waterfall`，选择 `Start time`

![chrome devtool request sort](images/chrome-devtool-sort.png)

## Node 包管理工具（pnpm, yarn）的版本管理

[corepack](https://nodejs.org/api/corepack.html)

corepack 可以管理 pnpm 和 yarn 的版本，与 `package.json` 中的 `packageManager` 字段绑定

[volta](https://volta.sh/) 可以对某一个项目锁定包管理工具版本
