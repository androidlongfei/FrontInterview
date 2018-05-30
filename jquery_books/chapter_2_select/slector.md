# 选择器

选择器是jQuery的根基，在jQuery中，对事件处理，遍历DOM和Ajax操作都依赖于选择器。

jQuery中的选择器完全继承了CSS的风格，利用jQuery选择器，可以非常便捷和快速地找出特定的DOM元素。

## 1.jQuery选择器的优势

1.简洁写法

`$()`函数在很多时候都被作为一个选择器函数来是使用。

`$("#ID")` 用来替换document.getElementById()函数

`$("tagName")` 用来替换document.getElementsByTagName()函数

2.支持CSS1到CSS3选择器

使用CSS选择器时，开发人员需要考虑主流浏览器是否支持某些选择器。而在jQuery中，开发人员可以放心地使用 jQuery选择器而无需考虑浏览器是否支持这些选择器。

3.完善的处理机制

```html
<p>test</p>
```

```javascript
document.getElementById('tt').style.backgroundColor = 'red'
```

运行以上代码浏览器就会报错，因为网页中没有id为'tt'的元素

改进代码如下:

```javascript
var el = document.getElementById('tt')
if(el){
    el.style.backgroundColor = 'red'
}
```

使用jQuery就无需再做非空判断了，jQuery在内部已经帮我们做好了

```html
<p id="pp">hello</p>
```

```javascript
$('#tt').css('backgroundColor','red') // 这里无需判断$('#tt')是否存在
```

需要注意的是`$('#tt')`获取的永远是`对象`,即使网页上没有此元素。

```javascript
var el = $('#tt')
console.log(typeof el) // object
//  根据元素的长度来判断
console.log(el.length) // 没找到length为0
console.log($('#pp').length) // 找到length大于0
// 或者转化为dom对象
console.log(el.get(0)) // undefined
```

> jQuery检查某个元素是否在网页上时，需要根据获取到元素的length来判断。

## 2.jQuery选择器

jQuery选择器分为以下几类:

- 基本选择器
- 层次选择器
- 过滤选择器
- 表单选择器

### 2.1基本选择器

基本选择器是jQuery中最常用的选择器，也是最简单的选择器，它通过元素id,class和标签名来查找DOM元素.

选择器          | 描述                  |  返回  | 示例
------------ | :------------------ | :--: | :--------------------------
#id          | 根据给定的id匹配一个元素       | 单个元素 | $('#test')选取id为test的元素
.class       | 根据给指定的类名匹配元素        | 集合元素 | $('.test')选取所有class为test的元素
element      | 根据给指定的标签名匹配元素       | 集合元素 | $('p')选取所有`<p>`元素
sel1,sel2... | 将每个选择器匹配到的元素合并到一起返回 | 集合元素 | $('div,p.myClass')选取所有指定的元素

例子如下:

```html
<div id="two" class="one" title="test">
    id为two,class为one,title为的div
    <div class="mini" title="other">class为mini,title为other</div>
    <div class="mini" title="test">class为mini,title为test</div>
</div>
```

```javascript
console.log($('#two').length) // 1
console.log($('.mini').length) // 2
console.log($('div').length) // 3
```

### 2.2层次选择器

如果想通过DOM之间的层次关系来获取特定元素，例如后代元素，子元素，相邻元素，和同辈元素，那么层次选择器是个非常好的选择。

元素层次包括如下:

- 后代元素 (包括儿子，孙子...)
- 子元素 (儿子)
- 相邻元素 (上一个兄弟和下一个兄弟)
- 同辈元素 (所有兄弟)

