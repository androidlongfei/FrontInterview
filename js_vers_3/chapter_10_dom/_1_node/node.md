# Node 类型

js中所有节点类型都继承自Node类型，因此所有节点类型都共享相同的基本属性和方法。

## 节点的属性(attr)

- nodeType
- nodeName
- nodeValue

### nodeType

每个节点都有一个nodeType属性，表示节点的类型。

```
nodeType=1 或者 Node.ELEMENY_NODE 代表元素节点
nodeType=3 或者 Node.TEXT_NODE 代表文本节点
```

例如:

```javascript
if(someNode.nodeType == Node.ELEMENT_NODE){
    // 代表元素节点
}
```

不过，由于IE没有公开Node类型的构造函数，因此上面代码在IE中会导致错误。

兼容写法如下:

```javascript
if(someNode.nodeType == 1){ // 适用于所有浏览器
    // 代表元素节点
}
```

### nodeName 和 nodeValue

nodeName和nodeValue完全取决于节点类型.

在元素节点中，nodeName的值是元素节点的标签名，而nodeValue为空;

在文本节点中，nodeName的值是#text，而nodeValue是文本节点的内容;

```javascript
// <p id="test">测试<p>
var pNode =  document.getElementById('test')
if(pNode.nodeType == 1){
    console.log('元素节点:',pNode.nodeName, pNode.nodeValue) // 输出 p null
}
var textNode = pNode.childNodes[0]
if(pNode.nodeType == 3){
    console.log('文本节点:', textNode.nodeType, textNode.nodeName, textNode.nodeValue) // 输出 3 #text 测试
}
```

## 节点的关系

文本中所有节点都存在着这样活那样的关系。

### 1.childNodes和NodeList

每个节点都有一个childNodes属性，其中保存着一个NodeList对象。NodeList是一种数组对象，用于保存一种有序的节点，可以通过位置来访问节点，**但它并不是Array的实例**。

注意:NodeList是有生命、有呼吸的对象，它是动态的。

参考HTML:

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
console.log(typeof pNode.childNodes) //  输出object
```

以上代码说明nodeChilds不是一个数组而是对象.

将nodeList转化为数组:

```javascript
var pNode = document.getElementById('up');
console.log('nodelist', converToArray(pNode.childNodes))
// 输出 [text, li, text, li, text, li, text, li, text]
// 空白字符也是文本节点

function converToArray(nodes) {
    var array = []
    for (var i = 0; i < nodes.length; i++) {
        // var itemNode = nodes[i]
        var itemNode = nodes.item(i)
        // 方括号和item()都可以获取指定位置的节点
        array.push(nodes[i])
    }
    return array
}
```

### 父节点与子节点

每个节点都有parentNode属性，改属性指向文档树中的父节点。包含在childNodes列表中的节点都具有相同的父节点，因此它们的parentNode属性都指向同一节点。

注意：并不是所有节点都有子节点，比如文本节点就没有子节点，但它有childNodes属性，只不过对应的NodeList对象的length为0.

### 操作节点

appendChild()用于向childNodes列表的末尾添加一个节点

```javascript
var returnNode = someNode.appendChild(newNode)
console.log(returnNode == newNode) //  输出 true
console.log(returnNode == someNode.lastChild) // 输出true
```

replaceChild()用于替换节点

```javascript
// 替换第一个节点
var returnNode = someNode.replaceChild(newNode, someNode.firstChild)
```

removeChild()用于移除节点

```javascript
// 移除第一个节点
var returnNode = someNode.removeChild(someNode.firstChild)
```

cloneNode()用于克隆节点,此方法接受一个boolean值的参数，在参数为false的情况下，执行浅拷贝，只复制节点本身。在参数为true情况下，执行深复制，也就是复制节点及其整个节点树.
