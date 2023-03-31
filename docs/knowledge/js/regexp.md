# 正则

> 整理[百度工程师带你玩转正则](https://juejin.cn/post/7187580193337245756)、[正则表达式不要背](https://juejin.cn/post/6844903845227659271)、[现代 JavaScript 教程](https://zh.javascript.info/regexp-groups)

## 修饰符

- `i`: 不区分大小写
- `g`: 全局匹配
- `m`: 多行匹配，使边界字符 `^` 和 `$` 匹配每一行的开头和结尾

## 元字符

1. 基本

- `\w` 查找单词字符（字母+数字+下划线）,`\W` 相反
- `\d` 匹配一个数字字符，`\D` 相反
- `\s` 匹配任何空白字符，包括空格、制表符、换页符，`\S` 相反

2. 边界符号

- `^` 匹配输入字符串的开始位置。如果设置了 RegExp 对象的 Multiline 属性，`^` 也匹配 `\n` 或 `\r` 之后的位置
- `$` 匹配输入字符串的结束位置。如果设置了 RegExp 对象的 Multiline 属性，`$` 也匹配 `\n` 或 `\r` 之前的位置
- `b` 匹配一个单词边界，即字和空格的位置，`\B` 非单词边界

3. 范围符

- `[]` 字符集合。匹配所包含的任意一个字符
- `[^]` 负值字符集合。匹配未包含的任意字符
- `-` 匹配任何一个包含的字符，您可以使用连字符指定字符的范围，[a-zA-Z0-9]

4. 量词符

- `*` 重复零次或多次
- `+` 重复一次或多次
- `?` 重复零次或一次
- `{n}` 重复 n 次
- `{n,}` 重复 n 次及以上
- `{n,m}` 重复 n 次到 m 次（包含 n、m 次）

## 相关方法

### 正则

1. test 检测字符串中是否有检测的字符，返回 boolean
2. exec 寻找字符串中是否含有检测的字符，将匹配的结果按照数组返回

```js
const regexp1 = /foo/g
const regexp2 = /foo/
const str = '"foo bar foo"'

console.log(regexp1.exec(str)) // [ 'foo', index: 1, input: '"foo bar foo"', groups: undefined ]
console.log(regexp1.exec(str)) // [ 'foo', index: 9, input: '"foo bar foo"', groups: undefined ]
console.log(regexp2.exec(str)) // [ 'foo', index: 1, input: '"foo bar foo"', groups: undefined ]
console.log(regexp2.exec(str)) // [ 'foo', index: 1, input: '"foo bar foo"', groups: undefined ]
```

## 字符串

1. search 检测与与正则表达式匹配的值，返回匹配字符串的位置，匹配不到返回-1
2. match 找到一个或多个正则表达式的匹配，修饰符有 g 时返回数组

```js
const regexp1 = /\d+/g
const regexp2 = /\d+/
const str = '"123 bar 234"'

console.log(str.match(regexp1)) // [ '123', '234' ]
console.log(str.match(regexp2)) // [ '123', index: 1, input: '"123 bar 234"', groups: undefined ]
```

3. matchAll 与 match 类似，但只能用于有 g 修饰符的正则表达式
4. replace 替换正则表达式匹配的字串
5. split 按匹配字符将字符串分割城数组

## 捕获组

- **捕获组：** 用括号括起来(regexp)，就形成了一个捕获组
- **非捕获组：** 开头用 `?:` 来排除组 (:regexp)
- **命名捕获组：** 在左括号后紧跟着放置 `?<name>` 即可完成对括号的命名

```js
const str = '2022-12-15'
const reg = /(\d{4})-(\d{2})-(\d{2})/
str.match(reg)
// ['2022-12-15', '2022', '12', '15', index: 0, input: '2022-12-15', groups: undefined]

const isNotCaputuringReg = /(?:\d{4})-(?:\d{2})-(?:\d{2})/
str.match(isNotCaputuringReg)
// ['2022-12-15', index: 0, input: '2022-12-15', groups: undefined]

const namedCaputuringReg = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/
str.match(namedCaputuringReg)
// [
//   '2022-12-15',
//   '2022',
//   '12',
//   '15',
//   index: 0,
//   input: '2022-12-15',
//   groups: [Object: null prototype] { year: '2022', month: '12', day: '15' }
// ]
```

## 回溯引用

模式的后面部分引用前面已经匹配到的子字符串，`\1`,`\2`,....

比如想要匹配两个连续相同的单词

```js
const str = 'I am am a dog.'
const reg = /\b(\w+)\s\1/
console.log(str.match(reg))
// [ 'am am', 'am', index: 2, input: 'I am am a dog.', groups: undefined ]
```

在 replace 方法中，用 `$1`,`$2`,....表示匹配的子串

```js
var str = 'abc abc 123'
str.replace(/(ab)c/g, '$1g')
// 得到结果 'abg abg 123'
```

## 向前向后查找

### 前向查找

`(?=regexp)` 用来限制后缀。例如`happy happily`这两个单词都以`happ`开头。如果想获得以`happ`开头的副词，用`happ(?=ily)`；如果过滤以`happy`开头的副词，用`happ(?!ily)` **负前向查找** 匹配

### 向后查找

`(?<=regexp)` 用来限制前缀。例如`apple people`这两个单词，如果想获得 `apple` 的 `ple` ,用 `/(?<=app)ple/` 来限制前缀，**负后向查找** `(?<!regex)`

## 使用示例

1. 校验用户账号合法性（只能输入 5-20 个以字母开头、可带数字、“\_”、“.”的字串）:

```js
const regexp = /^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){4,19}$/
```
