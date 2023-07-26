# BFC

> 参考[csdn](https://blog.csdn.net/sinat_36422236/article/details/88763187)

[mdn](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context)

BFC(Block formatting context)"块级格式化上下文"

- IFC-内敛格式化上下文
- GFC-网格布局格式化上下文
- FFC-弹性格式化上下文

## BFC 的布局规则

- 在一个 BFC 下的块 margin 会发生重叠，不在同一个则不会
- BFC 的块不会和浮动块重叠
- BFC 就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。
- 计算 BFC 的高度时，浮动元素也参与计算
- 每个元素的左外边距与包含块的左边界相接触（从左到右），即使浮动元素也是如此

## 如何创建 BFC

- 根元素：body
- float 的值不是 none
- position 的值为 absolute、fixed
- display 为 inline-block、table-cells、flex、inline-flex、table-caption
- overflow 的值为 hidden、auto、scroll

## BFC 作用

- **解决 margin 的重叠问题**：将其中一个元素套在 BFC 中
- **解决高度塌陷的问题**：把父元素变成一个 BFC，常用的办法是给父元素设置 overflow:hidden
- **创建自适应两栏布局**

```css
.left {
  width: 100px;
  height: 200px;
  background: red;
  float: left;
}
.right {
  height: 300px;
  background: blue;
  overflow: hidden;
}
```

## 清除浮动

```css
.clear_fix::after {
  /* 要加的属性 */
  content: ''; /* 添加内容 */
  clear: both; /* 清楚两侧浮动 */
  display: block; /* 转换元素类型为块元素 */
  height: 0;
  overflow: hidden; /* 溢出隐藏属性 */
  visibility: hidden; /* 隐藏属性 */
}
```
