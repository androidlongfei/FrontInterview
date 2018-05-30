// for...of循环可以使用的范围包括数组、Set 和 Map 结构、某些类似数组的对象（比如arguments对象、DOM NodeList 对象）、后文的 Generator 对象，以及字符串。

// 数组

/**
 * 1.基本用法
 */


const arr = ['red', 'green', 'blue'];

for (let v of arr) {
    console.log(v); // red green blue
}

/**
 * 2.
 * for...of循环代替数组实例的forEach方法。
 */

arr.forEach(function (element, index) {
    console.log(element); // red green blue
    console.log(index); // 0 1 2
});

/**
 * 3.for...of 与for...in
 * JavaScript 原有的for...in循环，只能获得对象的键名，不能直接获取键值。
 * ES6 提供for...of循环，允许遍历获得键值。
 */

const array = ['a', 'b', 'c', 'd'];

// 获取数组的键
for (let a in array) {
    console.log(a); // 0 1 2 3
}

// 获取数组的值
for (let a of array) {
    console.log(a); // a b c d
}
