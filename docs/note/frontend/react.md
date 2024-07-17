# React

## 一个 dom 绑定多个 ref

```tsx
import { useRef } from 'react'

const App = () => {
  const oneRef = useRef<HTMLDivElement | null>(null)
  const twoRef = useRef<HTMLDivElement | null>(null)
  const bindMultipleRef = (el: HTMLDivElement | null) => {
    oneRef.current = el
    twoRef.current = el
  }
  return <div ref={(el) => bindMultipleRef(el)}></div>
}
```

**注意:** 不能使用 createRef,因为 createRef 的 current 是只读属性不能修改

## 根据 Dom 获取 React Fiber

React 内部会在 DOM 上反向的挂上它所对应的 fiber node 的引用，这个引用在 DOM 元素上以 `__reactInternalInstance` 开头命名
