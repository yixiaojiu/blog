# 类型体操

[汪图南 Type-Challenges](https://wangtunan.github.io/blog/typescript/challenge.html)

- T[number]

```ts
type TNumber<T extends any[]> = T[number]
// 结果：1 | 2 | 3
type Result = TNumber<[1, 2, 3]>
```

- [...infer R, infer L]

```ts
type Last<T extends any[]> = T extends [...infer R, infer L] ? L : never
```

类型中可以这么写，js 中 rest element 必须放到最后
