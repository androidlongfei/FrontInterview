# Text类型

文本节点由Text类型表示，包含的纯文本。纯文本可以包含转义后的HTML字符，但不能包含HTML.

```
nodeType的值为:3

ndoeName的值为:#text

nodeValue的值为:节点包含的文本

parentNode: 为一个Element节点

不支持（没有）子节点
```

可以通过nodeValue属性或data访问Text节点包含的文本。

默认情况下，每个可以包含内容的元素最多只能有一个文本节点，而且必须确实有内容存在。

```html
<!-- 没有内容，也就没有文本节点 -->
<div class=""></div>
<!-- 有空格，因而有一个文本节点 -->
<div class=""> </div>
<!-- 有内容，因而有一个文本节点 -->
<div class="">hello world</div>
```

```javascript
// <div id="myDiv" class="bd" title="body text">hello world</div>
var div = document.getElementById("myDiv")
var textNode = div.firstChild;
console.log(textNode.nodeType, textNode.nodeName, textNode.nodeValue) // 输出 3 "#text" "hello world"
// 修改文本节点内容
textNode.nodeValue = "修改啦"
```

在修改文本节点时还要注意，此时的字符串会经过HTML编码，换句话说，小于号、大于号会被转义,。

```javascript
// 小于号和大于号会被转义成对应的纯文本
textNode.nodeValue = "Some<strong>other</strong>message"
```

## 创建文本节点

可以使用document.createTextNode()创建新文本节点，这个方法接受一个参数---要插入节点中的文本。

创建div元素节点，并添加文本子节点

```javascript
var div = document.createElement("div")
div.className = "bd"
var textNode = document.createTextNode("测试")
div.appendChild(textNode)
document.body.appendChild(div)
```
