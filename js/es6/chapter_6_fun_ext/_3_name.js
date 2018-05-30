// 函数的name 属性

/**
 * 函数的name属性，返回该函数的函数名
 *
 */

function aa() {}

console.log(aa.name); // aa


/**
 * ES5的name属性，会会对函数表达式返回空字符串，而ES6会返回实际的函数名
 */

let foo = function () {

}

console.log(foo.name); // foo