选择器                | 描述                      |  返回  | 示例
------------------ | :---------------------- | :--: | :---------------------------------------
$('par chi')       | 选取par元素里的所有chi(后代)元素    | 集合元素 | $('div span')选取`div`里的所有`span`元素
$('par > chi')     | 选取par元素里的所有chi(子)元素     | 集合元素 | $('div > span')选取`div`的所有子`span`元素
$(prev + next)     | 选取紧接在prev元素的next元素      | 单个元素 | $('div + span')选取class为one的下一个同辈元素
$(prev ~ siblings) | 选取prev元素之后的所有siblings元素 | 集合元素 | $('#two ~ div')选取id为two的元素后面的所有`div`同辈元素

```html
<div id="houdai">
    <div>
        <span>1</span>
    </div>
    <span>2</span>
    <span>3</span>
</div>
<div id="child">
    <div>
        <span>1</span>
    </div>
    <span>2</span>
    <span>3</span>
</div>
<div id="prev">
    <div class="prev">
        <span>1</span>
    </div>
    <span>2</span>
    <span>3</span>
</div>
<div id="siblings">
    <div class="siblings">
        <span>1</span>
    </div>
    <span>2</span>
    <span>3</span>
</div>
```

```javascript
console.log('后代选择器', $('#houdai span').length) // 3
console.log('子选择器', $('#child>span').length) // 2
console.log('相邻选择器', $('.prev+span').length) // 1
console.log('相邻选择器', $('.siblings~span').length) // 2
```

### 2.3过滤选择器

过滤选择器主要是通过特定的过滤规则来筛选出所需要的DOM元素。

过滤规则与CSS中的伪类选择器语法相同，即选择器都以一个冒号`(:)`开头。

过滤选择器有如下分类:

- 基本过滤
- 内容过滤
- 可见性过滤
- 属性过滤
- 子元素过滤
- 表单对象属性过滤

#### 2.3.1基本过滤选择器

选择器            | 描述                    |  返回  | 示例
-------------- | :-------------------- | :--: | :------------------------------------
:first         | 选取第一个元素               | 单个元素 | $('div:first')选取所有`div`里的第一个`div`元素
:last          | 选取最后一个元素              | 单个元素 | $('div:last')选取所有`div`里的最后一个`div`元素
:not(selector) | 去除所有与给定选择器匹配的元素       | 集合元素 | $('div:not(.test)')选取不包含`.test`的div元素
:even          | 选取索引是偶数的元素,索引从0开始     | 集合元素 | $('div:even')选取索引为偶数的div元素
:odd           | 选取索引是基数的元素,索引从0开始     | 集合元素 | $('div:odd')选取索引为基数的div元素
:eq(index)     | 选取索引等于index的元素,索引从0开始 | 集合元素 | $('div:1')选取索引为1的div元素
:gt(index)     | 选取索引大于index的元素,索引从0开始 | 集合元素 | $('div:gt(1)')选取索引大于1的div元素
:lt(index)     | 选取索引小于index的元素,索引从0开始 | 集合元素 | $('div:lt(1)')选取索引小于1的div元素
:focus         | 选取当前获取焦点的元素           | 集合元素 | $(':focus')选取当前获取焦点的元素

```html
<div id='mFirst' class="mar">
    <div class="item">1</div>
    <div class="item">2</div>
    <div class="item">3</div>
    <div class="item">4</div>
</div>
<div id='mNot' class="mar">
    <div class="item te">1</div>
    <div class="item">2</div>
    <div class="item">3</div>
    <div class="item">4</div>
</div>
<div id='mEven' class="mar">
    <div class="item">1</div>
    <div class="item">2</div>
    <div class="item">3</div>
    <div class="item">4</div>
</div>
<div id='mEq' class="mar">
    <div class="item">1</div>
    <div class="item">2</div>
    <div class="item">3</div>
    <div class="item">4</div>
</div>
<div id='mGt' class="mar">
    <div class="item">1</div>
    <div class="item">2</div>
    <div class="item">3</div>
    <div class="item">4</div>
</div>
<div id='mLt' class="mar">
    <div class="item">1</div>
    <div class="item">2</div>
    <div class="item">3</div>
    <div class="item">4</div>
</div>
```

