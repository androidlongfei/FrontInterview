# nodeList介绍

NodeList,NamedNodeMap,HTMLCollection这三个集合都是"动态的"；换句话说，每当文档结构发生变化时，它们都会更新。因此，它们始终都会保存着最新、最准确的信息。

从本质上说，所有NodeList对象都是在访问DOM文档是`实时`运行的查询。

以下代码为无限循环：

```javascript
var divs = document.getElementsByTagName('div')
for(var i=0; i<divs.length; i++){
    var div = document.createElement('div')
    document.body.appendChild(div)
}
```

因为`divs.length`会重新查询一次html中的div元素集合，导致它的值一直在变

修改如下:

```javascript
var divs = document.getElementsByTagName('div')
var len = divs.length
for(var i=0; i<len; i++){
    var div = document.createElement('div')
    document.body.appendChild(div)
}
```

一般来说，应该尽量减少访问NodeList的次数，因为每次访问NodeList，都会运行一次基于文档的查询。所以，可以考虑将从NodeList中取得值缓存起来.
