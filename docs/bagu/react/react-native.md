# React Native

> [React Native 新架构分析](https://juejin.cn/post/6893032764124168206)

## 老架构

有三个线程，数据通过 JSON 在 Bridge 中进行异步通信

1. **JS thread**：JS代码执行线程，负责逻辑层面的处理，所有 JS 代码会被打包成 一个 JSBundle，然后传给 JavaScriptCore 引擎执行。
2. **UI Thread**：这个线程主要负责原生渲染（Native UI）和调用原生能力(Native Modules)比如蓝牙等。
3. **Shadow Thread**： 这个线程主要是创建Shadow Tree来模拟React结构树。Shadow Tree可以类似虚拟dom。RN使用Flexbox布局，但是原生是不支持，所以Yoga就是用来将Flexbox布局转换为原生平台的布局方式。

性能瓶颈主要在 Bridge

## 新架构

JSI(Javascript Interface)、Fabric、TurboModules、CodeGen、LeanCode

- **JSI**：整个架构的核心和基石，通过JSI，JS对象可以直接获得C++对象(Host Objects)引用，并调用对应方法，取代了 Bridge
- **Fabric**：包括了renderer和shadow thread
- **TurboModules**：和原生应用能力相关
- **CodeGen**：将Flow或者Ts等有静态类型的JS代码翻译成Fabric和TurboModules使用的原生代码
- **Lean Core**：包的瘦身，RN核心只保留必要的包，其他都移到react-native-community 或者拆出单独的组件

## 与 Flutter 的不同

- Flutter 在自己的画布上渲染所有组件，因此每个端的 UI 是一样的，并直接调用 CPU 和 GPU 进行绘制