```javascript
// 1.选取第一个元素
$('#mFirst div:first').css('backgroundColor', 'red')
// 2.选取最后一个元素
$('#mFirst div:last').css('backgroundColor', 'red')
// 3.不包含选择符
$('#mNot div:not(.te)').css('backgroundColor', 'red')
// 4.偶数索引(从0开始)
$('#mEven div:even').css('backgroundColor', 'red')
// 5.指定索引(从0开始)
$('#mEq div:eq(2)').css('backgroundColor', 'red')
// 6.大于索引(从0开始)
$('#mGt div:gt(1)').css('backgroundColor', 'red')
// 7.小于索引(从0开始)
$('#mLt div:lt(2)').css('backgroundColor', 'red')
```

#### 2.3.2内容过滤选择器

内容过滤选择器的过滤规则主要体验在它所包含的`子元素或文本内容上`。

选择器             | 描述                 |  返回  | 示例
--------------- | :----------------- | :--: | :--------------------------------------
:contains(text) | 选取含有文本内容为"text"的元素 | 集合元素 | $('div:contains('我')')选取含有文本"我"的`div`元素
:empty          | 选取不包含子元素或者文本元素的空元素 | 集合元素 | $('div:empty')选取空`div`元素
:has(selector)  | 选取含有选择器所匹配的元素      | 集合元素 | $('div:has(p)')选取含有`p`元素的`div`元素
:parent         | 选取含有子元素或者文本的元素     | 集合元素 | $('div:parent')选取拥有子元素的`div`元素

```html
<div>
    <div class="item">test</div>
    <div class="item">hello</div>
    <div class="item">3</div>
    <div class="item my">4</div>
    <div class="item">
        <span>5</span>
    </div>
    <div class="item"></div>
</div>
```

```javascript
// 1.选取含有文本内容为test元素
console.log($('div.item:contains(test)').html()) // test
// 2.选取空元素
console.log($('div:empty').length) // 1
// 3.选择包含.my的元素
console.log($('div:has(.my)').length) // 1
// 4.偶数索引(从0开始)
console.log($('span:parent').length) // 1
```

#### 2.3.3可见性过滤选择器

可见性过滤选择器是根据元素的可见和不可见状态来选择相应的元素。

选择器      | 描述         |  返回  | 示例
-------- | :--------- | :--: | :-----------------------------------------------------------------------------
:hidden  | 选取所有不可见的元素 | 集合元素 | $(':hidden')选取所有不可见的元素，包括`<input type="hidden">`,`<div style="display:none;">`
:visible | 选取所有不可见的元素 | 集合元素 | $('div:visible')选取所有可见的`div`元素

```html
<div id='mFirst' class="mar">
    <input type="hidden" name="test" value="测试">
    <div style="display:none;">哈哈</div>
    <div class="tt">hello</div>
</div>
```

```javascript
console.log($(':hidden').length, $(':hidden')) // 10 包括meta等标签
console.log($('input:hidden').length) // 1 input标签
console.log($('div:hidden').length) // 1 div标签
console.log($('div.tt:visible').length) // 1 div标签
```

#### 2.3.4属性过滤选择器

属性过滤选择器的过滤规则是通过元素的属性来获取相应的元素。

