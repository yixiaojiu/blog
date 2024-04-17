# 组成与原理

> [Node.js 源码剖析](https://theanarkh.github.io/understand-nodejs)
>
> [Node中的C++与Javascript如何连接](https://leoeatle.github.io/2019/11/05/Node%E4%B8%AD%E7%9A%84C-%E4%B8%8EJavascript%E5%A6%82%E4%BD%95%E8%BF%9E%E6%8E%A5/)

## 组成

主要由V8、Libuv，还有一些其它的第三方模块组成（cares异步DNS解析库、HTTP解析器、HTTP2解析器，压缩库、加解密库等）

Node.js源码分为三层，分别是JS、C++、C

Libuv是使用C语言编写，C++层主要是通过V8为JS层提供和底层交互的能力，JS 层为用户提供接口

V8 不仅负责执行JS代码，还负责执行C++ 与 JS 互相调用能力

Libuv 提供异步IO 能力，并负责事件循环的逻辑

## 如何实现扩展

JS 和 C++ 之间的桥梁 `internalBinding`，C++ 的模块都会绑定到这个变量上

源码位置： `lib/internal/bootstrap/realm.js`

## 启动过程

1. 注册C++模块
2. 创建Environment对象
3. 初始化Libuv任务
4. 初始化 realm 和执行上下文

初始化 internalBinding（用于内置的JS模块），BuiltinModule（JS 原生模块，可以被 require 的模块） 等

为 globalThis 与 process 挂载属性

5. 执行用户JS文件

```js
require('internal/modules/cjs/loader').Module.runMain(process.argv[1])
```

6. 进入Libuv事件循环

## 线程池

Libuv 维护了一个线程池，处理阻塞操作

线程池维护了一个任务队列，多个子线程会互斥地从中摘下任务节点执行，当子线程执行任务完毕后会通知主线程，主线程在事件循环的Poll IO阶段就会执行对应的回调
