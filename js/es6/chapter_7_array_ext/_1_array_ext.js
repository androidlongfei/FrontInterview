/**
 * 1.数组扩展符
 * 扩展运算符（spread）是三个点（...）。它好比 rest 参数的逆运算，将一个数组转为用逗号分隔的参数序列
 */


console.log(...[1, 2, 3]) // 1 2 3

console.log(1, ...[2, 3, 4], 5) // 1 2 3 4 5


let add = (x, y) => {
    return x + y;
}

const numbers = [40, 50]
console.log(add(...numbers)); // 90

/**
 * 2.替代apply方法
 * 2.1 求数组中的最值
 */

let vals = [14, 3, 77]

let maxVal = Math.max(...vals)

// 等同于 Math.max(14, 3, 77);

console.log(maxVal); // 77

/**
 * 2.2 将一个数组添加到另一个数组的尾部
 */

let num1 = [1, 2, 3];

let num2 = [4, 5, 6];
num1.push(...num2);
console.log(num1); // [1,2,3,4,5,6]

let objArr1 = [{
    age: 1
}, {
    age: 2
}];

let objArr2 = [{
    age: 3
}, {
    age: 4
}];
objArr1.push(...objArr2);
console.log(objArr1); // [ { age: 1 }, { age: 2 }, { age: 3 }, { age: 4 } ]
