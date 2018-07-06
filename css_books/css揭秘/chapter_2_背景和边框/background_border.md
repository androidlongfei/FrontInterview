# 背景与边框

- 半透明边框

## 1.半透明边框

背景知识

- [RGBA](http://www.css88.com/book/css/values/color/rgba.htm)
- [HSLA](http://www.css88.com/book/css/values/color/hsla.htm)
- [background-clip](http://www.w3school.com.cn/cssref/pr_background-clip.asp)

background-clip:属性规定背景的绘制区域。

```css
div:nth-child(1) {
    /* 边框半透明 */
    /* border: 10px solid hsla(0, 0%, 100%, .5); */
    border: 10px solid rgba(255, 255, 255, .5);
    background: white;
    /* background-clip规定背景的绘制区域,padding-box表示背景只绘制到padding */
    background-clip: padding-box;
    max-width: 20em;
    padding: 2em;
    margin: 2em auto 0;
    font: 100%/1.5 sans-serif;
}
```

> 默认情况下，背景会延伸到边框所在的区域下层.

> 通过background-clip属性来调整背景的显示区域。

## 2.多重边框

- [box-shadow](http://www.w3school.com.cn/cssref/pr_box-shadow.asp)

box-shadow:属性向框添加一个或多个阴影。

语法:

```text
box-shadow: h-shadow v-shadow blur spread color inset;
```

值        | 描述
-------- | -------------------------
h-shadow | 必需。水平阴影的位置。允许负值。
v-shadow | 必需。垂直阴影的位置。允许负值。
blur     | 可选。模糊距离。
spread   | 可选。阴影的尺寸。
color    | 可选。阴影的颜色。请参阅 CSS 颜色值。
inset    | 可选。将外部阴影 (outset) 改为内部阴影。

一个正值的扩张半径加上两个为零的偏移量以及为零的模糊值，得到的"投影"其实就像一道实线边框。如下:

```css
div:nth-child(1) {
    background: yellowgreen;
    box-shadow: 0 0 0 10px #655;
}
```

box-shadow 的好处在于，它支持逗号分隔语法，我们可以创建任意数量的投影。

唯一需要注意的是，box-shadow 是层层叠加的，第一层投影位于最顶层，依次类推。因此，你需要按此规律调整扩张半径。比如说，在前面的代码中，我们想在外圈再加一道5px 的外框那就需要指定扩张半径的值为`15px（10px+5px）`。

```css
div:nth-child(2) {
    background: yellowgreen;
    box-shadow: 0 0 0 10px #655,
    0 0 0 15px deeppink,
    0 2px 5px 15px rgba(0, 0, 0, .6);
}
```

多重投影解决方案在绝大多数场合都可以很好地工作，但有一些注意事项。

1. 投影的行为跟边框不完全一致，因为它不会影响布局，而且也不会 受到box-sizing 属性的影响
2. 上述方法所创建出的假"边框"出现在元素的外圈。它们并不会响应鼠标事件，比如悬停或点击。

**使用outline实现两层边框**

- [outline](http://www.w3school.com.cn/cssref/pr_outline.asp)

outline （轮廓）是绘制于元素周围的一条线，位于边框边缘的外围，可起到突出元素的作用。

注释：轮廓线不会占据空间，也不一定是矩形。

## 3.灵活的背景定位

- [background-position](http://www.w3school.com.cn/cssref/pr_background-position.asp)
- [background-origin](http://www.w3school.com.cn/cssref/pr_background-position.asp)

**background-position的扩展语法方案**

background-position 属性设置背景图像的起始位置。

background-position 属性已经得到扩展，它允许我们指定背景图片距离任意角的偏移量，只要我们在偏移量前面指定关键字。举例来说，如果想让背景图片跟右边缘持20px 的偏移量，同时跟底边保持10px 的偏移量，可以这样做:

```css
div:nth-child(1) {
    /* 兼容写法 */
    background: url(http://csssecrets.io/images/code-pirate.svg) no-repeat bottom right #58a;
    background-position: right 20px bottom 10px;
}
```

**background-origin方案**

background-origin 属性规定 background-position 属性相对于什么位置来定位。

值           | 描述
----------- | ---------------
padding-box | 背景图像相对于内边距框来定位。
border-box  | 背景图像相对于边框盒来定位。
content-box | 背景图像相对于内容框来定位。

每个元素身上都存在三个矩形框border box（边框的外沿框）、padding box（内边距的外沿框）和content box（内容区的外沿框）。

默认情况下，background-position 是以`padding box`为准的，这样边框才不会遮住背景图片。因此，top left 默认指的是`padding box`的左上角。

background-origin属性可以用改变这种行为。如下:

```css
div:nth-child(2) {
    background: url(http://csssecrets.io/images/code-pirate.svg) no-repeat bottom right #58a;
    background-origin: content-box;

    /* Styling */
    max-width: 10em;
    min-height: 5em;
    margin-top: 20px;
    padding-right: 20px;
    padding-bottom: 10px;
    color: white;
    font: 100%/1 sans-serif;
}
```

**calc() 方案**

如果我们仍然以左上角偏移的思路来考虑，其实 就是希望它有一个`100% - 20px` 的水平偏移量，以及`100% - 10px` 的垂直 偏移量。

```css
```
