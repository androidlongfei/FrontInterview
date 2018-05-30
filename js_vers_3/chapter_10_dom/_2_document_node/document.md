# Document节点

js通过Document类型表示文档。在浏览器中，document对象是HTMLDocument(继承自Document类型)的一个实例，表示整个HTML页面。而且document对象是Window对象的一个属性，因此可以将其作为全局对象来访问。

Document也是一个节点(继承Node),所以也具有如下属性:

```
nodeType的值是:9

nodeName的值是:"#document"

nodeValue的值为:null

parentNode的值为null

其子节点可能是一个DocumentType(最多一个)、Element(最多一个)、Comment
```

## 文档子节点

虽然DOM标准规定Document节点的子节点可以是，DocumentType，Element，、Comment但还有两个内置的访问其子节点的快捷方式：

第一个就是documentElement属性，改属性始终指向HTML页面的`<html>`元素。

第二个就是通过childNodes列表访问文档元素

获取html元素节点

```javascript
console.log(document.nodeType, document.nodeName, document.nodeValue) // 输出 9 #document null
var html = document.documentElement
console.log(html === document.childNodes[1]) // 输出 true
```

获取body元素节点

```javascript
console.log('body', document.body)
```

## 文档信息

```javascript
// 获取文档标题
var orTitile = document.title
// 设置标题
document.title = '新页面'
// 取得URL
var url = document.URL
```

## 查找元素

取得元素的操作可以使用document对象的两个方法来完成：getElementById()和getElementsByTagName()。

`getElementById`接受一个参数，就是元素的ID,如果找到则返回ID对应的元素，否则返回null.需要注意的是ID必须严格匹配包括大小写.

```javascript
// <div id="myDiv">some</div>
var div = document.getElementById('myDiv') // 取得<div>元素的引用
```

需要注意的是：getElementById()只返回文档中`第一次`出现的元素,也就是说定义相同的ID只会返回第一个。

`getElementsByTagName`接受一个参数，就是元素的标签名,而要返回的是包含0个或多个元素的NodeList，在HTML文档中这个方法返回一个HTMLCollection对象，它与NodeList非常相似,可以使用[]和item()来获取对象中的项,可以通过namedItem()获取指定name的项。

```javascript
var lis = document.getElementsByTagName('li')
console.log('lis', typeof lis, lis) //  输出 HTMLCollection
console.log(lis.namedItem('z')) // 输出 <li name="z">t1</li>
```

需要注意的是，在HTML中,传入的标签名不区分大小写。
