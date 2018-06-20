# jQuery中的DOM操作

一般来说，DOM操作分为3个方法，即`DOM Core`(核心),`HTML-DOM`,`CSS-DOM`。

**1.DOM Core**

DOM Core并不专属于JavaScript,任何一种支持DOM的程序设计语言都可以使用它。

JavaScript中的`getElementById()`,`getElementsByTagName()`,`getAttribute()`,`setAttribute()`等方法都是`DOM Core`的组成部分。

**2.HTML-DOM**

如`document.forms`,`element.title`等都属于`HTMl-DOM`

**3.CSS-DOM**

`CSS-DOM`是针对CSS的操作。如:

```javascript
element.style.color = 'red';
```

jQuery作为JavaScript库，继承并发扬了JavaScript对DOM对象的操作的特性。

## 1.查找节点

- 查找元素节点
- 查找属性节点

```html
<p title="选择">选择你最喜欢的水果</p>
<ul>
    <li title="苹果">苹果</li>
    <li title="橘子">橘子</li>
    <li title="菠萝">菠萝</li>
</ul>
```

**1.1查找元素节点**

```javascript
var li = $('li:eq(1)') // 获取ul里的第二个li
var liText = li.text() // 获取节点的文本内容
console.log(liText) // 输出 橘子
```

**1.2查找属性节点**

主要是使用`attr()`来获取节点的属性。

```javascript
var p = $('p') // 获取p节点
var pTitle = p.attr('title') // 获取title属性
console.log(pTitle) // 选择
```

## 2.创建节点

**2.1创建元素节点**

主要使用`$()`来创建元素节点。

例如：创建两个`li`标签然后加入到`ul`标签中。

```javascript
var li1 = $('<li>嘿嘿</li>') // 创建li元素节点
var li2 = $('<li>哈哈</li>')
var ul = $('<ul></ul>')
ul.append(li1) // 将li加到ul中
ul.append(li2)
$(document.body).append(ul)
```

动态创建的新元素节点不会被自动添加到文档中，而是需要使用其它方法将其插入到文档中。

当创建单个元素时，需要注意闭合标签和使用标准的XHTML格式.如创建一个`<p>`元素:

```
可以用$('<p></p>')或者$('<p/>')

不要用$('<P/>')或$('p')
```

**2.2创建文本节点**

```javascript
var li1 = $('<li>嘿嘿</li>') // 其中"嘿嘿"就是创建的文本节点
```

**2.3创建属性节点**

```javascript
var li1 = $('<li title="测试">嘿嘿</li>') // title="测试"就是属性节点
```

无论`$(html)`中的HTMl代码有多么复杂，都可以使用相同的方式来创建。

## 3.插入节点

动态创建HTMl元素并没有实际用处，还需要将新创建的元素插入到文档中。

将新创建的节点插入到文档最简单的办法是，让它成为这个文档的某个子节点。

插入节点的方法如下:

方法             | 描述                                                 | 示例
:------------- | :------------------------------------------------- | :-----
append()       | 向每个匹配的元素内部追加内容                                     | 示例3.1
appendTo()     | 将所有匹配的元素追加到指定的元素中。$(A).appendTo(B),是将A追加到B中        | 示例3.2
prepend()      | 向所有匹配的元素内部前置内容                                     | 示例3.3
prependTo()    | 将所有匹配的元素前置到指定的元素中。$(A).appendTo(B),是将A前置到B中        | 示例3.4
after()        | 在每个匹配的元素之后插入节点                                     | 示例 3.5
insertAfter()  | 将所有匹配的元素插入到指定元素的后面。$(A).insertAfter(B),是将A插入到B后面   | 示例 3.6
before()       | 在每个匹配的元素之前插入内容                                     | 示例 3.7
insertBefore() | 将所有匹配的元素插入到指定的元素的前面。$(A).insertBefore(B),是将A插入到B前面 | 示例 3.8

所有示例对应的HTML代码:

```html
<p>我想说:</p>
```

**示例3.1 append()**

```javascript
$('p').append('<b>你好</b>')
```

结果

```html
<p>我想说:<b>你好</b></p>
```

**示例3.2 appendTo()**

```javascript
$('<b>你好</b>').appendTo('p')
```

结果

```html
<p>我想说:<b>你好</b></p>
```

**示例3.3 prepend()**

```javascript
$('p').prepend('<b>你好</b>')
```

结果

```html
<p><b>你好</b>我想说:</p>
```

**示例3.4 prependTo()**

```javascript
$('<b>你好</b>').prependTo('p')
```

结果

```html
<p><b>你好</b>我想说:</p>
```

**示例3.5 after()**

```javascript
$('p').after('<b>你好</b>')
```

结果

```html
<p>我想说:</p><b>你好</b>
```

**示例3.6 insertAfter()**

```javascript
$('<b>你好</b>').insertAfter('p')
```

结果

```html
<p>我想说:</p><b>你好</b>
```

**示例3.7 before()**

```javascript
$('p').before('<b>你好</b>')
```

结果

```html
<b>你好</b><p>我想说:</p>
```

**示例3.8 insertBefore()**

```javascript
$('<b>你好</b>').before('p')
```

结果

```html
<b>你好</b><p>我想说:</p>
```

append和prepend是`父子之间`的DOM操作(追加节点),after和before是`兄弟之间`的DOM操作(移动节点).

## 4.删除节点

jQuery提供了三种删除节点的方法。

- remove()
- detach()
- empty()

**remove**

作用是从DOM中删除所有匹配的元素。

```javascript
$('ul li:eq(1)').remove() // 删除第二个li元素节点
```

```javascript
$('ul li').remove('li[title="测试"]') // 删除title="测试"的li节点
```

注意:remove会将所有的后代节点也删除。
