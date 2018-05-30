// 函数参数扩展符 , rest

/**
 * ES6 引入 rest 参数（形式为...变量名），用于获取函数的多余参数，这样就不需要使用arguments对象了。
 * rest 参数搭配的变量是一个数组，该变量将多余的参数放入数组中。
 */

/**
 * 1 基本使用
 */

function add(...values) {
    let sum = 0;

    for (let val of values) {
        sum += val;
    }

    return sum;
}

console.log(add(2, 5, 3)); // 10

/**
 * 2 多个参数(rest参数在最后)
 */

function push(array, ...items) {
    items.forEach(function (item) {
        array.push(item);
    });
    console.log(array);
}

push([], 1, 2, 3) // [1,2,3]

/**
 * 3 rest 参数之后不能再有其他参数（即只能是最后一个参数），否则会报错
 */

// 报错 Rest parameter must be last formal parameter
// function f1(a, ...b, c) {}
