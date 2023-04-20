# pnpm

> 参考 [山月](https://q.shanyue.tech/engineering/751.html#pnpm-%E4%B8%BA%E4%BD%95%E8%8A%82%E7%9C%81%E7%A9%BA%E9%97%B4), [掘金](https://juejin.cn/post/7127295203177676837)

## 包管理工具发展史

### npm2

依赖之间层层嵌套

**问题：**

- 多个包之间有公共依赖，同样的依赖会复制很多次
- 嵌套过深，windows 有文件路径的限制

### yran

yran 将依赖平铺在 node_modules

可能会有嵌套，因为一个包可能有多个版本被依赖，提升只能提升一个版本

npm3 也使用平铺的方案

**问题：**

- 幽灵依赖
- 一个包有多个版本时，仍然会重复

## 软链接与硬链接

```bash
ln -s [file] [target file]  软链接
ln [file] [target file]     硬链接
```

示例

```bash
$ ln -s hello hello-soft
$ ln hello hello-soft

ls -lih

total 8.0K
792886 -rw-r--r-- 2 root root 1.1K Dec 30 22:01 hello
792886 -rw-r--r-- 2 root root 1.1K Dec 30 22:01 hello-hard
792887 lrwxrwxrwx 1 root root    5 Dec 30 22:03 hello-soft -> hello
```

**区别:**

- 软链接可理解为指向源文件的指针，它是单独的一个文件,仅仅只有几个字节,它拥有独立的 inode
- 硬链接与源文件同时指向一个文件地址，它与源文件共享数据，拥有相同的 inode

## 使用 pnpm 时，`node_modules` 的结构

- `package.json`中 dependencies 依赖的包都在`node_modules`下，它们都软连接到`.pnpm`下

```
$ ls -lih

total 0
793204 lrwxrwxrwx 1 root root 41 Jan  1 16:20 express -> .pnpm/express@4.18.2/node_modules/express
793216 lrwxrwxrwx 1 root root 33 Jan  1 16:22 vue -> .pnpm/vue@3.2.45/node_modules/vue
```

- `.pnpm`下的包硬链接到全局的 store
- `.pnpm`下的包的依赖有的硬链接有的软链接`.pnpm`下的包

## pnpm link 使用

1. 在 link-module 中 `pnpm link --global`,创建全局软链接
2. 在 project-A 中`pnpm link --global link-module`

## monorepo

[掘金 monorepo 的组件库搭建](https://juejin.cn/post/7146183222425518093)

### 优点

- 共用基础设置，不用重复配置
- 有依赖的项目之间调试开发非常方便
- 第三方库的版本管理更简单

### 创建

新建 `pnpm-workspace.yaml`，声明对应的工作区

```yaml
packages:
  - docs
  - packages/*
```

### Workspace 协议 (workspace:)

```json
{
  "dependencies": {
    "foo": "workspace:*",
    "bar": "workspace:~",
    "qar": "workspace:^"
  }
}
```

当 `workspace` 包打包发布时，将会动态替换这些 `workspace:` 依赖

```json
{
  "dependencies": {
    "foo": "1.5.0",
    "bar": "~1.5.0",
    "qar": "^1.5.0"
  }
}
```
