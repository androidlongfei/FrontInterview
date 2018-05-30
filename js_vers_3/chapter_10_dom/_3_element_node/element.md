# Element类型

Element类型用于表现XML或HTML，提供了元素标签名、子节点、及特性的访问。

Element节点具有以下特征:

```
nodeType的值为:1

ndoeName的值为:元素的标签名

nodeValue的值为:null

parentNode的值可能是:Document或Element

其子节点可能是：Element、Text、Comment
```

要访问元素的标签名，可以用nodeName属性，也可以用tagName属性；这两个属性返回相同的值，后者可读性更好一些。

```javascript
var div = document.getElementById("myDiv")
console.log(div.tagName) // "DIV"
console.log(div.nodeName == div.tagName) // true
```

tagName输出的是"DIV"而不是"div",最好在比较之前将标签名转化为相同的大小:

```javascript
if(element.tagName.toLowerCase() == 'div'){

}
```

## 1.HTML元素

所有的HTNL元素都由HTMLElement类型表示，不是直接通过这个类型，也是通过它的子类型来表示。

HTMLElementle类型直接继承自Element并添加了一些属性。添加的这些属性分别应用于每个HTML元素。

```
id : 元素在文档中的唯一标识符

title : 有关元素的附加说明信息，一般通过工具条显示出来

className : 为元素指定的CSS类，没有将这个属性命名为class，因为class是es的保留字
```

```javascript
// <div id="myDiv" class="bd" title="body text"></div>
var div = document.getElementById("myDiv")
console.log(div.nodeType, div.nodeName, div.tagName, div.nodeValue) // 1 "DIV" "DIV" null
console.log(div.id, div.title, div.className) // "myDiv" "body text" "bd"
```

## 2.获取属性

每个元素都有一个或多个属性，这些属性的用途是给出相应或其内容的附加信息。

操作属性的DOM方法有三个：getAttribute(),setAttribute(),removeAttribute()

```javascript
// <div id="myDiv" class="bd" title="body text"></div>
var div = document.getElementById("myDiv")
console.log(div.getAttribute('id')) // myDiv
console.log(div.getAttribute('class')) // bd
```

需要注意的是传递给getAttribute()的属性名与实际属性名要相同，因此要想得到class属性值，应该传入"class"而不是"className", 后者只能通过对象属性访问时才用。如果给定的属性名不存在则返回null.

当然也可以通过getAttribute()获取自定义属性。

属性的名称是不区分大小写的，即"ID"和id代表的都是同一个属性。

```javascript
// 设置属性
div.setAttribute('class','te')
// 移除属性
div.removeAttribute('id')
```

## 3.attributes属性

Element类型是使用attributes属性的唯一一个DOM节点类型。

attributes属性中包含一个NameNodeMap，与NodeList类似，也是一个"动态"的集合，每一个子项都是一个属性节点。

主要作用是遍历元素属性.

```javascript
// <div id="myDiv" class="bd" title="body text"></div>
var div = document.getElementById("myDiv")
var divAttrs = div.attributes
console.log('divAttrs', divAttrs) // NamedNodeMap {0: id, 1: class, 2: title, id: id, class: class, title: title, length: 3}
for (var i = 0; i < divAttrs.length; i++) {
    var attr = divAttrs[i]
    console.log(attr.nodeType, attr.nodeName, attr.nodeValue) // 2 id myDiv
}
```

## 4.创建元素

使用document.createElement()方法可以创建新元素。这个方法只接受一个参数，即要创建元素的标签名，这个标签名不区分大小写。

第一种动态创建标签

```javascript
var div = document.getElementById("myDiv")
var mDiv = document.createElement("div")
mDiv.id = 'test'
mDiv.setAttribute('class', 'bd')
console.log(mDiv)
div.appendChild(mDiv)
```

第二种直接在createElement()中传入完整地HTMl标签，`只在IE中有用`

```javascript
var div1 = document.createElement("<div id=\"test1\" class=\"bd\">kdd</div>")
div.appendChild(div1)
```

## 5.元素的子节点

元素可以有任意数目的子节点和后代节点，因为元素可以是其他元素的子节点。元素的childNodes属性中包含它的所有子节点，这些子节点可能是 元素、文本节点、注释或处理指令。

不同的浏览器看待子节点显著不同，`IE不会将空白字符当成子节点`，而其他浏览器会`将空白字符当成文本节点`，所以遍历节点时，一定要判断节点的nodeType.

```html
<ul id="up">
    <li>t1</li>
    <li>t2</li>
    <li>t3</li>
    <li>t4</li>
</ul>
```

```javascript
var pNode = document.getElementById('up');
console.log(pNode.childNodes)
// 非IE输出 [text, li, text, li, text, li, text, li, text]
// IE输出[li, li, li, li]
```
