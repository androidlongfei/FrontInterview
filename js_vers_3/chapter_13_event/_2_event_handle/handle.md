# 事件处理程序

事件就是用户或浏览器自身执行的某种动作。诸如click,mouseover,都是事件的名字。

而响应某个事件的函数就叫`事件处理程序`。事件处理程序的名字以`on`开头，因此click事件的事件处理程序就是onclick.

- HTML事件处理程序

## 1.HTML事件处理程序

某个元素支持的每种事件，都可以使用一个与相应事件处理程序同名的HTML特性来指定。

```html
<body>
    <div id="myDiv" style="cursor:pointer;" onclick="handleClick(event)">点击我</div>
</body>
```

```javascript
function handleClick(event) {
    // event 是目标事件
    // event.target 是目标元素
    // this 是window对象
    console.log(event.type) // click
    console.log(event.target.innerHTML) // 点击我
}
```

> `event` 是目标事件

> `event.target` 是目标元素

> `this` 是window对象

## 2.DOM0级事件处理程序

通过JavaScript指定事件处理程序的传统方式，就是`将一个函数赋值给一个事件处理程序属性`。

这种事件处理处理程序赋值的方式是在`第四代Web浏览器`中出现的，至今为所有现代浏览器所支持。原因一是简单，二是具有跨浏览器的优势。

1.增加事件处理程序

```html
<body>
    <div id="myDiv" style="cursor:pointer;">点击我</div>
</body>
```

```javascript
var myDiv = document.getElementById('myDiv')
myDiv.onclick = function (event) {
    // event 是目标事件
    // event.target 目标元素
    // this 是目标元素
    console.log(event.type) // click
    console.log(event.target == this) // true
    console.log(event.target.innerHTML) // 点击我
}
```

> `event` 是目标事件

> `event.target` 是目标元素

> `this` 是目标元素

2.删除事件处理程序

```javascript
myDiv.onclick = null // 删除事件处理程序
```

## 3.DOM2级事件处理程序

`DOM2级事件`定义了两个方法，用于处理指定和删除事件处理程序的操作:addEventListenner()和removeEventListener().

所有DOM节点都包含这两个方法，并且它们都接受3个参数：

```
1.要处理事件名
2.作为事件处理程序的函数
3.boolean
```

> 如果最后一个参数是`true`,表示在捕获阶段调用事件处理程序;若为`false`,表示在冒泡阶段调用事件处理程序。

```html
<div id="myDiv" style="cursor:pointer;">点击我</div>
```

```javascript
var myDiv = document.getElementById('myDiv')
// false 将事件处理函数添加到事件流的冒泡阶段
myDiv.addEventListener('click', function (event) {
    console.log(event.type) // click
    console.log(event.target == this) // true
    console.log(event.target.innerHTML) // 点击我
}, false)

myDiv.addEventListener('click', function (event) {
    console.log('hello') // hello
}, false)

// hello最后输出

// 移除点击事件
// myDiv.removeEventListener()
```

> `event` 是目标事件

> `event.target` 是目标元素

> `this` 是目标元素

> `addEventListener` 能添加多个相同的事件处理函数

大多数情况下，都是将事件处理函数添加到`事件流的冒泡阶段`，这样可以最大限度地兼容各种浏览器。

```
IE9和其它浏览器都支持DOM2级事件处理程序
```

## 4.IE事件处理程序

IE实现了与DOM类似的两个方法:attachEvent()和detachEvent()。由于IE8及更早版本只支持，所以attachEvent添加的事件处理程序都会被添加到冒泡阶段。

在IE中使用attachEvent()与使用DOM0级方法的主要区别在于事件处理程序的作用域。

在DOM0级方法的情况下，事件处理程序会在其所属元素的作用域内运行；在使用attachEvent()情况下 ，事件处理程序会在全局作用域中运行，因此this等价于window.

```
支持IE事件处理程序的浏览器有IE和Opera
```
