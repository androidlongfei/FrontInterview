# 选择符

Selectors 是有W3C发起定制的一个标准，致力于让浏览器原生支持CSS查询。

Selectors的核心是两个方法：querySelector()和querySelectorAll()。在兼容的浏览器中，可以通过Document及Element类型的实例调用它们。

目前完全支持浏览器有`IE8+`,Chrome,火狐等。

## querySelector()方法

querySelector()方法接受一个CSS选择符，返回与该模式匹配的`第一个元素`。如果没有找到匹配的元素，返回null。

例子如下：

```html
<body>
    <p id="test" class="p-test">测试</p>
    <div id="myDiv">
        <p class="mp">呵呵</p>
    </div>
</body>
```

```javascript
var pNode = document.getElementById('test');
var ip = document.querySelector('#test');
var cp = document.querySelector('.p-test');
console.log(ip == pNode, cp == pNode) // true true

var mp = document.querySelector('#myDiv .mp')
console.log(mp.className) // "mp"

var myDiv = document.querySelector('#myDiv')
var mp1 = myDiv.querySelector('.mp')
console.log(mp1.className) // "mp"
```

通过document类型调用querySelector()方法时，会在文档元素的范围内查找匹配的元素。而通过Element类型调用querySelector()方法时，只会在该元素后代元素的范围内查找匹配的元素.

## querySelectorAll()方法

querySelectorAll()方法接受的参数与querySelector()方法一样，都是一个CSS选择符，但返回的是`所有匹配的元素`而不仅仅是一个元素.这个方法返回的是一个NodeList的实例。

具体来说，返回的值实际上是带有所有属性和方法的NodeList,而其底层实现则类似于`一组元素的快照`，而非不断对文档进行搜索的动态查询。这样可以避免使用NodeList对象通常引起的大多数性能问题。

如果没有找到匹配的元素，NodeList就是空的。

例子如下:

```html
<ul id="mul">
    <li class="mli">t1</li>
    <li class="mli">t2</li>
    <li class="mli">t3</li>
    <li class="mli">t4</li>
</ul>
```

```javascript
var lis = document.getElementsByTagName('li');
var ul = document.querySelector('#mul');
var lis1 = document.querySelectorAll('.mli');
console.log(lis)
console.log(lis1)
console.log(ul.childNodes[1].textContent) // t1
console.log(lis[0].textContent) // t1
console.log(lis1[0].textContent) // t1
```

## 元素遍历

对于元素间的空格，IE9及之前的版本不会返回文本节点，而其他所有浏览器都会返回文本节点。这样就导致了在使用childNodes和firstChild等属性行为不一致。

为了弥补这一差异，而痛死又保持DOM规范不变，新定义了一组属性。

```
childElemntCount:返回子元素（不包含文本节点和注释）的个数
firstElementChild:指向第一个子元素
lastElementChild:指向最后一个子元素
```
