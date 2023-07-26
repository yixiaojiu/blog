# 事件机制

> 内容来自 [语雀 CUGGZ](https://www.yuque.com/cuggz/interview/browser)

事件是用户操作网页时发生的交互动作或者网页本身的一些操作

## 事件模型

1. **原始事件模型(DOM0 级)**

在 HTML 标签中绑定 `<input type="button"  οnclick="fun()">` ，或用 js 代码绑定 `btn.onclick = fun`。只支持冒泡

2. **标准事件模型(DOM2 级)**

通过 addEventListener 绑定事件

在该事件模型中，一次事件共有三个过程：事件捕获阶段、事件处理阶段、事件冒泡阶段

3. **IE 事件模型(基本不用)**

通过 attachEvent 绑定事件

在该事件模型中，一次事件共有两个过程：事件处理阶段、事件冒泡阶段

## 如何阻止事件冒泡

- 普通浏览器使用：event.stopPropagation()
- IE 浏览器使用：event.cancelBubble = true
