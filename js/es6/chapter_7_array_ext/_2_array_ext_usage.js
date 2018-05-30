// 数组扩展符的应用

/**
 * 1.复制数组
 * 数组是复合的数据类型，直接复制的话，只是复制了指向底层数据结构的指针，而不是克隆一个全新的数组。
 */

// 例如
const a1 = [1, 2];
const a2 = a1;

a2[0] = 2;
console.log(a1); // [2,2] 可见a1和a2指向同一个地址

// es6写法如下, 克隆数组

const m1 = [1, 2];
// 写法一
const m2 = [...m1];
// 写法二
// const [...m2] = m1;

m2[0] = 2
console.log(m1); // [1,2] 可见m1和m2指向不是同一个地址

/**
 * 2.合并数组
 * 扩展运算符提供了数组合并的新写法。
 */

let arr1 = ['a', 'b'];
let arr2 = ['c'];
let arr3 = ['d', 'e'];

// ES5的合并数组
let mergeArr1 = arr1.concat(arr2, arr3);
console.log(mergeArr1); // [ 'a', 'b', 'c', 'd', 'e' ]

// es6
let mergeArr2 = [...arr1, ...arr2, ...arr3]
console.log(mergeArr2); // [ 'a', 'b', 'c', 'd', 'e' ]

/**
 * 3.与解构赋值结合
 * 备注:如果将扩展运算符用于数组赋值，只能放在参数的最后一位，否则会报错
 */
let [param1, ...param2] = [1, 2, 3, 4, 5, 6]
console.log(param1); // 1
console.log(param2); // [ 2, 3, 4, 5, 6 ]

/**
 * 4.字符串
 * 扩展运算符还可以将字符串转为真正的数组。
 */

let param3 = [...'hello']
console.log(param3); //[ 'h', 'e', 'l', 'l', 'o' ]
