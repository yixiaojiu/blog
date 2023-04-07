# 基础

> 参考[掘金](https://juejin.cn/post/7162011064819777567)

## 说说 TypeScript 中命名空间与模块的理解和区别

**命名空间：** 命名空间是位于全局命名空间下的一个普通的带有名字的 JavaScript 对象，使用起来十分容易。但就像其它的全局命名空间污染一样，它很难去识别组件之间的依赖关系，尤其是在大型的应用中。

**模块：** 任何包含 `import` 或者 `export` 的文件都被当做一个模块。相反，这个文件被视为全局可见

在正常的 TS 项目开发过程中并不建议用命名空间，但通常在通过 d.ts 文件标记 js 库类型的时候使用命名空间，主要作用是给编译器编写代码的时候参考使用

## TypeScript 和 JavaScript 的区别是什么？

`TypeScript` 是 `JavaScript` 的超集，支持面向对象编程的概念，如类、接口、继承、泛型等，其是一种静态类型检查的语言，提供了类型注解，在代码编译阶段就可以检查出数据类型的错误。

## 解释一下 TypeScript 中的枚举

枚举是 TypeScipt 数据类型，它允许我们定义一组命名常量。 使用枚举去创建一组不同的案例变得更加容易。 它是**相关值**的集合，可以是数字值或字符串值。

## any void never unknown

- any： 不希望类型检查器对这些值进行检查而是直接让它们通过编译阶段的检查
- void： 表示没有任何类型,只能为它赋予 undefined 和 null
- never： 永不存在的值的类型，never 类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型； 变量也可能是 never 类型，当它们被永不为真的类型保护所约束时
- unknown： 可以把任何值赋值给 unknown ，但是不能调用属性和方法

## interface 和 type 异同

**相同点：**

1. 都可以描述一个对象或者函数

```ts
// 描述函数
interface SetUser {
  (name: string, age: number): void
}
```

2. 都允许拓展（extends），Interface 使用 `extends`, Type 使用 `&`

**不同点：**

1. type 可以声明基本类型别名，联合类型，元组等类型
2. type 语句中还可以使用 typeof 获取实例的类型进行赋值
3. interface 能够声明合并

## const 和 readonly 的区别是什么？

1. const 用于变量，readonly 用于属性
2. const 在运行时检查，readonly 在编译时检查
3. 使用 const 变量保存的数组，可以使用 push，pop 等方法。但是如果使用 Readonly Array 声明的数组不能使用 push，pop 等方法
