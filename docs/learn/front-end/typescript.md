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

## 装饰器

> 整理 [掘金](https://juejin.cn/post/7019921363918045192)

装饰器允许向一个现有的对象添加新的功能，同时又不改变其结构。这种模式创建了一个装饰类，用来包装原有的类，并在保持类方法签名完整性的前提下，提供了额外的功能，可以提高代码的复用性，同时减少代码量。

### 类装饰器

[typescript 官方文档](https://www.typescriptlang.org/docs/handbook/decorators.html)

修改 `tsconfig.json`

```json
{
  "compilerOptions": {
    "experimentalDecorators": true
  }
}
```

**普通装饰器：不能传参**

```ts
const Url: ClassDecorator = (target) => {
  // target 为构造函数
  console.log(target)
  target.prototype.url = 'http://localhost/api'
}
@Url
class Http {}

const http = new Http() as any
console.log(http.url)

// output
// [class Http]
// http://localhost/api
```

等效于：

```ts
const Url: ClassDecorator = (target) => {
  // target 为构造函数
  console.log(target)
  target.prototype.url = 'http://localhost/api'
}

class Http {}

const http = new Http() as any
Url(Http)
console.log(http.url)
```

**装饰器工厂：可以传参**

```ts
const Url = (url: string): ClassDecorator => {
  return (target) => {
    target.prototype.url = url
  }
}

@Url('http://localhost/api')
class Http {}
const http = new Http() as any
console.log(http.url)
```

### 方法装饰器

它会被应用到方法的属性描述符上，可以用来监视，修改或者替换方法定义。方法装饰会在运行时传入下列个参数:

- 装饰的实例。对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
- 成员的名字
- 成员的属性描述符

```ts
const Get = (url: string): MethodDecorator => {
  return (target, key, description: PropertyDescriptor) => {
    description.value({
      url,
      code: 200,
    })
  }
}

class Http {
  @Get('http://localhost/api')
  getList(data: any) {
    console.log(data)
  }
}

const http = new Http()
```
