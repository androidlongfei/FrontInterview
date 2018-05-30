//  对象的扩展

// 属性的简洁表示法

/**
 * 1.基本用法
 * ES6 允许直接写入变量和函数，作为对象的属性和方法。这样的书写更加简洁。
 * ES6 允许在对象之中，直接写变量。这时，属性名为变量名, 属性值为变量的值
 */

const foo = 'bar';
const baz = { foo };

console.log(baz); // { foo: 'bar' }

// 等价于 cosnt baz = {foo:'bar'}

function f(x, y) {
    return { x, y };
}

let fResult = f(1, 2);
console.log(fResult); // { x: 1, y: 2 }

/**
 * 2. 方法简写
 * 注意，简洁写法的属性名总是字符串，这会导致一些看上去比较奇怪的结果。
 */

// es6
const o = {
    input() {
        return 'Hello!';
    }
};

// 等同于 es5
var m = {
    input: function () {
        return 'Hello!';
    }
};

console.log(o.input()); // Hello!
console.log(m.input()); // Hello!


// 简写属性总是字符串,所以不会因为它属于关键字，而导致语法解析报错

const obj = {
    class() {}
};

// 等同于

var obj1 = {
    'class': function () {}
};
