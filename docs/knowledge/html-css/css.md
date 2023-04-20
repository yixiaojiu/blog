# CSS

## Less 和 Scss 的区别

[掘金 LESS 和 SCSS 的区别](https://juejin.cn/post/7091644504586846216)

Scss 在功能上面比 Less 更强大，Less 比较的清晰明了，容易上手

语法上的区别

- 声明和使用变量：Less 用@符号，Scss 用$符号表示
- Scss 支持条件语句，Less 不支持
- Mixins

```scss
@mixin theme($theme: DarkGray) {
  background: $theme;
  box-shadow: 0 0 1px rgba($theme, 0.25);
  color: #fff;
}

.info {
  @include theme;
}
```

```less
.bordered {
  border-top: dotted 1px black;
  border-bottom: solid 2px black;
}

#menu a {
  color: #111;
  .bordered();
}

.post a {
  color: red;
  .bordered();
}
```

## Sass 与 Scss

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

### justify-content 注意事项

item4 和 item5 不会和 item1、item2 在垂直方向上对其

想要实现对其，可以在后面补伪元素

```html
<style>
  .box {
    display: flex;
    width: 400px;
    justify-content: space-around;
    flex-wrap: wrap;
  }
  .item {
    width: 110px;
    height: 100px;
    background-color: aqua;
  }
</style>
<div class="box">
  <div class="item">1</div>
  <div class="item">2</div>
  <div class="item">3</div>
  <div class="item">4</div>
  <div class="item">5</div>
</div>
```

## css 中哪些常见的布局方式

流式布局（Flow Layout）、浮动布局（Float Layout）、定位布局（Positioning Layout）、弹性盒子布局（Flexbox Layout）、网格布局（Grid Layout）

## margin 值为负数

## CSS 放在顶部，JS 放在底部

CSS 不会阻塞 DOM 的解析，可以和 DOM 一起解析，但会阻塞 DOM 的渲染

JS 放在底部：

1. 让浏览器更快地加载和解析 HTML 和 CSS，从而加速页面的加载速度
2. 避免 JavaScript 执行错误，因为 JS 可能会获取 DOM 信息

## width 值为百分数

相对于父元素 content 的宽度

## inline

- inline 元素设置 width、height 属性无效
- inline 元素的 margin 和 padding 属性，水平方向产生效果，垂直方向无效果
- vertical-align 用来指定行内元素（inline）或表格单元格（table-cell）元素的垂直对齐方式
