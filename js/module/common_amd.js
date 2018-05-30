// 通行的Javascript模块规范共有两种：CommonJS和AMD

// CommonJS是同步加载的 (主要用于nodeJs)

// AMD是异步加载(主要用于浏览器)

/**
 * AMD使用
 */

// AMD 第一个参数[module]，是一个数组，里面的成员就是要加载的模块；第二个参数callback，则是加载成功之后的回调函数。

/*
require(['math'], function (math) {　　　　
    math.add(2, 3);
});
*/

/**
 * CommonJS使用
 */

// var math = require('./math.js')
