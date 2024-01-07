# NodeJS

## 调试

### console.dir

`console.dir(obj, { depth: null })` 让打印的内容不折叠

## console 进度条简单实现

```js
for (let i = 0; i < 5; i++) {
  process.stdout.write(`hello ${i} \r`)
  await sleep(500)
}
```

## 执行命令并使用父进程的输出

```js
import { spawn } from 'child_process'

spawn('echo', ['hello world'], { stdio: 'inherit' })
```
