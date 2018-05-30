// 一、基本用法

/**
 * ES6 规定，Promise对象是一个构造函数，用来生成Promise实例。
 */

let isSuccess = true
const p = new Promise((resolve, reject) => {
    if (isSuccess) {
        resolve('success');
    } else {
        reject('failed');
    }
})
p.then(resolveFnParameter => {
    console.log('resolveFnParameter', resolveFnParameter);
}, rejectFnParameter => {
    console.log('rejectFnParameter', rejectFnParameter);
});

// isSuccess=true 输出 resolveFnParameter success
// isSuccess=fasle 输出 rejectFnParameter failed

/**
 * 代码解析:
 * 1.Promise构造函数接受一个函数作为参数，该函数的两个参数分别是resolve和reject。它们是两个函数，由 JavaScript 引擎提供，不用自己部署。
 * 2.resolve函数的作用是，将Promise对象的状态从“未完成”变为“成功”（即从 pending 变为 resolved），在异步操作成功时调用，并将异步操作的结果，作为参数传递出去。
 * 3.reject函数的作用是，将Promise对象的状态从“未完成”变为“失败”（即从 pending 变为 rejected），在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。
 * 4.Promise实例生成以后，可以用then方法分别指定resolved状态和rejected状态的回调函数。
 */

/**
 * then方法可以接受两个回调函数作为参数。
 * 第一个回调函数是Promise对象的状态变为resolved时调用。
 * 第二个回调函数是Promise对象的状态变为rejected时调用。
 * 第二个函数是可选的，不一定要提供。这两个函数都接受Promise对象传出的值作为参数。
 */

// 二、Promise新建后就会立即执行。

let p1 = new Promise((resolve, reject) => {
    console.log('立即执行');
    resolve()
})
p1.then(resolve => {
    console.log('resolve');
})

// 立即执行
// resolve


let p2 = new Promise((resolve, reject) => {
    console.log('立即执行p2');
    resolve()
})

// 没有任何输出，表示p2没执行
// 可见必须Promise.then()，才会执行Promise
