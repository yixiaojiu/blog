# 编译原理

## 序言

### 为什么会有那么多的编程语言

对于编程应用领域来说，它的需求非常独特，又充满矛盾。
众口难调，很难为所有程序员设计一门应对各种场景的编程语言

例如不同场景的需求：

- 科学计算：优秀的浮点计算、对数组支持良好、并行计算。比如 FORTRAN
- 商业领域：安全性、日志、数据分析。比如 SQL

### 为什么需要新的编程语言

- 被广泛使用的语言更改会变得很慢，教育成本很高

[Akara 博客](https://messiahhh.github.io/blog/docs/%E7%BC%96%E8%AF%91%E5%8E%9F%E7%90%86)

## C 语言编译流程

hello.c 经过预处理器(cpp) 得到 hello.i

hello.i 经过编译器(cc1) 翻译成汇编程序 hello.s

hello.s 汇编器(as)将文本翻译成机器语言指令，打包成一种叫做可重定位目标程序 hello.o

hello.o 链接器(ld)，将用到的各种标准库函数（如：printf.o）并入文件中
