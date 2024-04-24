# 基础

## 文件流

Node 共有四种流

- Writable(可写流)：可以理解为将数据存储到指定的地方中
- Readable(可读流)：可以理解为将数据从指定的地方取出来
- Duplex: 可读写的流。例如，net.Socket。
- Transform: 可以在数据写入和读取时修改或转换数据的流，例如压缩 zlib.crateDeflate()

可读流和可写流的基本用法

```ts
import { createReadStream, createWriteStream } from 'fs'
import { resolve } from 'path'

const fromPath = resolve(__dirname, './txt/readstream.txt')
const toPath = resolve(__dirname, './txt/output.txt')
const rs = createReadStream(fromPath, {
  encoding: 'utf-8',
  // 每次读写量
  highWaterMark: 1,
  autoClose: true,
})

const ws = createWriteStream(toPath, {
  flags: 'w',
  encoding: 'utf-8',
  autoClose: true,
  // 每次读写量
  highWaterMark: 1,
})

rs.pipe(ws)
```
