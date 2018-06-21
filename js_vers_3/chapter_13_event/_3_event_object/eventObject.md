# 事件对象

在触发DOM上的事件时，会产生一个事件对象event,这个对象包含所有与事件有关的信息。包括导致事件的的元素、事件的类型以及其他与特定事件相关的信息。

- DOM中的事件对象
- IE中的事件对象

## DOM中的事件对象

兼容DOM的浏览器会将一个event对象传入到事件处理程序中。无论指定事件事件处理程序时使用么方法(DOM0或DOM2).

event对象包含的的属性与方法如下:

`属性/方法`         | 类型       | 读写 | 说明
--------------- | :------- | -- | :---------------------------------------
bubbles         | Boolean  | 只读 | 表明事件是否冒泡。
cancelable      | Boolean  | 只读 | 表明是否可以取消事件的默认行为。
defaultPrevent  | Boolean  | 只读 | 为true表示已经调用了`preventDefault()`,在DOM3中新增。
preventDefault  | Function | 只读 | 取消事件的默认行为。如果cancelable是true,则可以使用这个方法。
stopPropagation | Function | 只读 | 取消事件的进一步捕获或冒泡。如果bubbles是true,则可以使用这个方法。
target          | Element  | 只读 | 事件的目标。
type            | String   | 只读 | 被触发的事件的类型。

备注: 要阻止特定事件的默认行为可以使用preventDefault()。例如，链接的默认行为就是在被单击时会导航到其href特性指定的URL.如果想阻止这一默认行为，那么通过链接的onclick事件处理程序可以取消它。

```javascript
var link = document.getElementById('myLink')
link.onclick = function (event) {
    // 只有 event.cancleable的值为true时，下面方法
    event.preventDefault();
}
```

阻止事件冒泡使用stopPropagation()

```javascript
var btn = document.getElementById(myBtn)
btn.onclick = function(event){
    console.log('btn click ... ')
    // 阻止事件冒泡
    event.stopPropagation()
}

document.body.onclick = function(event){
    console.log('body click ... ')
}
```

> 以上`body`的点击事件不会被调用。

所有属性的示例如下:

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
    // bubbles 是否冒泡
    // cancelable 是否可以取消事件默认行为
    console.log('-------------div click event---------------')
    console.log('myDiv', event) // 事件对象
    console.log('事件是否冒泡event.bubbles', event.bubbles) // true 是冒泡
    console.log('是否可以取消事件的默认行为event.cancelable', event.cancelable) // true 可以取消事件的默认行为
    event.bubbles = false // 无用，因为该属性只读，无法修改
    event.cancelable = false // 无用，因为该属性只读，无法修改
    console.log('是否调用了preventDefault()', event.defaultPrevented) // false 没有调用 (该属性也是只是可读的)
    console.log('调用preventDefault()')
    event.preventDefault() // 取消事件的默认行为
    console.log('是否是否调用了event.preventDefault()', event.defaultPrevented) // true 已经调用
    console.log('调用event.stopPropagation()阻止事件冒泡')
    // event.stopPropagation() // 阻止事件冒泡，如果event.bubbles为true则可以使用这个方法。注意:使用这个方法后body就收不到点击事件了。
    console.log('myDiv this==target', event.target == this, this.innerHTML) // true 点击我
}

document.body.onclick = function (event) {
    console.log('-------------body click event---------------')
    console.log('body', event) // click
    console.log('body this==target', event.target == this, event.target.innerHTML) // false 点击我 。注意:event.target是目标元素(div)，而this是当前元素(body)
}
```

备注:只有在事件处理程序执行期间，event对象才会存在，一旦事件处理程序执行完成，event对象就会被销毁。

## IE中的事件对象

IE事件对象通过以下方式获取:

```javascript
var btn = document.getElementById(myBtn)

// 在DOM1事件处理程序中获取event
btn.onclick = function(){
    var event = window.event
    console.log(event)
}

// 在attachEvent中,event会传递进来
btn.attachEvent('onclick',function(event){
    console.log(event)
})
```
