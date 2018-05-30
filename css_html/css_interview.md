# css和html面试收集

- <http://www.qdfuns.com/notes/12560/e86e1f2b905ddfbda1751ed9f450e205.html>
- <https://github.com/hawx1993/Front-end-Interview-questions>

## 1、介绍一下 CSS 的盒子模型？

有两种，IE 盒子模型、标准 W3C 盒子模型；

盒子模型包括：内容（content）、填充（padding）、边框（border）、边界（margin）。

标准w3c盒子模型的范围包括：margin、border、padding、content，并且content部分不包含其他部分。

ie盒子模型的范围也包括：margin、border、padding、content，和标准 w3c 盒子模型不同的是：ie 盒子模型的 content 部分包含了 border 和 pading

例子

```
例：一个盒子的 margin 为 20px，border 为 1px，padding 为 10px，content 的宽为 200px、高为 50px，

假如用标准 w3c 盒子模型解释，那么这个盒子需要占据的位置为：宽 20*2+1*2+10*2+200=262px、高 20*2+1*2*10*2+50=112px，盒子的实际大小为：宽 1*2+10*2+200=222px、高 1*2+10*2+50=72px；

假如用ie 盒子模型，那么这个盒子需要占据的位置为：宽 20*2+200=240px、高 20*2+50=70px，盒子的实际大小为：宽 200px、高 50px。
```

# 2、HTML5 为什么只需要写 <!DOCTYPE HTML>？

<!DOCTYPE>声明位于位于HTML文档中的第一行，处于 标签之前。告知浏览器的解析器用什么文档标准解析这个文档。DOCTYPE不存在或格式不正确会导致文档以兼容模式呈现。

HTML5不基于SGML，因此不需要对DTD进行引用，但是需要DOCTYPE来规范浏览器的行为（让浏览器按照他们应该的方式来运行）而HTML4.01基于SGML，所以需要对DTD进行引用，才能告知浏览器文档所使用的文档类型。

# 3、行内元素有哪些？块级元素有哪些？ 空(void)元素有那些？

**行内元素与块级元素直观上的区别**

- 行内元素会在一条直线上排列，都是同一行的，水平方向排列

- 块级元素各占据一行，垂直方向排列。块级元素从新行开始结束接着一个断行。

- 块级元素可以包含行内元素和块级元素。行内元素不能包含块级元素。

**行内元素与块级元素属性的不同**，主要是盒模型属性上

```
行内元素设置width无效，height无效，margin上下无效，padding上下无效
```

> 不过要注意一点，对于竖直方向的内边距(padding-top,padding-bottom)该行内元素的内容范围是增大了，不过只是表象，对周围元素无任何影响。

> 行级(display:inline;)元素不能设置宽高，因为内联属于行布局，其特性是在一行里进行布局，所以不能被设定宽高.

**行级与块级转化**，主要是设置display

以span为例，它是行级元素（display:inline），如果设置display:block，width和height属性生效，但是此时的span跟div一样了。 如果设置display:inline-block，则span并列在同行（意思就是块级元素能在一行并列显示了），而且width和height属性生效。

**行内元素如下**

```
a  b  span  img  input  select  strong
```

**块级元素如下**

```
div  ul  ol  li  dl  dt  dd  h1  h2  h3  h4  p
```

**空元素如下**

```
<br>  <hr>  <img>  <link> <meta>
```

> 没有内容的HTML元素被称为空元素

## 4、如何居中div？

给div 设置一个宽度，然后添加 margin:0 auto 属性；

```html
div{
  width:200px;
  margin:0 auto;
}
```

> margin:0 auto；的意思就是`上下距离是0,左右距离自动`

## 5.清除浮动的原理和方法

[清除浮动的方法和原理](http://blog.csdn.net/clare504/article/details/39524215)

## 6.SEO是什么

是由英文Search Engine Optimization缩写而来， 中文意译为"搜索引擎优化"。 SEO是指通过对网站进行站内优化(网站结构调整、网站内容建设、网站代码优化等)和站外优化，以便更好的被搜索引擎搜录和拥有更好的网站排名。

## 7.为什么要初始化CSS样式

因为浏览器的兼容问题，不同浏览器对有些标签的默认值是不同的，如果没对 CSS 初始化往往会出现浏览器之间的页面显示差异。 当然，初始化样式会对 SEO 有一定的影响，但鱼和熊掌不可兼得，但力求影响最小的情况下初始化.

以下是淘宝初始化:

```
body, h1, h2, h3, h4, h5, h6, hr, p, blockquote, dl, dt, dd, ul, ol, li, pre, form, fieldset, legend, button, input,
        textarea, th, td { margin:0; padding:0; }
        body, button, input, select, textarea { font:12px/1.5tahoma, arial, \5b8b\4f53; }
        h1, h2, h3, h4, h5, h6{ font-size:100%; }
        address, cite, dfn, em, var { font-style:normal; }
        code, kbd, pre, samp { font-family:couriernew, courier, monospace; }
        small{ font-size:12px; }
        ul, ol { list-style:none; }
        a { text-decoration:none; }
        a:hover { text-decoration:underline; }
        sup { vertical-align:text-top; }
        sub{ vertical-align:text-bottom; }
        legend { color:#000; }
        fieldset, img { border:0; }
        button, input, select, textarea { font-size:100%; } table { border-collapse:collapse; border-spacing:0; }
```

## 6.CSS3新增伪类举例

```
p:first-of-type   选择属于其父元素的首个 <p> 元素的每个 <p> 元素；
p:last-of-type   选择属于其父元素的最后 <p> 元素的每个 <p> 元素；
p:only-of-type  选择属于其父元素唯一的 <p> 元素的每个 <p> 元素；
p:only-child    选择属于其父元素的唯一子元素的每个 <p> 元素；
:enabled  :disabled 控制表单控件的禁用状态；
:checked   单选框或复选框被选中
```

## 7.position的值, relative和absolute分别是相对于谁进行定位的?

relative（相对定位）的定位原点是以自己本省原来所在位置做为原点的.原来所在位置就是不设置任何position按照正常文档流排列，该出现的那个位置.

absolute（绝对定位）的定位原点是离自己这一级元素最近的一级position设置为absolute或者relative的父元素的左上角为原点的，（当然，如果自己的所有父元素都没有设置position，那么就以body为定位原点）

static就是position的默认值，一般不设置position属性时，会按照正常的文档流进行排列

fixed生成绝对定位的元素，相对于浏览器窗口进行定位。

inherit规定应该从父元素继承 position 属性的值。

```
static 为大众型，即正常的文档流，每个元素都有一个默认的 position:static 属性；
relative 是成熟稳重型，做什么事都规规矩矩，按照其领导（父容器）的意思按部就班；
absolute 是叛逆型，行踪不定，脾气古怪，但只要他的领导（父容器）是成熟稳重的relative，他就乖乖听话了。
```

> relative:并不脱离文档流，不管你怎么移动，它原有的位置还是会留着

> absolute,fixed:脱离文档流

## 8.display:inline-block 什么时候会显示间隙

通常情况下，多个连续的空白符会合并成一个空白符，而产生"空白间隙"的真正原因就是这个让我们并不怎么注意的空白符.

空白符也是字符，只要是字符就会联想到字体，字体大小之类的。所以去除空白符的存在只需要设置字体大小为零就行了（font-size:0;）

移除空格，使用margin 负值、使用 font-size:0、letter-spacing 、word-spacing
