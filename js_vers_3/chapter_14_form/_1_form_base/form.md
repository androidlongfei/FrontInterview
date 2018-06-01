# 表单

在HTML中，表单是由`<form>`元素来表示的，在JavaScript中，表单对应的则是HTMLFormElement类型。

HTMLFormElement继承了HTMLElement,因而与其他HTML元素具有相同的默认属性。不过,HTMLFormElement也有它自己独有的属性和方法。如下:

- acceptCharset:服务器能处理的字符集；等价于HTML中的accept-charset特性。
- action:接受请求的URL
- elements: 表单中所有控件的集合(HTMLCollection)
- enctype:请求的编码类型
- method:要发送的http请求类型，如'GET'或'POST'
- name:表单的名称
- reset(): 将所有表单域重置为默认值
- submit():提交表单
- target:属性规定在何处打开 action URL。

```html
<form action="http://127.0.0.1:9100/form/submitPersonInfo" id="form1" method="post" name="form1" target="_blank">
    <div>
        年龄:<input type="text" name="age" value="">
    </div>
    <div>性别:<input type="text" name="sex" value=""></div>
    <div><input type="submit" value="提交">
        <input type="reset" value="重置">
    </div>
</form>
```

```javascript
var form1 = document.getElementById('form1')
console.log('form1', form1.elements, form1.elements.length) // 4
form1.addEventListener('submit', function (event) {
    console.log('表单提交事件')
    // event.preventDefault() // 阻止浏览器默认提交事件
    console.log('已阻止表单默认提交事件')
})
form1.addEventListener('reset', function (event) {
    console.log('表单重置事件')
})
```

target属性规定在何处打开actionURL。

值           | 描述
----------- | :------------
`_blank`    | 在新窗口中打开。
`_self`     | 默认。在相同的框架中打开。
`_parent`   | 在父框架集中打开。
`_top`      | 在整个窗口中打开。
`framename` | 在指定的框架中打开。

## 1.表单字段

可以像访问页面中的其他元素一样，使用原生DOM方法访问表单元素。

每个表单都有一个elements属性，该属性是表单中所有表单元素的集合，可以按照index和name特性来访问它们。

```html
<form action="http://127.0.0.1:9100/form/submitPersonInfo" id="form1" method="get" name="form1" target="_blank">
    <div>
        年龄:<input type="text" name="age" value="24岁">
    </div>
    <div>性别:<input type="text" name="sex" value=""></div>
    <div>颜色
        <ul>
            <li><input type="radio" name="color" value="红">红</li>
            <li><input type="radio" name="color" value="绿">绿</li>
            <li><input type="radio" name="color" value="蓝">蓝</li>
        </ul>
    </div>
    <div><input type="submit" value="提交">
        <input type="reset" value="重置">
    </div>
</form>
```

> elements属性的值就是NodeList,里面全是元素节点。

```javascript
var form1 = document.getElementById('form1')
console.log('form1', form1.elements, form1.elements.length) // 4
// 获取表单中的元素根据index)
var field = form1.elements[0] // 获取表单中的第一个字段
console.log(field.value) // 24岁
// 获取表单中的元素(根据name)
var fields = form1.elements['color'] // 获取所有name为color的表单字段
console.log(fields[0].value) // 红
```

### 1.1共有的表单字段属性

除了`<fieldset>`元素之外，所有表单字段都拥有相同的一组属性。如下:

- disabled:布尔值，表示当前字段是否被禁用。
- form:指向当前字段所属表单的指针，只读。
- name:当前字段的名字。
- readOnly:布尔值，表示当前字段是否只读。
- type:当前字段的类型，如"checkbox"、"radio"等等。
- value:当前字段被提交给服务器。

除了from属性之外，可以通过JavaScript动态修改其他任何属性。

```javascript
var form1 = document.getElementById('form1')
var field = form1.elements[0]
field.name = 'address'
field.value = '北京'
field.readOnly = true // 只读
field.disabled = true // 禁用
```

> 如果字段的属性被禁用，那么提交form表单(浏览器默认行为)时，该字段是不会被提交到服务器的。

