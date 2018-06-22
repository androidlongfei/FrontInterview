# jQuery中的事件

- 加载DOM
- 事件绑定
- 事件对象
- 移除绑定的事件和模拟事件

## 1.加载DOM

jQuery使用`$(docuemnt).ready()`方法替代传统的`window.onload`方法。

```javascript
$(docuemnt).ready(function(){
    // todo
})
```

简写如下:

```javascript
$(function(){

})
```

由于在`$(docuemnt).ready()`方法内注册的事件，只要DOM就绪就会被执行，因此可能此时元素的关联文件未下载完。若元素关联的图片没下载完，那么图片的高度和宽属性此时不一定有效。要解决这种问题需要使用jQuery的load()方法。

```javascript
$(window).load(function(){
    // 此时所有元素已经下载完
})
```

等价于

```javascript
window.onload = function(){
    // 此时所有元素已经下载完
}
```

备注:`$(docuemnt).ready()`和`$(window).load()`可以按序执行多次，而`window.onload`只会执行最后的一次。

demo执行顺序如下：

```text
ready...1  -> ready...2  -> load...1 -> load...2 -> onload...2
```

## 2.事件绑定

在文档加载完毕后，可以使用bind()方法来对匹配元素进行特定事件的绑定。

bind()方法的格式如下:

```javascript
bind('event name', eventData, function(event) {});
```

第一个参数是事件的类型，包括：

```text
blur focus
click dblclick mousedown moudeup mousemove mouseover mouseout mouseenter mouseleave
change select submit
keydown keypress keyup
resize、scroll unload error等，也可以自定义名称。
```

第二个参数为可选，作为event.data属性值传递给事件对象的额外数据对象。

第三个则是用来绑定的处理函数

注意：jQuery中的事件绑定类型比普通的JavaScript事件绑定类型少了`on`,例如jQuery中的`click()`对应JavaScript中的`onclick()`

```html
<ul>
    <li title="苹果">苹果</li>
    <li title="橘子">橘子</li>
    <li title="菠萝">菠萝</li>
</ul>
```

### 2.1.基本使用

```javascript
// 基本使用
$('li:eq(0)').bind('click', { name: 'haha' }, function (event) {
    console.log($(this).html()) // 苹果
    console.log(event.data) // {name: 'haha'}
})
```

> this引用的是携带相应行为的DOM元素，$(this)是将DOM对象转化为jQuery对象

> event.data就是第二个参数

与ready()方法一样，bind()方法也可以多次调用。

### 2.2.链式调用

```javascript
// 链式调用
$('li:eq(1)').bind('mouseenter', function (event) {
    $(this).css('color', 'red')
}).bind('mouseleave', function (event) {
    $(this).css('color', '#000')
})
```

### 2.3.简写绑定事件

```javascript
// 简写绑定事件
$('li:eq(2)').mouseover(function (event) {
    $(this).css('color', 'blue')
}).mouseout(function (event) {
    $(this).css('color', '#000')
})
```

### 2.4.合成事件

jQuery有两个合成事件,`hover()`和`toggle()`.

**hover合成事件**

hover语法结构如下:

```javascript
hover(enter,leave)
```

```javascript
// hover合成事件事件
$('li:eq(3)').hover(function (event) {
    // 鼠标移入
    $(this).css('color', 'green')
}, function (event) {
    // 鼠标移除
    $(this).css('color', '#000')
})
```

**toggle合成事件**

toggle语法结构如下:

```javascript
toggle(fn1,fn2,fn3...fnN)
```

toggle()方法用于`模拟鼠标连续点击事件`，第一次点击触发fn1,第二次点击触发fn2...第N次点击触发fnN。随后的每次单击都重复对这几个函数的调用。

```javascript
// toggle合成事件
$('li:eq(4)').toggle(function (event) {
    $(this).children('a').show()
}, function (event) {
    $(this).children('a').hide()
})
```

## 3.事件冒泡

在页面上可以有多个事件，也可以多个元素响应同一个事件。

```html
<div id="one">
    <p id="op">原生事件和jQuery事件测试</p>
</div>
```

### 3.1.事件对象

由于IE-DOM和标准DOM实现事件对象的方法各不相同，导致在不同浏览器中获取事件对象变得比较困难。 针对这一问题jQuery做了扩展和封装，使其变得一至。

```javascript
$('p').click(function(event) {
    // event就是事件对象
});
```

```javascript
var p = document.getElementById('op')
p.onclick = function (event) {
    console.log('dom事件对象', event)
}
$('#op').click(function ($event) {
    console.log('jQuery事件对象', $event)
});
```

> jQuery中event包容DOM中的event。$event > event

> $event.originalEvent == event

### 3.2.阻止事件冒泡和默认行为

```javascript
$('#op').click(function (event) {
    event.stopPropagation() // 阻止事件冒泡
    event.preventDefault() // 阻止事件默认人行为
});
```

既阻止事件冒泡又阻止事件默认行为，函数返回false即可。

```javascript
$('#op').click(function (event) {
    // todo
    return false
});
```

### 3.3.事件属性

jQuery在遵循W3C规范的情况下，对事件对象的常用属性进行了封装。

- event.type 事件类型
- event.preventDefault() 阻止默认行为
- event.stopPropagation() 阻止冒泡
- event.target 获取到触发事件的元素
- event.pageX 和 event.pageY 获取到光标相对于页面x坐标和y坐标

## 4.移除事件和模拟事件

移除事件使用unbind()

```javascript
$('p').unbind('click') // 移除点击事件
```

模拟事件使用trigger()

```javascript
$('p').trigger('click') // 模拟点击事件
```

简写如下

```javascript
$('p').click() //  模拟点击事件
```
