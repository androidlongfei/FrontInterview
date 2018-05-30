// 其他解构

/**
 * 1.字符串的解构赋值
 */

let [a, b, c, d, e] = 'hello'

console.log(a, b, c, d, e); // h e l l o

/**
 * 2.函数参数的解构赋值
 */

function add([x, y]) {
    return x + y;
}

console.log(add([1, 2])); // 3


/**
 * 不要在解构赋值中使用圆括号
 */

// 全部报错

// let [(a)] = [1];
// let {
//     x: (c)
// } = {};
// let ({
//     x: c
// }) = {};

/**
 * 用途:1. 交换变量的值
 */

let i = 1;
let j = 2;

console.log('变换前', i, j);

[i, j] = [j, i];

console.log('变换后', i, j);
