// 解构赋值的用途

/**
 * 1. 交换变量的值
 */

let i = 1;
let j = 2;

console.log('变换前', i, j);

[i, j] = [j, i];

console.log('变换后', i, j);

/**
 * 2.从函数返回多个值
 * 函数只能返回一个值，如果要返回多个值，只能将它们放在数组或对象里返回。有了解构赋值，取出这些值就非常方便。
 */

// 返回一个数组

function example() {
    return [1, 2, 3];
}
let [a, b, c] = example();

// 返回一个对象

function example1() {
    return {
        foo: 1,
        bar: 2
    };
}
let {
    foo,
    bar
} = example1();

/**
 * 3.函数参数的定义
 */

// 参数是一组有次序的值
function f([x, y, z]) {
    return x + y + z
}
console.log(f([1, 2, 3]))

// 参数是一组无次序的值
function f1({
    x,
    y,
    z
}) {
    return x + y + z
}
console.log(f1({
    z: 3,
    y: 2,
    x: 1
}));

/**
 * 4.提取 JSON 数据
 */

let jsonData = {
    id: 42,
    status: "OK",
    data: [867, 5309]
};

let {
    id,
    status,
    data: number
} = jsonData;

console.log(id, status, number); // 42 'OK' [ 867, 5309 ]

/**
 * 5.输入模块的指定方法
 */

// const {
//     SourceMapConsumer,
//     SourceNode
// } = require("source-map");
