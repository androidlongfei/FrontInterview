# 认识jQuery

jQuery是由John Resig创建于2006年1月的开源项目。

## 页面加载完成后执行

1.原生js方法

```javascript
window.onload = function () {
    console.log('onload...1')
}

window.onload = function () {
    console.log('onload...2')
}
```

> 必须等网页中所有的内容加载完（包括图片）后能执行

> 不能同时编写多个,若存在多个只会执行最后一个

2.jQuery方法

```javascript
$(document).ready(function () {
    console.log('onload...jquery...dom渲染完成后调用')
});

// 也可以简写,如下

$(function () {
    console.log('onload...jquery...dom渲染完成后调用')
})
```

> 两种方法都可以

> 网页中所有DOM结构绘制完毕后就执行，可能DON元素关联的东西并没有加载完

> 能同时编写多个

## 链式操作

jquery是链式操作，对于同一个对象操作不超过3个的，可以直接写成一行

```javascript
$(li).show().unbind(click)
```

若一个对象操作较多，建议每行写一个操作

```javascript
$(this).removeClass('mouseout')
.addClass('mouseover')
.stop()
.unbind('click')
```

## jQuery对象和DOM对象

DOM对象就是节点，包括元素节点和文本节点。

jQuery对象就是通过jQuery包装DOM对象后产生的对象。

如获取元素节点的内容：

```html
<p id="foo">hello</p>
```

```javascript
// jquery方式实现
var $content = $('#foo').html()
console.log($content) // hello
// js实现
var content = document.getElementById('foo')
console.log(content) // hello
```

### 1.jQuery对象转化为DOM对象

jQuery对象不能使用使用DOM中的方法。

jQuery对象提供了两种方法将一个jQuery对象转化成DOM对象即`[index]`和`get(index)`

```javascript
var $cr = $('#cr')
var cr = $cr[0]
// var cr = $cr.get(0)
console.log(document.getElementById('cr') == cr) // true
```

### 2.DOM对象转化为jQuery对象

对于一个DOM对象，只需要用$()把DOM对象包装起来，就可以获得一个jQuery对象了，方式为`$(DOM对象)`

```javascript
var cr = document.getElementById('cr')
var $cr = $(cr)
console.log($cr.html())
```

### 3.注意事项

平时用到的jQuery对象都是$()函数制造出来的，$()函数就是一个jQuery对象的制造工厂。

```html
<div id="mdiv">哈哈</div>
```

```javascript
// jquery
var $div = $('#mdiv')
console.log($div)
// js
var div = document.getElementById('mdiv')
console.log(div)

// 将jQuery对象转化为dom，有如下两种方法
var div1 = $div.get(0)
console.log(div1.innerHTML) // 哈哈
var div2 = $div[0]
console.log(div1.innerHTML) // 哈哈
console.log(div == div1, div1 == div2) // true true

// 将dom对象包装成jQuery对象
var $div1 = $(div)
console.log($div1.html()) // 哈哈
console.log($div == $div1) // fasle
```
