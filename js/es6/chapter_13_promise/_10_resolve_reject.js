// 有时需要将现有对象转为 Promise 对象，Promise.resolve方法就起到这个作用。

// Promise.resolve等价于下面的写法。

let p1 = Promise.resolve('foo')

let p2 = new Promise(resolve => resolve('foo'))

console.log(p1); // Promise { 'foo' }
console.log(p2); // Promise { 'foo' }

// 写法 p1 等价于 p2


// 需要注意的是，立即resolve的 Promise 对象，是在本轮“事件循环”（event loop）的结束时，而不是在下一轮“事件循环”的开始时。

setTimeout(function () {
    console.log('three');
}, 0);

Promise.resolve().then(function () {
    console.log('two');
});

console.log('one');

// one
// two
// three

/**
 * 代码分析
 * setTimeout(fn, 0)在下一轮“事件循环”开始时执行，
 * Promise.resolve()在本轮“事件循环”结束时执行，
 * console.log('one')则是立即执行，因此最先输出。
 */

/**
 * reject用法与resolve一样
 */
