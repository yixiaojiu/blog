# CSS 实现三角形

> 参考自[洋 语雀](https://www.yuque.com/boyyang/buosw0/kdlw9p)和[掘金](https://juejin.cn/post/7075884138900750372)

三种方式

1. border
2. linear-gradient
3. clip-path

## border

**原理：** 盒模型为`content-box`，宽高都设置成 0，则 div 只与 border 有关

实现一个上三角形示例

```css
.triangle {
  width: 0;
  height: 0;
  border-top: 50px solid skyblue;
  border-right: 50px solid transparent;
  border-left: 50px solid transparent;
}
```

<div style="width: 0; height: 0; border-top: 50px solid skyblue; border-right: 50px solid transparent; border-left: 50px solid transparent;"></div>

实现一个等边三角形

```css
.triangle {
  width: 0;
  height: 0;
  border-left: 69px solid transparent;
  border-right: 69px solid transparent;
  border-bottom: 120px solid skyblue;
}
```

<div style="width: 0; height: 0; border-left: 69px solid transparent; border-right: 69px solid transparent; border-bottom: 120px solid skyblue;"></div>

## linear-gradient

**缺点：** 需要手动调试渐变角度

```css
.triangle {
  width: 160px;
  height: 200px;
  outline: 2px solid skyblue;
  background-repeat: no-repeat;
  background-image: linear-gradient(32deg, orangered 50%, rgba(255, 255, 255, 0) 50%), linear-gradient(148deg, orangered
        50%, rgba(255, 255, 255, 0) 50%);
  background-size: 100% 50%;
  background-position: top left, bottom left;
}
```

## clip-path

**缺点：** 浏览器兼容不好

clip-path 就是使用它来绘制多边形（或圆形、椭圆形等）并将其定位在元素内。实际上，浏览器不会绘制 clip-path 之外的任何区域，因此我们看到的是 clip-path 的边界。

```css
.triangle {
  margin: 100px;
  width: 160px;
  height: 200px;
  background-color: skyblue;
  // top-left (0 0)、bottom-left (0% 100%)、right-center (100% 50%)
  clip-path: polygon(0 0, 0% 100%, 100% 50%);
}
```
