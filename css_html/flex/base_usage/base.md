# Flex用法

相关文档

- [Flex语法](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)
- [Flex实例](http://www.ruanyifeng.com/blog/2015/07/flex-examples.html)
- [flex取值](https://segmentfault.com/q/1010000004080910/a-1020000004121373)
- [demo](https://github.com/JailBreakC/flex-box-demo)

Flex 是 Flexible Box 的缩写，意为"弹性布局"，用来为盒状模型提供最大的灵活性。

任何一个容器都可以指定为 Flex 布局。

```css
.box{
  display: flex;
}
```

行内元素也可以使用 Flex 布局。

```css
.box{
  display: inline-flex;
}
```

Webkit 内核的浏览器，必须加上-webkit前缀。

```css
.box{
  display: -webkit-flex; /* Safari */
  display: flex;
}
```

注意，设为Flex布局以后，子元素的`float`、`clear`和`vertical-align`属性将失效。

## flex布局容器(Container)实例

- [flex-direction](./base/_1_flex-direction.html)
- [flex-wrap](./base/_2_flex-wrap.html)
- [flex-flow](./base/_3_flex-flow.html)
- [justify-content](./base/_4_justify-content.html)
- [align-items](./base/_5_align-items.html)
- [align-content](./base/_6_align-content.html)

**flex-direction**

flex-direction属性决定主轴的方向（即项目的排列方向）

```css
.box {
  flex-direction: row | row-reverse | column | column-reverse;
}
```

> row（默认值）：主轴为水平方向，起点在左端。

> row-reverse：主轴为水平方向，起点在右端。

> column：主轴为垂直方向，起点在上沿。

> column-reverse：主轴为垂直方向，起点在下沿。

**flex-wrap**

默认情况下，项目都排在一条线（又称"轴线"）上。flex-wrap属性定义，如果一条轴线排不下，如何换行。

```css
.box{
  flex-wrap: nowrap | wrap | wrap-reverse;
}
```

> nowrap（默认）：不换行。

> wrap：换行，第一行在上方。

> wrap-reverse：换行，第一行在下方。

**flex-flow**

flex-flow属性是flex-direction属性和flex-wrap属性的简写形式，默认值为`row nowrap`。

**justify-content**

justify-content属性定义了项目在主轴(默认是水平方向)上的对齐方式。

```css
.box {
  justify-content: flex-start | flex-end | center | space-between | space-around;
}
```

> flex-start（默认值）：左对齐

> flex-end：右对齐

> center： 居中

> space-between：两端对齐，项目之间的间隔都相等。

> space-around：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。

**align-items**

align-items属性定义项目在辅轴(默认是垂直方向)上如何对齐。

```css
.box {
  align-items: flex-start | flex-end | center | baseline | stretch;
}
```

> flex-start：起点对齐。

> flex-end：终点对齐。

> center：中点对齐。

> baseline: 项目的第一行文字的基线对齐。

> stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。

**align-content**

align-content属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。

## flex布局项目(Item)实例

- [order](./base/item/_1_order.html)
- [flex-grow](./base/item/_2_flex-grow.html)
- [flex-shrink](./base/item/_3_flex-shrink.html)
- [flex-basis](./base/item/_4_flex-basis.html)
- [flex](./base/item/_5_flex.html)
- [align-self](./base/item/_6_align_self.html)

**order**

order属性定义项目的排列顺序。数值越小，排列越靠前，默认为0。

```css
.item {
  order: <integer>;
}
```

**flex-grow**

flex-grow属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。

```css
.item {
  flex-grow: <number>; /* default 0 */
}
```

如果所有项目的flex-grow属性都为1，则它们将等分剩余空间（如果有的话）。如果一个项目的flex-grow属性为2，其他项目都为1，则前者占据的剩余空间将比其他项多一倍。

**flex-shrink**

flex-shrink属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。

```css
.item {
  flex-shrink: <number>; /* default 1 */
}
```

如果所有项目的flex-shrink属性都为1，当空间不足时，都将等比例缩小。如果一个项目的flex-shrink属性为0，其他项目都为1，则空间不足时，前者不缩小。

**flex-basis**

flex-basis属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。

```css
.item {
  flex-basis: <length> | auto; /* default auto */
}
```

它可以设为跟width或height属性一样的值（比如350px），则项目将占据固定空间。

**flex**

flex属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。

**align-self**

align-self属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch

```css
.item {
  align-self: auto | flex-start | flex-end | center | baseline | stretch;
}
```

## flex参数解释

首先明确一点是， flex 是 flex-grow、flex-shrink、flex-basis的缩写。

1.flex 的默认值是以上三个属性值的组合。假设以上三个属性同样取默认值，则 flex 的默认值是 0 1 auto。

如下：

```
.item{
  flex:0 1 auto
}
.item {
    flex-grow: 0;
    flex-shrink: 1;
    flex-basis: auto;
}
```

> 解释为当容器扩大时，所有item不会变大； 当容变小时，所有item会等比例缩小； item默认就是自己本身的大小

2.当 flex 取值为一个非负数字，则该数字为 flex-grow 值，flex-shrink 取 1，flex-basis 取 0%，如下是等同的：

```
.item {flex: 1;}
.item {
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 0%;
}
```

> 解释为当容器扩大时，所有item会等比例扩大，直至撑满容器; 当容器缩小时，所有item会等比例缩小，直至撑满整个容器 item默认就是自己本身的大小

3.当 flex 取值为一个长度或百分比，则视为 flex-basis 值，flex-grow 取 1，flex-shrink 取 1，有如下等同情况（注意 0% 是一个百分比而不是一个非负数字）：

```
.item-1 {flex: 0%;}
.item-1 {
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 0%;
}
.item-2 {flex: 24px;}
.item-1 {
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 24px;
}
```

> 解释为当容器扩大时，所有item会等比例扩大，直至撑满容器; 当容器缩小时，所有item会等比例缩小，直至撑满整个容器 item大小是设置的百分比值

4.当 flex 取值为 none，则计算值为 0 0 auto，如下是等同的：

```
.item {flex: none;}
.item {
    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: auto;
}
```

5.当 flex 取值为 auto，则计算值为 1 1 auto，如下是等同的：

```
.item {flex: auto;}
.item {
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: auto;
}
```

## 兼容性写法

flex 容器

```
.weui-flex {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
}
```

flex 项目

```
.weui-flex__item {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
}
```