选择器                | 描述               |  返回  | 示例
------------------ | :--------------- | :--: | :----------------------------------------------------------------------
[attribute]        | 获取拥有此属性的元素       | 集合元素 | $('div[id]')选取拥有属性id元素
[attribute=value]  | 选取属性值为value的元素   | 集合元素 | $('div[title=test])选取属性title为'test'的`div`元素
[attribute!=value] | 选取属性值不等于value的元素 | 集合元素 | $('div[title!=test])选取属性title不为'test'的`div`元素,(注意:没有属性title的div元素也会被选中)
[attribute^=value] | 选取属性值以value开始的元素 | 集合元素 | $('div[title^=test])选取属性title以'test'开头的`div`元素
[attribute$=value] | 选取属性值以value结束的元素 | 集合元素 | $('div[title$=test])选取属性title以'test'结束的`div`元素
[attribute*=value] | 选取属性值含有value的元素  | 集合元素 | $('div[title*=test])选取属性title含有'test'的`div`元素

```html
<div id='test1' title="my123">哈哈</div>
<div id='test2' title="my124">嘿嘿</div>
<div id='test3' title="ty125">哟哟</div>
```

```javascript
console.log('拥有属性id的元素', $('[id]').length) // 3
console.log('属性id=test1的元素', $('[id=test1]').html()) // 哈哈
console.log('属性id!=test1的元素', $('[id!=test1]').length) // 11 所有不含的标签哟
console.log('属性title以my开头的元素', $('[title^=my]').length) // 2
console.log('属性title以4结束的元素', $('[title$=4]').html()) // 嘿嘿
console.log('属性title包含12的元素', $('[title*=12]').length) // 3
```

#### 2.3.5子元素过滤选择器

子元素过滤选择器的过滤规则相对于其它的选择器稍微有点复杂，不过没关系，只要将元素的父元素和子元素分清楚，那么使用起来也非常简单。

选择器               | 描述                             |  返回  | 示例
----------------- | :----------------------------- | :--: | :----------------------------------------
:nth-child(index) | 选取每个父元素下的第index个子元素(index从0开始) | 集合元素 | $('li:nth-child(0)')选取`ul`里的第一个li元素
:first-child      | 选取每个父元素的第一个子元素                 | 集合元素 | $('ul li:first-child')选取每个`ul`里的第一个`li`元素
:last-child       | 选取每个父元素的最后一个子元素                | 集合元素 | $('ul li:last-child')选取每个`ul`里的最后一个`li`元素
:only-child       | 如果某个元素是它父元素中唯一的子元素，那么将会被匹配     | 集合元素 | $('ul li:only-child')在`ul`中选取唯一子元素`li`元素

```html
<div>
    <ul id="first">
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
    </ul>
    <ul id="second">
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
    </ul>
    <ul id="three">
        <li>1</li>
    </ul>
</div>
```

```javascript
// 每个ul元素的第一个li元素
$('ul li:first-child').css('background-color','red')
// 每个ul元素的最后一个li元素
$('ul li:last-child').css('background-color','red')
// 只有一个li元素
$('ul li:only-child').css('background-color','red')
// 选中第二个元素
$('#first li:nth-child(2)').css('background-color','red')
// 选中2倍数的元素
$('#second li:nth-child(2n)').css('background-color','red')
```

#### 2.3.6表单对象属性过滤选择器

此选择器主要是对所选择的表单元素进行过滤。

选择器       | 描述                  |  返回  | 示例
--------- | :------------------ | :--: | :-------------------------------------
:enabled  | 选取所有可用的元素           | 集合元素 | $('#form1 :enabled')选取表单form1内所有可用元素
:disabled | 选取所有不可用的元素          | 集合元素 | $('#form2 :disabled')选取表单form2内所有不可用元素
:checked  | 选取所有被选中的元素(单选框，复选框) | 集合元素 | $('input:checked')选取所有被选中`input`元素
:selected | 选取所有被选中的选项元素(下拉列表)  | 集合元素 | $('selct option:selected')选取所有被选中的选项元素

```html
<form id='form1'>
    可用元素：<input name="add" type="text" value="可用文本框"/>
    <br/><br/>
    不可用元素: <input type="text" name="eamil" disabled="disabled" value="不可用文本"/>
    <br/><br/>
    可用元素：<input name="che" type="text" value="可用文本框"/>
    <br/><br/>
    不可用元素: <input type="text" name="name" disabled="disabled" value="不可用文本"/>
    <br/><br/>
    多选框:
    <input name="love" type="checkbox" value="test1" checked="checked"/>
    <input name="love" type="checkbox" value="test2"/>
    <input name="love" type="checkbox" value="test3"/>
    <input name="love" type="checkbox" value="test4"/>
    <input name="love" type="checkbox" value="test5"/>
    <br/><br/>
    下拉列表:
    <select name="test" style="height: 30px;">
        <option>湖南</option>
        <option>北京</option>
        <option selected="selected">天津</option>
        <option>湖北</option>
    </select>
    <br/><br/>
    <input type="button" id="btn" value="提交" />
</form>
```

```javascript
$('#btn').bind('click',function(event){
    console.log('submit...')
    // 修改表单内，可用input元素的值
    $('#form1 input:enabled').val('这里变化啦')
    // 修改表单内，不可用input元素的值
    $('#form1 input:disabled').val('这里也变化啦')
    // 获取多选框选中的个数
    console.log($('input[type=checkbox]:checked').length) // 选中的个数
    // 获取下拉框选中的内容
    console.log($('select :selected').text()) // 湖北
})
```

### 2.4表单选择器

为了使用户能够更加灵活地操作表单，jQuery中专门加入了表单选择器。利用这个选择器，能极其 方便地获取到表单的`某个`或者`某类型`的元素。

选择器       | 描述                                  |  返回  | 示例
--------- | :---------------------------------- | :--: | :---------------------
:input    | 选取所有的input,textarea,select,button元素 | 集合元素 | $('#form1 :input')
:text     | 选取所有的单行文本框                          | 集合元素 | $(':text')选取所有的单行文本框
:password | 选取所有密码框                             | 集合元素 | $(':password')选取所有的密码框
:radio    | 选取所有的单选框                            | 集合元素 | $(':radio')选取所有的单选框
:checkbox | 选取所有的多选框                            | 集合元素 | $(':checkbox')选取所有的多选框
:button   | 选取所有的按钮                             | 集合元素 | $(':button')选取所有的按钮
:file     | 选取所有的上传域                            | 集合元素 | $(':file')选取所有的上传域

```html
<form id='form1'>
    可用元素：<input name="add" type="text" value="可用文本框"/>
    <br/><br/>
    不可用元素: <input type="text" name="eamil" disabled="disabled" value="不可用文本"/>
    <br/><br/>
    可用元素：<input name="che" type="text" value="可用文本框"/>
    <br/><br/>
    不可用元素: <input type="text" name="name" disabled="disabled" value="不可用文本"/>
    <br/><br/>
    密码框: <input type="password" name="pwd" value="密码"/>
    <br/><br/>
    多选框:
    <input name="love" type="checkbox" value="test1" checked="checked"/>
    <input name="love" type="checkbox" value="test2"/>
    <input name="love" type="checkbox" value="test3"/>
    <input name="love" type="checkbox" value="test4"/>
    <input name="love" type="checkbox" value="test5"/>
    <br/><br/>
    下拉列表:
    <select name="test" style="height: 30px;">
        <option>湖南</option>
        <option>北京</option>
        <option selected="selected">天津</option>
        <option>湖北</option>
    </select>
    <br/><br/>
    <button id="test" disabled="disabled">测试</button>
    <br/><br/>
    <textarea name="des" rows="4" cols="40">描述</textarea>
    <br/><br/>
</form>
<button id="btn">提交</button>
```

```javascript
$('#btn').bind('click',function(event){
    console.log('submit...')
    // 获取表单元素个数
    console.log('表单元素个数',$('#form1 :input').length) // 12 加上 select textarea button
    // input元素个数
    console.log('input元素个数',$('#form1 input').length) // 9
    // 获取表单内单行文本的个数
    $('#form1 input:disabled').val('这里也变化啦')
    // 获取多选框选中的个数
    console.log($('#form1 :text').length,$('#form1 :text')) // 4
    // 获取密码框个数
    console.log($('#form1 :password').length) // 1

    // 同理，其他表单操作与此类似
})
```
