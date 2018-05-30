// Promise.race方法同样是将多个 Promise 实例，包装成一个新的 Promise 实例。
// const p = Promise.race([p1, p2, p3]);

/**
 * 上面代码中，只要p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变。
 * 那个率先改变的 Promise 实例的返回值，就传递给p的回调函数。
 */
