# CSS样式问题

## HTML 无法识别换行符

问题描述:在HTML标签中换行符`\n`不起作用。

解决方式如下:

1.使用`<pre>`标签包裹文字即可。pre 元素可定义预格式化的文本。被包围在 pre 元素中的文本通常会保留空格和换行符。而文本也会呈现为等宽字体。

示例如下:

```html
<div>
    <pre>{{data}}</pre>
</div>
```

2.使用CSS中由`white-space`属性.

值        | 描述
-------- | :-----------------------------------
normal   | 默认。空白会被浏览器忽略。
pre      | 空白会被浏览器保留。其行为方式类似HTML中的 `<pre>` 标签。
nowrap   | 文本不会换行，文本会在在同一行上继续，直到遇到 `<br>` 标签为止。
pre-wrap | 保留空白符序列，但是正常地进行换行。
pre-line | 合并空白符序列，但是保留换行符。
inherit  | 规定应该从父元素继承 white-space 属性的值。

示例如下:

```html
<div style="white-space:pre-line;">
    {{data}}
</div>
```

> 其中data是包含换行符的字符串

推荐使用第二种.

## 强制换行

- word-wrap
- word-break

**word-wrap属性**

用来标明是否允许浏览器在单词内进行断句，这是为了防止当一个字符串太长而找不到它的自然断句点时产生溢出现象。

**word-break属性**

用来标明怎么样进行单词内的断句.

`word-wrap:break-word`与`word-break:break-all`共同点是都能把长单词强行断句;

不同点是`word-wrap:break-word`会首先起一个新行来放置长单词，新的行还是放不下这个长单词则会对长单词进行强制断句；

而`word-break:break-all`则不会把长单词放在一个新行里，当这一行放不下的时候就直接强制断句了
