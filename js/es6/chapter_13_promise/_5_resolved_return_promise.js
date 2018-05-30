/**
 * 如果调用resolve函数和reject函数时带有参数，那么它们的参数会被传递给回调函数。reject函数的参数通常是Error对象的实例，表示抛出的错误；
 * resolve函数的参数除了正常的值以外，还可能是另一个Promise实例.
 */

// resolve函数的参数是Promise实例如下

const p1 = new Promise(function (resolve, reject) {
    setTimeout(() => reject(new Error('fail')), 2000)
})

const p2 = new Promise(function (resolve, reject) {
    setTimeout(() => resolve(p1), 1000)
})

p2.then(result => { console.log(result) }).catch(error => { console.log(error) })

// Error: fail

/**
 * 代码解析
 * 上面代码中，p1是一个 Promise，3 秒之后变为rejected。p2的状态在 1 秒之后改变，resolve方法返回的是p1。
 * 由于p2返回的是另一个 Promise，导致p2自己的状态无效了，由p1的状态决定p2的状态。
 * 所以，后面的then语句都变成针对后者（p1）。又过了 2 秒，p1变为rejected，导致触发catch方法指定的回调函数。
 */


// 注意，调用resolve或reject并不会终结 Promise 的参数函数的执行。

// 一般来说，调用resolve或reject以后，Promise 的使命就完成了，后继操作应该放到then方法里面，而不应该直接写在resolve或reject的后面。
// 所以，最好在它们前面加上return语句，这样就不会有意外.

// 错误写法
new Promise((resolve, reject) => {
    resolve(1);
    console.log(2);
}).then(r => {
    console.log(r);
});

// 2 1

// 正确写法
new Promise((resolve, reject) => {
    return resolve(1);
    // 后面的语句不会执行
    console.log(2);
}).then(r => {
    console.log('---' + r);
});

// ---1
