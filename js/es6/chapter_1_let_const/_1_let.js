// 1.let命令，用来声明变量。它的用法类似于var，但是所声明的变量，只在let命令所在的代码块内有效。

{
    let a = 10;
    var b = 1;
}

// console.log(a) // 报错ReferenceError: a is not defined.
console.log(b) // 1

// 这表明，let声明的变量只在它所在的代码块有效。

/**
 * 2.for循环
 * for循环有一个特别之处，就是设置循环变量的那部分是一个父作用域，而循环体内部是一个单独的子作用域。
 */

for (let i = 0; i < 3; i++) {
    let i = 'abc';
    console.log(i);
}
// abc
// abc
// abc

/**
 * 3.变量提升
 * var命令会发生”变量提升“现象，即变量可以在声明之前使用，值为undefined.
 * let命令改变了语法行为，它所声明的变量一定要在声明后使用，否则报错.
 */

// var 的情况
console.log(foo); // 输出undefined
var foo = 2;

// let 的情况
// console.log(bar); // 报错ReferenceError
let bar = 2;

/**
 * 4. 暂时性死区
 * 在代码块内，使用let命令声明变量之前，该变量都是不可用的。这在语法上，称为“暂时性死区”
 */

var tmp = 123;

if (true) {
    // tmp = 'abc'; // 报错ReferenceError
    let tmp;
}

/**
 * 4.不允许重复声明
 * let不允许在相同作用域内，重复声明同一个变量。
 */

// 报错
function func() {
    let a = 10;
    // var a = 1;
}

// 报错
function func() {
    let a = 10;
    // let a = 1;
}

function func(arg) {
    // let arg; // 报错
}

function func(arg) {
    {
        let arg; // 不报错
    }
}
