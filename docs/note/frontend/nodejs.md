# NodeJS

## 调试

### devtools

将 node 的 log 信息输出到浏览器的控制台中 [调试指南](https://nodejs.org/en/guides/debugging-getting-started/)

Node 进程必须阻塞

```sh
node --inspect server.js
```

在 chrome 打开 `chrome://inspect/#devices`

![chrome-inspect](./images/chrome-inspect.png)

启动 node inspect 的时候，chrome 会自动捕获

对于一些 node cli 程序，可以使用别名，比如在 .zshrc 中

```sh
alias node='node --inspect'
```

### console.dir

`console.dir(obj, { depth: null })` 让打印的内容不折叠
