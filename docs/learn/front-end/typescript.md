# typescript

## extends

### 泛型约束

[typescript doc](https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-constraints)

```ts
interface ValueWithLength {
  length: number
}

// extends 用于约束T的类型
function logLength<T extends ValueWithLength>(arg: T): T {
  console.log(arg.length)
  return arg
}
```

### 条件判断

```ts
type ResultType = SomeType extends OtherType ? TrueType : FalseType
```

## keyof and typeof

- `keyof` 用对象的 key 生成 Union Types
- `typeof` 计算变量的类型, js 的`typeof`只能计算八种类型

**注意**

```ts
type Mapish = { [k: string]: boolean }
type M = keyof Mapish
// type M = string | number
```

## infer

用于抽取类型

```ts
type Flatten<Type> = Type extends Array<infer Item> ? Item : Type

type Str = Flatten<string[]>
// Str = string
```

## Type 与 Interface 的区别

[typescript doc](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces)

- 扩展类型, Interface 使用 `extends`, Type 使用`&`
- 向已有的类型添加新的字段, Interface 可以，type 不行

```ts
interface Inter {
  name: string
}

interface Inter {
  age: number
}
```

## jsx

[Introducing the New JSX Transform](https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html#whats-different-in-the-new-transform)
[typescript doc](https://www.typescriptlang.org/docs/handbook/jsx.html)

react17 新增 JSX Transform

- 新 JSX Transform, `tsconfig`设置 jsx 为 react-jsx

```ts
// input
export const Button = () => {
  return <button></button>
}

// output
import { jsx as _jsx } from 'react/jsx-runtime'
export const Button = () => {
  return _jsx('button', {})
}
```

- 旧 JSX Transform, `tsconfig`设置 jsx 为 react

```ts
// input
import React from 'react'

export const Button = () => {
  return <button></button>
}

// output
import React from 'react'
export const Button = () => {
  return React.createElement('button', null)
}
```

## tsc 检查类型错误

```bash
tsc --noEmit
```

## 导入 commonJS 包

1. import \* as a from 'a'

使用`a`模块时需要`a.default`

2. 在`tsconfig.json`中配置`esModuleInterop`和`allowSyntheticDefaultImports`
