// 函数参数默认值

/**
 * 1.基本用法
 */


function log(x, y = 'World') {
    console.log(x, y);
}

log('Hello') // Hello World
log('Hello', 'China') // Hello China
log('Hello', '') // Hello

/**
 * 2.与解构赋值默认值结合使用
 */


function foo({
    x,
    y = 5
}) {
    console.log(x, y);
}

foo({}) // undefined 5
foo({
    x: 1
}) // 1 5
foo({
    x: 1,
    y: 2
}) // 1 2

// foo() // Cannot match against 'undefined' or 'null'


function foo1({
    x,
    y = 5
} = {}) {
    console.log(x, y);
}

foo1() // undefined 5
