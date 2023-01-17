# npm run xxx 和 npm link

> 参考 [掘金 洋 z](https://juejin.cn/post/7176963409236197413) 和 [掘金](https://juejin.cn/post/6844904030620090382)

## npm run xxx

1. `package.json` 中有一个`bin`字段，用于指定当前包的可执行脚本
2. 在`npm i xxx` 时会在`node_modules/.bin/`创建好对应的可执行文件
3. `.bin`目录下的文件，会找到对应的可执行脚本(看一眼对应的文件就明白了)
4. 在`npm run xxx`时，`xxx`对应的命令，会在`node_modules/.bin/`、全局、path 环境变量中查找

## npm link

**使用场景**

为开发的模块(待发布的 npm 包)创造一个全局链接，方便进行测试。

### 创建、使用、去除软链

link-module 需要软链的包，project-A 想要使用 link-module 的包

1. 在 link-module 中`npm link`，创建全局软链
2. 在 project-A 中`npm link link-module`
3. 使用完后`npm unlink link-module`,`npm unlink link-module -g `或在 link-module 中`npm unlink`

## pnpm link 使用

1. 在 link-module 中 `pnpm link --global`,创建全局软链接
2. 在 project-A 中`pnpm link --global link-module`

### 其他

- npm yarn pnpm 之间 link 不能混用，它们各自维护自己的全局 link(猜测)
- link 的骚操作[stackoverflow](https://stackoverflow.com/questions/72032028/can-pnpm-replace-npm-link-yarn-link)
