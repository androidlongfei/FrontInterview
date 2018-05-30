/**
 * 自执行函数
 */

// 1
(function (arguments) {
    console.log('auto exe fun', arguments);
})(1)

// 2 自执行函数表达式
~ function (arguments) {
    console.log('auto exe fun', arguments);
}(2)

~(function (arguments) {
    console.log('auto exe fun', arguments);
}(3))
