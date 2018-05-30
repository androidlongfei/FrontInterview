# 样式

任何支持style特性的HTML元素在JavaScript中都有一个对应的style属性。这个style对象是CSSStyleDeclaration的实例。

在style特性中指定的任何CSS属性都将表现为这个style对象的相应舒缓型。对于使用短划线（分割不同的词汇，例如background-image）的CSS属性名， 必须将其转化成驼峰大小写形式（如backgroundImage)，才能通过JavaScript来访问。

多数情况下，都可以通过简单地转化属性名的格式来实现。其中一个不能直接转化的CSS属性就是float,因为它是JavaScript的保留字，因此不能用作属性名。

IE用styleFloat代替float,其它浏览器用cssFloat代替。

例子如下:

```javascript
// <div id="myDiv">test</div>

var myDiv = document.getElementById('myDiv')
myDiv.style.width = '200px'
myDiv.style.height = '200px'
myDiv.style.backgroundColor = "red"
console.log('style', myDiv.style)
```

在标准模式下，所有度量值都必须指定一个度量单位。
