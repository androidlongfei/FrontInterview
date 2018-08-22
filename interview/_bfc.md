# BFC

- [资料](https://www.cnblogs.com/lzbk/p/6057097.html)

## 一、BFC概念

Block Formatting Contexts 即`块级格式化上下文`，其中 Formatting Context 是一个决定如何渲染文档的容器。

创建的BFC元素就是一个独立的盒子,只有Blcok-level box(块级盒) 可以创建BFC，它规定了内部的Block-level Box如何布局. 并且与这个独立盒子里的布局不受外部影响，当然它也不会影响到外面的元素。

## 二、BFC特性

1. 内部的box会在垂直方向，从顶部开始一个接着一个地放置
2. box垂直方向的距离由margin(外边距)决定。属于`同一个BFC`的两个相邻box的margin会发生叠加
3. BFC的区域不会与float box叠加
4. BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素，反之亦然
5. 计算BFC高度时，浮动元素也参与计算
6. 每个元素的margin box的左边， 与包含块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。

## 三、触发BFC

1. 设置除 float:none 以外的属性值（如：left | right）就会触发BFC
2. 设置除 overflow: visible 以外的属性值（如： hidden | auto | scroll）就会触发BFC
3. 设置 display属性值为: inline-block | flex | inline-flex | table-cell | table-caption 就会触发BFＣ
4. 设置 position 属性值为：absolute | fixed 就会触发BFC
5. 使用 fieldset 元素（可以给表单元素设置环绕边框的html元素）也会触发BFC

## 四、应用BFC

### 1.解决margin叠加问题

```html

<style media="screen">
.item {
    width: 100px;
    height: 100px;
    border: 1px solid red;
}

.box1 {
    margin-bottom: 10px;
}

.box2 {
    margin-top: 10px;
}

.p1 {
    overflow: hidden;
}
</style>

<h2>去除外边距重叠2(bfc功能之一)</h2>
<div class="item box1"></div>
<div class="item box2" style="display:inline-block;"></div>
```

box2增加`display:inline-block`触发bfc，去除外边距重叠

### 2.用于布局

自适应两栏布局

```html
<style media="screen">
.leftDiv {
    width: 100px;
    height: 100px;
    background: green;
    float: left;
}

.normalDiv {
    height: 100px;
    background: pink;
    /*添加overflow:hidden，触发元素BFC*/
    overflow: hidden;
}
</style>
<h2>自适应宽度布局</h2>
<div class="leftDiv">水电费第三方哒哒哒哒哒哒</div>
<div class="normalDiv">水电费东方闪电</div>
```

leftDiv设置了`float:left`，normalDiv设置了`overflow: hidden`都触发了bfc，将leftDiv与normalDiv变成了两个相互隔离的独立盒子，此时这两个独立盒子里的布局不受外部影响，也不会影响到外面的元素，也就完成了自适应布局。

### 3.用于清除浮动，计算BFC高度

```html
<style media="screen">
.parent {
    border: 1px solid green;
    width: 200px;
    overflow: auto;
}

.child {
    width: 100px;
    height: 100px;
    background-color: red;
    float: left;
}
</style>
<h2>清除浮动，计算高度</h2>
<div class="parent">
    <div class="child">ssasdfsdf</div>
</div>
```

child设置了`float: left`触发了bfc,parent设置`overflow: auto`也触发了bfc，我们知道，在计算BFC的高度时，浮动元素也参与计算，通过给父元素parent设置BFC，来计算高度从而清除浮动。

bfc里面嵌套bfc，又由于bfc是个独立的盒子，它不会对外面的盒子产生影响，故而浮动影响也清除了。

## 总结

上面说的有些东西，其实在我们平常的布局中，已经有在使用这些规律，只是没有总结出来.
