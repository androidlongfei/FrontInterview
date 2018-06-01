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
var selecbox = document.form[0].elements[0]
var text = selecbox.options[0].innerHTML
var value = selecbox.options[0].getAttribute('value')
```

以上方法太麻烦，不推荐。

推荐使用以下方法:

```javascript
var selecbox = document.form[0].elements[0]
var text = selecbox.options[0].text // 选项的文本
var text = selecbox.options[0].value // 选项的值
```
