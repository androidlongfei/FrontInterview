# 选择框

选择框是通过`<select>`和`<option>`元素创建的。除了所有表单字段共有的属性和方法外，HTMLSelectElement类型还提供了下列属性和方法:

- `add(newOption)`: 向控件中插入新`<option>`元素。
- multiple:布尔值，表示是否允许多项选择。
- options:控件中的所有`<option>`元素的HTMLCollection。
- `remove(index)`:移除指定位置的选项。
- selectedIndex:基于0的选中项索引，如果没有选中项，则值为-1。对于支持多选的控件，只保存选中项第一项的索引。
- size:选择框中可见的行数。
- 如果没有选中项，则选择框的value为空字符串
- 如果有一个选中项，而且该项的value属性已经在HTMl中指定，则选择框的value属性值等于选中项的value值
- 如果有一个选中项，而且该项的value属性未在HTMl中指定，则选择框的value值等于选中项的文本

在DOM中每个`<option>`元素都有一个HTMLOptionElement对象表示。其属性如下:

- index:当前选项在options集合的索引。
- label:当前选项的标签
- selected:布尔值，表示当前选项是否被选中，将这个属性设置为true可以选中当前选项
- text:选项的文本
- value:选项的值

```html
<form >
    <select value="">
        <option value="hubei">湖北</option>
        <option value="hunan">湖南</option>
        <option value="beijing">北京</option>
    </select>
</form>
```

通过标准DOM获取选择框中第一项的文本和值:

```javascript
var selectBox = document.getElementById('form1').elements[0]
selectBox.addEventListener('change', function (event) {
    console.log('select change事件', event)
    var select = event.target
    console.log('select.selectedIndex', select.options, select.selectedIndex)
    var curOption = select.options[select.selectedIndex]
    console.log('curOption', curOption)
    console.log('text-value', curOption.innerHTML, curOption.getAttribute('value')) // 选项的文本-选项的值
    console.log('form value', select.value) // select的值
})
```

以上方法太麻烦，不推荐。

推荐使用以下方法:

```javascript
var text = curOption.text // 选项的文本
var value = curOption.value // 选项的值
```

## 1.选择选项

对于只允许选择一项的选择框，访问选中项的最简单方式，就是使用选择框的selectedIndex属性，如下面例子所示:

```javascript
var selecIndexOption = selecbox.options[slecbox.selectedIndex]
```

设置`selected`属性可以选中指定项.

```html
<select value="">
    <option value="hubei">湖北</option>
    <option value="hunan">湖南</option>
    <option value="beijng">北京</option>
    <option value="" selected>请选择</option>
</select>
```

> 默认选中已选择此项

## 2.添加选项

添加选项的三种方式

**第一种**

可以使用JavaScript动态创建选项，并将它们添加到选择框中。

```javascript
var newOption = document.createElement('option');
newOption.appendChild(document.createTextNode('北京'))
newOption.setAttribute('value','beijing')
selectBox.appendChild(newOption)
```

**第二种**

使用Option构造函数来创建新选项。

```javascript
var newOption = new Option('option text','option value')
selectBox.appendChild(newOption)
```

这种方式除了IE以外的浏览器都能使用

**第三种**

使用add的方式添加新选项。

```javascript
var newOption = new Option('option text','option value')
selectBox.add(newOption)
```

以上方法所有浏览器都支持。

## 3.移除选项

移除选项的三种方式.

**第一种**

```javascript
selectBox.removeChild(selectBox.options[0])
```

**第二种**

```javascript
selectBox.remove(0)
```

**第三种**

```javascript
selectBox.options[0] = null
```
