# vitepress-demo-doc

## 上手

```bash
pnpm init
```

add pnpm config into `package.json`

```json
"pnpm": {
  "peerDependencyRules": {
    "ignoreMissing": [
      "@algolia/client-search"
    ]
  }
}
```

```bash
pnpm add vitepress vue -D
```

add scripts into `package.json`

```json
"scripts": {
  "dev": "vitepress dev docs",
  "build": "vitepress build docs",
  "preview": "vitepress preview docs"
}
```

## 配置文件

文件路径

```
/docs/.vitepress/config.ts
```

## 注意事项

- 静态资源使用相对路径
- `public`位于 doc 目录下，引用静态资源时使用绝对路径
- 一个文件只能有一个`<script setup> </script>`
- `lastUpdated` is git-based and it will work only if the file is committed.[issues1495](https://github.com/vuejs/vitepress/issues/1495)
- 搜索[issues1078](https://github.com/vuejs/vitepress/issues/1078)

## 踩坑

- 代码块的语言要写对，要不然就不写，不然 markdown 语法编译不通过

例如

````
报错'No language registration for ba'
```ba
```
````

- 尽量不写标签，因为缺少结束标签会报错，`Element is missing end tag`[issues1590](https://github.com/vuejs/vitepress/issues/1590)
