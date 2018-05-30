// 数组的解构赋值

/**
 * 解构:ES6允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构
 */


// 以前，为变量赋值，只能直接指定值。

let a = 1;
let b = 2;
let c = 3;
console.log(a, b, c); // 1 2 3

// ES6 允许写成下面这样。
let [e, f, g] = [1, 2, 3];

console.log(a, b, c); // 1 2 3


/**
 * 1.默认值
 */

let [x = 12] = []

console.log(x); // 12

let [m, k = 123] = [10]

console.log(m, k); // 10 123