**1.通过表单字段对象(也是元素节点)修改其disabled属性:**

禁用:

```javascript
var field = document.getElementById('form1')[0]
field.disabled = true
```

在浏览器上显示如下

```html
<form name="form1">
    <input type="text" name="age" value="24岁" disabled>
</form>
```

启用(默认)

```javascript
var field = document.getElementById('form1')[0]
field.disabled = false
```

```html
<form name="form1">
    <input type="text" name="age" value="24岁">
</form>
```

**2.通过表单字段对象(也是元素节点)的setAttribute()修改其disabled属性:**

禁用或启用

```javascript
var field = document.getElementById('form1')[0]
field.setAttribute('disabled',true)
field.setAttribute('disabled',false)
```

在html显示如下:

```html
<form name="form1">
    <input type="text" name="age" value="24岁" disabled="true">
    <input type="text" name="age" value="24岁" disabled="false">
</form>
```

结果我们发现不管设为true或者false这个字段一直不能用，而在html上显示disabled的属性值是字符串'false'或'true'

所以通过`setAttribute()`修改boolean值属性的状态是没用的，浏览器都会把它当做`true`,因为字符串`'false'`或`'true'`就代表true。

当然如果真想通过setAttribute()来切换disabled属性的状态，可以使用以下方法:

```javascript
// 禁用字段
var field = document.getElementById('form1')[0]
field.setAttribute('disabled','disabled')
// 启用字段
field.removeAttribute('disabled') // 删除其属性即可
```

所有boolean值的属性都可以用此方法来代替，如readOnly,disabled等。

### 1.2.共有的表单字段方法

每个表单字段都有两个方法:focus()和blur()。HTML5为表单新增了一个autofocus属性。在支持这个属性的浏览器中，只要设置这个属性，不用JavaScript就能把焦点移动到相应的字段。

- focus():指定表单元素获取焦点。
- blur():将焦点从自定的元素上移除。

focus()手动设置获取焦点

```javascript
var field = document.getElementById('form1')[0]
field.focus() // 获取焦点
```

autofocus自动获取焦点

```html
<input type="text" name="age" value="" autofocus>
```

### 1.3.共有的表单字段事件

除了支持鼠标，键盘，更改和HTMl事件外，所有表单字段都支持下列3个事件:

- blur:当前字段失去焦点时触发。
- change:对于`input`和`<textarea>`，在它们失去焦点且value值改变时触发；对于`<select>`元素，在其选项改变时触发。
- focus:当前字段获得焦点时触发

```html
<form action="http://127.0.0.1:9100/form/submitPersonInfo" id="form1">
    <div>
        年龄:<input type="text" name="age" value="">
    </div>
    <div>
        城市:
        <select name="city">
            <option value="beijing">北京</option>
            <option value="shanghai">上海</option>
            <option value="hubei">湖北</option>
            <option value="hunan">湖南</option>
            <option value="" selected>请选择</option>
        </select>
    </div>
</form>
```

```javascript
var form1 = document.getElementById('form1')
console.log('form1', form1.elements, form1.elements.length) // 4

// input
var field1 = form1.elements[0] // 获取表单中的第一个字段
field1.addEventListener('focus', function (event) {
    console.log(event.target.name, '---获取焦点事件---', event.target.value)
})
field1.addEventListener('blur', function (event) {
    console.log(event.target.name, '---失去焦点事件---', event.target.value)
})
field1.addEventListener('change', function (event) {
    console.log(event.target.name, '---change事件---', event.target.value)
})

// select
var field2 = form1.elements[1]
field2.addEventListener('focus', function (event) {
    console.log(event.target.name, '---获取焦点事件---', event.target.value)
})
field2.addEventListener('blur', function (event) {
    console.log(event.target.name, '---失去焦点事件---', event.target.value)
})
field2.addEventListener('change', function (event) {
    console.log(event.target.name, '---change事件---', event.target.value)
})
```

备注：在某些浏览器中，blur事件会先于change事件发生；而在其他浏览器中，则恰好相反。
