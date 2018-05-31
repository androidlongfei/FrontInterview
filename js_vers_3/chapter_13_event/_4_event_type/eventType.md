# 事件类型

Web浏览器中可能发生的事件有很多类型。如前所述，不同的事件类型具有不同的信息，而DOM3规定了一下几类事件。

- UI事件，当用户与页面上的元素交互时触发
- 焦点事件，当元素获得或失去焦点时触发
- 鼠标事件，当用户通过鼠标在页面上执行操作时触发
- 文本事件，当文档中输入文本时触发
- 键盘事件，当用户通过键盘在页面上执行操作时触发

DOM3级事件在DOM2基础上重新定义了这些事件，也添加了一些新事件。

## 1.UI事件

UI事件是指那些不一定与用户操作有关的事件。这些事件今年在DOM规范出现之前，都是以这种或那种形式存在的，而DOM规范中保留了向后兼容。

- load: 当页面完全加载后在window上面触发。
- unload: 当页面完全卸载后在window上面触发。
- error: 当发生javascript错误时在window上面触发。
- select: 当用户选择文本框中的一个或者多个字符是触发。
- resize: 当窗口的大小变化时，在window上面触发。
- scroll: 当用户滚动带滚动条的元素中的内容时，在该元素上面触发。

```html
<style media="screen">
    body {
        height: 1000px;
    }

    #myDiv {
        height: 50px;
        border: 1px solid red;
    }

    #scr {
        width: 300px;
        height: 100px;
        margin-top: 20px;
        border: 1px solid red;
        overflow-y: scroll;
    }

</style>
<body>
    <div id="myDiv" style="cursor:pointer;">点击我,width:50px;</div>

    <div id="scr">
        Web浏览器中可能发生的事件有很多类型。
    </div>
</body>
```

```javascript
// 页面加载完成时触发
window.onload = function (event) {
    console.log('页面加载完...', event)
}
// 窗口宽高改变时触发
window.onresize = function (event) {
    // event.target.innerWidth 窗口的宽
    // event.target.innerHeight 窗口的高
    console.log('窗口变化...', event.target.innerWidth, event.target.innerHeight)
}
// 窗口滚动，默认监听body元素
window.onscroll = function (event) {
    console.log('body滚动', event.target.documentElement.scrollTop)
}
// 元素滚动，监听div元素
var divScr = document.getElementById('scr')
divScr.onscroll = function (event) {
    console.log('div滚动,scrollTop值:', event.target.scrollTop)
}
```

## 2.焦点事件

焦点事件会在页面元素获得或失去焦点时触发。焦点事件如下:

- blur : 在元素失去焦点时触发。这个事件不会冒泡。所有浏览器都支持它。
- focus : 在元素获得焦点时触发。这个事件不会冒泡。所有浏览器都支持它。
- focusin : 在元素获取焦点时触发。这个事件会冒泡，与focus等价。IE5+与其它浏览器都支持。
- focusout : 在元素失去焦点时触发。这个事件会冒泡，与blur等价。IE5+与其它浏览器都支持。

这一类事件中最主要的两个是`blur`和`focus`,它们都是javascript早期就得到所有浏览器支持的事件。

当焦点从页面中的一个元素移动到另个一个元素，会依次触发下列事件:

```
(1) focusout 在失去焦点的元素上触发
(2) focusin 在获得焦点的元素上触发
(3) blur 在失去焦点的元素上触发
(4) focus 在获得焦点的元素上触发
```

备注：即使focus和blur不会冒泡，也可以在捕获阶段监听到它们。

```html
<form>
    姓名:<input type="text" name="name" value="哈哈" id="myInputName" /> 地址:
    <input type="text" name="address" value="" id="myInputAddress" />
</form>
```

```javascript
var myInputName = document.getElementById("myInputName")
var myInputAddress = document.getElementById("myInputAddress")
// 获得焦点, 不能冒泡
myInputName.onfocus = function (event) {
    console.log('myInputName---获得焦点:', event.bubbles, event.target.value) // bubbles false
}
// 失去焦点, 不能冒泡
myInputName.onblur = function (event) {
    console.log('myInputName--失去焦点:', event.bubbles, event.target.value) // bubbles false
}
// 获得焦点, 可以冒泡
myInputAddress.addEventListener('focusin', function (event) {
    console.log('myInputAddress---获得焦点:', event.bubbles, event.target.value) // bubbles true
}, false)
// 失去焦点, 可以冒泡
myInputAddress.addEventListener('focusout', function (event) {
    console.log('myInputAddress---失去焦点:', event.bubbles, event.target.value) // bubbles true
}, false)
```

## 3.鼠标事件

鼠标事件是Web开发中最常用的一类事件。DOM3级事件定义了9个鼠标事件，如下:

