# 生命周期

> 整理 [前端面试题之 React 篇](https://www.yuque.com/cuggz/interview/pgw8v4)

## 组件挂载阶段

此阶段依次执行以下方法

- constructor
- getDerivedStateFromProps
- render
- componentDidMount

### constructor

constructor 中必须执行 `super(props)`，否则无法在构造函数中拿到 this。constructor 一般完成两件事：初始化组件的 state、给事件处理方法绑定 this

### getDerivedStateFromProps(props, state)

这是个静态方法，没有 this，有两个参数 props 和 state，分别指接收到的新参数和当前组件的 state 对象，函数会返回一个对象用来更新当前的 state 对象，如果不需要更新可以返回 null。

该函数会在装载时，接收到新的 props 或者调用了 setState 和 forceUpdate 时被调用。如当接收到新的属性想修改 state ，就可以使用。

### render

返回需要渲染的内容

### componentDidMount

componentDidMount 会在组件挂载后（插入 DOM 树中）立即调用

如果在 componentDidMount 中调用 setState ，就会触发一次额外的渲染，由于它是在浏览器刷新屏幕前执行的，所以用户对此是没有感知的

## 组件更新阶

当组件的 props 改变了，或组件内部调用了 setState/forceUpdate，会触发更新重新渲染，这个过程可能会发生多次。这个阶段会依次调用下面这些方法:

- getDerivedStateFromProps
- shouldComponentUpdate
- render
- getSnapshotBeforeUpdate
- componentDidUpdate

### shouldComponentUpdate(nextProps, nextState)

默认返回 true，返回 false 时组件停止更新，后续的 render 和 componentDidUpdate 也不会调用

### getSnapshotBeforeUpdate(prevProps, prevState)

参数表示更新前的 props 和 state，返回值默认为 null，这个返回值作为第三个参数传给 componentDidUpdate

### componentDidUpdate(prevProps, prevState, snapshot)

在更新后会被立即调用，首次渲染不会执行此方法

## 组件卸载阶段

componentWillUnmount() 会在组件卸载及销毁之前直接调用。在此方法中执行必要的清理操作：

- 清除 timer，取消网络请求或清除
- 取消在 componentDidMount() 中创建的订阅等

## 错误处理阶段

componentDidCatch(error, info)，此生命周期在后代组件抛出错误后被调用
