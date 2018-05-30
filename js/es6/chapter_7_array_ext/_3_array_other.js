/**
 *
 * 1.Array.from方法用于将两类对象转为真正的数组
 * 一类:类似数组的对象（array-like object）
 * 二类:可遍历（iterable）的对象（包括 ES6 新增的数据结构 Set 和 Map）
 */

// 基本用法
let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
};
//备注:length和index属性必须存在,否则就不是类似是数组的对象了

// ES5的写法
var arr1 = [].slice.call(arrayLike);
console.log(arr1); // ['a', 'b', 'c']

// ES6的写法
let arr2 = Array.from(arrayLike);
console.log(arr2); // ['a', 'b', 'c']

/**
 * 2.Array.of方法用于将一组值，转换为数组。
 * 总是返回参数值组成的数组。如果没有参数，就返回一个空数组
 */

let parma1 = Array.of(1, 2, 5, 7)

console.log(parma1); // [ 1, 2, 5, 7 ]

let parma2 = Array.of()
console.log(parma2); // []

let parma3 = Array.of({ aa: 123 }, { mm: 234 }, { name: 'zhan' })
console.log(parma3); // [ { aa: 123 }, { mm: 234 }, { name: 'zhan' } ]

/**
 * 3.find和findIndex
 * find：用于找出第一个符合条件的数组成员
 * find方法的回调函数可以接受三个参数，依次为当前的值、当前的位置和原数组。
 * findIndex方法的用法与find方法非常类似，返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回-1。
 */

let target = [1, 2, 4, 56, 10].find(item => {
    return item === 4
})
console.log(target); // 4

[1, 5, 10, 15].find((value, index, arr) => {
    return value > 9;
})
// value:当前值,index:当前位置,arr:原始数组

/**
 * 4.entries()，keys()
 */

// a
// b
for (let item of ['a', 'b']) {
    console.log(item);
}

// 0-a
// 1-b
for (let [key, value] of ['a', 'b'].entries()) {
    console.log(`${key}-${value}`);
}

// 0
// 1
for (let key of ['a', 'b'].keys()) {
    console.log(key);
}

/**
 * 4.数组的空位
 * 数组的空位指，数组的某一个位置没有任何值。比如，Array构造函数返回的数组都是空位。
 */

console.log(Array(3)); // [ , ,  ]

// 注意，空位不是undefined，一个位置的值等于undefined，依然是有值的。空位是没有任何值.

// ES5 对空位的处理，大多数情况下会忽略空位。

// ES6 则是明确将空位转为undefined。
