# CSS

## less 和 scss 的区别

[掘金 LESS 和 SCSS 的区别](https://juejin.cn/post/7091644504586846216)

sass 在功能上面比 LESS 更强大，LESS 比较的清晰明了，容易上手

语法上的区别

- 声明和使用变量：LESS 用@符号，SCSS 用$符号表示
- SCSS 支持条件语句，LESS 不支持

## sass 与 scss

[掘金 Sass 和 Scss 的区别](https://juejin.cn/post/7033331497054519327)

- Scss 是 Sass 3 引入新的语法，是 Sassy CSS 的简写，其语法完全兼容 CSS3，并且继承了 Sass 的强大功能

- Sass 是以“.sass”后缀为扩展名，而 Scss 是以“.scss”后缀为扩展名。

- Sass 是以严格的缩进式语法规则来书写，SCSS 需要使用分号和花括号，与 CSS 语法类似

## 实体编码

> 参考 [山月](https://q.shanyue.tech/fe/html/480.html)

HTML 实体是一段以连字号（&）开头、以分号（;）结尾的字符串，用以显示不可见字符及保留字符

比如：

- 不可分的空格:＆nbsp;
- <(小于符号):＆lt;
- (大于符号):＆gt;

## flex

- `flex-flow` 是`flex-direction` 和 `flex-wrap`属性的简写
- `justify-content`: `space-around`两端有间隙，`space-between`两端无间隙
- `align-items`作用于纵轴单行元素,`stretch`值拉伸 flex 项目以填充容器（默认）
- `align-content` 作用于纵轴多行元素,一行元素不起作用
- `order`规定 flex 项目的顺序,默认值是 0
- `flex-grow` 属性规定某个 flex 项目相对于其余 flex 项目将增长多少,默认值是 0
- `flex-shrink` 属性规定某个 flex 项目相对于其余 flex 项目将收缩多少,默认值是 0
- `flex-basis`规定 flex 项目的初始长度
- `flex：1`含义为, `flex-grow: 1` `flex-shrink: 1` `flex-basix: 0%`

## css 中哪些常见的布局方式

流式布局（Flow Layout）、浮动布局（Float Layout）、定位布局（Positioning Layout）、弹性盒子布局（Flexbox Layout）、网格布局（Grid Layout）
