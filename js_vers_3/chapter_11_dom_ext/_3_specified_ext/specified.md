# 专有扩展

## children属性

由于IE9之前的版本与其他浏览器在处理文本节点中的空白符时有差异，因此就出现了children属性。

这个属性是HTMLCollection的实例，只包含元素中同样还是元素的子节点，除此之外，children属性与childNodes没什么区别，即在 元素只包含元素子节点时，这两个属性的值相同。

```html
<ul id="mul">
    <li class="mli">t1</li>
    <li class="mli">t2</li>
    <li class="mli">t3</li>
    <li class="mli">t4</li>
</ul>
```

```javascript
var ul = document.querySelector('#mul');
console.log('childNodes', ul.childNodes) // NodeList(9)
console.log('children', ul.children) // HTMLCollection(4)
```

## 插入文本

使用`textContent`属性和`innerText`获取元素节点的所有文本内容，包括子文档树中的文本。

```html
<p id="pt">t1<span style="color:red;">hello</span></p>
<p id="pm">pmff</p>
```

```javascript
var pt = document.querySelector('#pt');
console.log('pt innerText', pt.innerText) // t1hello
console.log('pt textContent', pt.textContent) // t1hello
console.log(document.querySelector('#pm').textContent) // pmff
```