- click : 在用户单击主鼠标按钮或者按下回车键时触发。
- dblclick : 用户双击鼠标时触发。
- mousedown : 用户按下鼠标按钮时触发。
- mouseenter : 鼠标光标从元素外部首次移动到元素范围之内时触发。这个事件不冒泡，而且在光标移动到后代元素上不会触发。
- mouseleave : 在位于元素上方的鼠标光标移动到元素范围之外时触发。这个事件不冒泡，而且在光标移动到后代元素上不会触发。
- mousemove : 当鼠标指针在元素内部移动时重复的触发。
- mouseout : 在位于元素上方的鼠标光标移动到元素范围之外时触发.这个事件冒泡,子元素会影响父元素。
- mouseover : 鼠标光标从元素外部首次移动到元素范围之内时触发。这个事件冒泡,子元素会影响父元素。
- mouseup : 用户释放鼠标按钮时触发。

页面上的所有元素都支持鼠标事件。除了mouseenter和mouseleave,所有鼠标事件都会冒泡，也可以被取消。

只有在同一个元素上相继触发mousedown和mouseup事件，才会触发click事件。 如果mousedown或mouseup中的一个被取消，就不会触发click事件。

mousedown,mouseup,click,dbclick事件触发顺序如下:

1. mousedown
2. mouseup
3. click
4. mousedown
5. mouseup
6. click
7. dblclick

显然，click和dbclick事件都会依赖于其他先行事件的触发。

```html
<style media="screen">
    .sub {
        width: 200px;
        height: 200px;
        border: 1px solid #aaa;
        margin-top: 20px;
    }

    .item {
        width: 100px;
        height: 100px;
        border: 1px solid #aaa;
        margin-top: 20px;
    }

    .mouseenter {
        color: red;
    }

</style>
<body>
    <div class="sub" id="div1">
        点击我
    </div>

    <div class="sub" id="div3">
        鼠标移入mouseenter和mouseleave
        <div id="div3Item" class="item">
            子元素
        </div>
    </div>

    <div class="sub" id="div4">
        鼠标移入mouseenter和mouseleave
        <div id="div4Item" class="item">
            子元素
        </div>
    </div>
</body>
```

mousedown,mouseup,click,dblclick示例

```javascript
var div1 = document.getElementById("div1")
//  按下鼠标
div1.addEventListener('mousedown', function (event) {
    console.log('div1---mousedown:', event.bubbles, event.type) // bubbles true
}, false)
// 释放鼠标
div1.addEventListener('mouseup', function (event) {
    console.log('div1---mouseup:', event.bubbles, event.type) // bubbles true
}, false)
// 释放点击
div1.addEventListener('click', function (event) {
    console.log('div1---click:', event.bubbles, event.type) // bubbles true
}, false)
div1.addEventListener('dblclick', function (event) {
    console.log('div1---dblclick:', event.bubbles, event.type) // bubbles true
}, false)
```

mouseenter,mouseleave示例

```javascript
var div3 = document.getElementById("div3")
var div3Item = document.getElementById("div3Item")
//  按下移入元素
div3.addEventListener('mouseenter', function (event) {
    console.log('div3---mouseenter:', event.bubbles, event.type) // bubbles false
    event.target.style.color = 'red'
}, false)
// 鼠标移出元素
div3.addEventListener('mouseleave', function (event) {
    console.log('div3---mouseleave:', event.bubbles, event.type) // bubbles false
    event.target.style.color = '#000'
}, false)
//  按下移入元素
div3Item.addEventListener('mouseenter', function (event) {
    console.log('div3Item---mouseenter:', event.bubbles, event.type) // bubbles false
    event.target.style.color = 'blue'
}, false)
// 鼠标移出元素
div3Item.addEventListener('mouseleave', function (event) {
    console.log('div3Item---mouseleave:', event.bubbles, event.type) // bubbles false
    event.target.style.color = '#000'
}, false)
```

> 由此可见div3Item的mouseleave和mouseenter不会冒泡，所以div3不会受div3Item的影响

mouseover,mouseout示例

```javascript
var div4 = document.getElementById("div4")
var div4Item = document.getElementById("div4Item")
// 鼠标移入元素时触发(冒泡)
div4.addEventListener('mouseover', function (event) {
    console.log('div4---mouseover:', event.bubbles, event.type) // bubbles true
    event.target.style.color = 'red'
}, false)
//  鼠标移出元素时触发(冒泡)
div4.addEventListener('mouseout', function (event) {
    console.log('div4---mouseout:', event.bubbles, event.type) // bubbles true
    event.target.style.color = '#000'
}, false)
//  鼠标移入元素时触发(冒泡)
div4Item.addEventListener('mouseover', function (event) {
    console.log('div4Item---mouseover:', event.bubbles, event.type) // bubbles true
    event.target.style.color = 'blue'
}, false)
// 鼠标移出元素时触发(冒泡)
div4Item.addEventListener('mouseout', function (event) {
    console.log('div4Item---mouseout:', event.bubbles, event.type) // bubbles true
    event.target.style.color = '#000'
}, false)
```

> 由此可见div4Item的mouseleave和mouseenter会冒泡，所以div4会受div4Item的影响
