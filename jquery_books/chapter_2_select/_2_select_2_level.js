// 层次选择器示例
// 对应的HTML模板是 _2_select.html

// 1.改变body内所有div的背景颜色
// $('body div').css('backgroundColor', '#bbffaa')

// 2.改变body内子div的背景颜色
// $('body>div').css('backgroundColor', '#bbffaa')

// 3.改变class为one的下一个div同辈元素背景色
// $('.one + div').css('backgroundColor', '#bbffaa')

// 4.改变id为two的元素后面的所有div同辈元素的背景色
// $('#two ~ div').css('backgroundColor', '#bbffaa')

// 5.可以用next()替代$('.one + div'),nextAll()替代$(.one ~ div)
// $('.one').next('div').css('backgroundColor', '#bbffaa')
$('.one').nextAll('div').css('backgroundColor', '#bbffaa')

// 备注：为了更好的看到效果，1，2，3，4最好一个一个的执行
