// 基础选择器示例
// 对应的HTML模板是 _2_select.html

// 1.改变 id为one的元素的背景颜色
$('#one').css('backgroundColor', '#bbffaa')

// 2.改变class为mini的所有元素的背景颜色
$('.mini').css('backgroundColor', '#bbffaa')

// 3.改变元素名是<div>的所有元素的背景颜色
$('div').css('backgroundColor', '#bbffaa')

// 4.改变所有的<span>元素和id为two的元素的背景颜色
$('span,#two').css('backgroundColor', '#bbffaa')

// 备注：为了更好的看到效果，1，2，3，4最好一个一个的执行
