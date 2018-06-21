# 事件流

事件流描述的是从页面中接受事件的顺序。

- 事件冒泡
- 事件捕获
- DOM事件流

## 事件冒泡

IE的事件流叫做`事件冒泡`，即使=事件开始由`最具体的元素`（文档中嵌套层次最深的那个节点）接受，然后逐级向上传播到较为`不具体的节点`(文档)。

```html
<body>
    <div id="myDiv" style="cursor:pointer;">点击我</div>
</body>
```

```javascript
var myDiv = document.getElementById('myDiv');

// addEventListener的参数若为fasle,就是监听冒泡阶段(默认是false)

myDiv.addEventListener('click', function () {
    console.log('myDiv的click事件被触发', '--冒泡--1')
}, false);

document.body.addEventListener('click', function () {
    console.log('body的click事件被触发', '--冒泡--2')
}, false);

// 输出顺序是 1 2
```

如果你单击页面中的`div`元素，那么这个事件会按照如下顺序传播:

```
(1) div
(2) body
(3) html
(4)document
```

也就是说click 事件首先在`div`元素上发生，而这个元素就是我们单击的元素，然后，click事件沿`DOM树向上传播`，在每一级节点上都会发生，`直至传播到document对象`。

**所有现代浏览器都支持事件冒泡**。

## 事件捕获

事件捕获的思想是不太具体的节点更早接收到事件，而最具体的节点应该最后接受到事件。事件捕获的用意在于事件到达预定目标之前捕获它。

```html
<body>
    <div id="myDiv" style="cursor:pointer;">点击我</div>
</body>
```

```javascript
var myDiv = document.getElementById('myDiv');

// addEventListener的参数若为true,就是监听捕获阶段(默认是false)

myDiv.addEventListener('click', function () {
    console.log('myDiv的click事件被触发', '--捕获--2')
}, true);

document.body.addEventListener("click", function () {
    console.log('body的click事件被触发', '--捕获--1')
}, true);

// 输出顺序是 1 2
```

以上面例子为示例，那么单击`div`就会以下列顺序出发click事件：

```
(1) document
(2) html
(3) body
(4) div
```

在事件捕获的过程中，document对象首先接受到click事件，然后事件沿着DOM树依次向下，一直传播到事件的时间目标，即`div`元素。

`IE9`和其它浏览器都支持这种事件流模型。

由于老版本的浏览器不支持，因此很少有人用事件捕获。**建议放心的使用事件冒泡，有特殊需求是再使用事件捕获**。

## DOM事件流

`DOM2级事件`规定的事件流包括三个阶段:事件捕获阶段、处于目标阶段、事件冒泡阶段。

首先发生的是事件捕获，为截获事件提供了机会。然后是实际的目标接受事件。最后一个阶段是冒泡阶段，可以在这个阶段对事件作出响应。

在`DOM事件流`中，实际的目标`div`在捕获阶段不会接受到事件。这意味着在捕获阶段，事件从document到html再到body后就停止了。下一个阶段是`处于目标`阶段，于是事件在`div`上发生，并在事件处理中被看成冒泡阶段的一部分。然后，冒泡阶段发生，事件又传播回文档。

```html
<div id="outer">
    <div id="middle">
        <div id="inner">
            click me!
        </div>
    </div>
</div>
```

```javascript
var innerCircle = document.getElementById("inner");
innerCircle.addEventListener("click", function () {
    console.log("innerCircle的click事件在捕获阶段被触发", '--捕获--3')
}, true);
innerCircle.addEventListener("click", function () {
    console.log("innerCircle的click事件在冒泡阶段被触发", '--冒泡--4')
}, false);
var middleCircle = document.getElementById("middle");
middleCircle.addEventListener("click", function () {
    console.log("middleCircle的click事件在捕获阶段被触发", '--捕获--2')
}, true);
middleCircle.addEventListener("click", function () {
    console.log("middleCircle的click事件在冒泡阶段被触发", '--冒泡--5')
}, false);
var outerCircle = document.getElementById("outer");
outerCircle.addEventListener("click", function () {
    console.log("outerCircle的click事件在捕获阶段被触发", '--捕获--1')
}, true);
outerCircle.addEventListener("click", function () {
    console.log("outerCircle的click事件在冒泡阶段被触发", '--冒泡--6')
}, false);

//  输出顺序是 1 2 3 4 5 6
```

结论：

1.尽管`DOM2级事件`标准规范明确规定事件捕获阶段不会涉及事件目标，但是在IE9、Safari、Chrome、Firefox和Opera9.5及更高版本都会在捕获阶段触发事件对象上的事件。结果，`就是有两次机会在目标对象上面操作事件`。

2.并非所有的事件都会经过冒泡阶段 。所有的事件都要经过捕获阶段和处于目标阶段，但是有些事件会跳过冒泡阶段：如，获得输入焦点的focus事件和失去输入焦点的blur事件。
