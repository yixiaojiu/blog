# FormData

参考[掘金](https://juejin.cn/post/7057293668440834061)

- FormData 一般用于文件的上传
- 在 post 请求中设置请求头的`Content-Type`为`multipart/form-data`

- FormData 用 key/value 的形式存储数据
- FormData 的 value 能设置三种类型的值，`string`、`Blob`、`File`
- 在请求体中以`------WebKitFormBoundary`作为分隔符，其内容主要有 `Content-Disposition`、`Content-Type`
- `Content-Disposition` 是必选项
- `name` 属性代表着表单元素的 `key`，`filename` 则是上传文件的名称
