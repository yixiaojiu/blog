# BFC

> 参考[csdn](https://blog.csdn.net/sinat_36422236/article/details/88763187)

[mdn](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context)

BFC(Block formatting context)"块级格式化上下文"

- IFC-内敛格式化上下文
- GFC-网格布局格式化上下文
- FFC-弹性格式化上下文

## BFC 的布局规则

- 内部的 Box 会在垂直方向，一个接一个地放置
- Box 垂直方向的距离由 margin 决定。属于同一个 BFC 的两个相邻 Box 的 margin 会发生重叠
- 每个元素的左外边距与包含块的左边界相接触（从左到右），即使浮动元素也是如此
- BFC 的区域不会与 float 的元素区域重叠
- BFC 就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。
- 计算 BFC 的高度时，浮动元素也参与计算

## 如何创建 BFC

- 根元素：body
- float 的值不是 none
- position 的值为 absolute、fixed
- display 为 inline-block、table-cells、flex、inline-flex、table-caption
- overflow 的值为 hidden、auto、scroll

## BFC 作用

- **解决 margin 的重叠问题**：由于 BFC 是一个独立的区域，内部的元素和外部的元素互不影响，将两个元素变为两个 BFC，就解决了 margin 重叠的问题
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
