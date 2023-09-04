# 微前端

> [掘金 微前端知识梳理](https://juejin.cn/post/7221046247262781499)

## 什么是微前端

微前端是一种将前端应用程序拆分成更小，更独立的部分，以便于团队协作和维护的架构模式，每个微应用都可以独立开发，测试，部署和运行。

## 方案梳理

### qiankun

- qiankun 的核心思想是路由统一，可以理解为，qiankun 可以做到同一项目，子应用是 Vue，React 等不同技术栈编写而成，子应用集成到了一个主应用中，主项目通过路由统一来管理这些子应用。这意味着，主项目负责处理所有的路由请求，并将这些请求转发给了相应的子应用，这种方式使得多个子应用之间的理由管理更加统一和协调，从而提升了整个应用的可维护性和可扩展性。
- qiankun 采用了基于 Web Components 的应用拆分方案，将整个应用拆分成了多个独立的 Web 组件，可以独立开发，独立部署，独立运行。每个子应用都运行在独立的沙箱环境中，避免了应用之间的命名冲突和样式污染
- qiankun 采用了 Single-SPA 的应用加载机制，可以动态加载和卸载子应用，实现了应用的动态化管理。在加载子应用时，qiankun 会先加载子应用的 manifest.json 文件，获取子应用的基本信息和依赖关系，然后再加载子应用的入口文件。
- qiankun 采用了基于 CustomEvent 的通信机制，实现了子应用之间的通信和数据共享。在子应用中，可以通过 window.dispatchEvent()方法触发 CustomEvent 事件，然后在父应用中通过 window.addEventListener()方法监听 CustomEvent 事件，实现子应用和父应用之间的通信。
- qiankun 采用了基于 Fetch 的资源加载机制，可以实现子应用的异步加载和缓存管理。在加载子应用时，qiankun 会先检查本地缓存，如果缓存中已经存在该子应用，则直接从缓存中加载，否则再通过 Fetch API 从服务器上加载。
- qiankun 采用了基于 Proxy 的沙箱环境，可以实现子应用的隔离和安全性保障。在加载子应用时，qiankun 会为每个子应用创建一个独立的沙箱环境，通过 Proxy 对象对子应用的全局变量和方法进行代理，避免了子应用之间的相互影响。
- qiankun 采用了基于 Webpack 的打包优化，可以实现子应用的按需加载和代码分割，提高了应用的性能和用户体验。在打包子应用时，qiankun 会将子应用的代码分割成多个小块，然后在加载子应用时，只加载当前需要的代码块，避免了不必要的资源浪费。
- qiankun 采用了基于 ES6 Module 的模块化管理，可以实现子应用的模块化开发和管理，提高了代码的可维护性和可复用性。在子应用中，可以通过 export 关键字将模块暴露出去，然后在父应用中通过 import 关键字引入模块，实现子应用和父应用之间的模块化管理。

### Module Federation

webpack 5 新特性

- Module Federation 的核心思想是代码统一，将多个独立的 Webpack 构建之间共享模块，从而实现代码统一
- Module Federation 采用了远程模块加载的方式，可以将模块从一个应用加载到另一个应用中。在加载远程模块时，Module Federation 会先从远程应用中获取模块的描述信息，然后再通过网络请求获取模块的代码。
- Module Federation 中的模块描述信息包括了模块的名称、版本、入口文件等信息。在加载远程模块时，Module Federation 会先从远程应用中获取模块的描述信息，然后再根据描述信息加载模块的代码。
- Module Federation 可以实现不同应用之间的模块共享，可以将一个应用中的模块共享给其他应用使用。在共享模块时，Module Federation 会将模块的代码打包成一个独立的库，然后在其他应用中通过远程模块加载的方式使用该库。
- Module Federation 可以实现动态加载模块，可以根据用户的需求动态加载不同的模块。在动态加载模块时，Module Federation 会先从远程应用中获取模块的描述信息，然后再根据描述信息动态加载模块的代码。
- Module Federation 是基于 Webpack 实现的，它提供了一系列的 Webpack 插件，可以实现模块的共享、动态加载和远程模块加载等功能。在使用 Module Federation 时，需要在 Webpack 配置文件中添加相应的插件。
- Module Federation 会生成一个模块映射表，用于记录不同应用之间的模块依赖关系。在加载远程模块时，Module Federation 会根据模块映射表查找模块的依赖关系，然后再加载相应的模块。
- Module Federation 会缓存已经加载的模块，避免重复加载和网络请求。在加载远程模块时，Module Federation 会先检查本地缓存，如果缓存中已经存在该模块，则直接从缓存中加载，否则再通过网络请求获取模块的代码。

## qiankun 原理

> [手把手教你写一个简易的微前端框架](https://juejin.cn/post/7069535266733555725)

- 监听页面 URL 变化，切换子应用
- 根据当前 URL、子应用的触发规则来判断是否要加载、卸载子应用
- 子应用必须向外暴露 bootstrap mount unmount 这三个方法
  - bootstrap 只会执行一次
  - 在匹配到URL时执行mount

```js
import { registerMicroApps, start } from 'qiankun'

// 注册
registerMicroApps([
  {
    name: 'react app', // app name registered
    entry: '//localhost:7100',
    container: '#yourContainer',
    activeRule: '/yourActiveRule',
  },
  {
    name: 'vue app',
    entry: { scripts: ['//localhost:7100/main.js'] },
    container: '#yourContainer2',
    activeRule: '/yourActiveRule2',
  },
])

start()
```

- 拉取子应用 html，提取script 和 style
- 隔离子应用 window 作用域，用 Proxy 对一个空对象做了代理，然后把这个代理对象作为子应用的 window 对象
  - 当子应用里的代码访问 window.xxx 属性时，就会被这个代理对象拦截。它会先看看子应用的代理 window 对象有没有这个属性，如果找不到，就会从父应用里找，也就是在真正的 window 对象里找。
  - 当子应用里的代码修改 window 属性时，会直接在子应用的代理 window 对象上修改。
