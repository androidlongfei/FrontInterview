/**
 * Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写
 */


/**
 * ES6 原生提供 Proxy 构造函数，用来生成 Proxy 实例。
 * var proxy = new Proxy(target, handler);
 */

let proxy = new Proxy({}, {
    get: function (target, property) {
        return 35;
    }
});

console.log(proxy.name); // 35
console.log(proxy.age); // 35

/**
 *
 * 如果handler没有设置任何拦截，那就等同于直接通向原对象
 */

let target1 = {};
let handler1 = {};
let proxy1 = new Proxy(target1, handler1);
proxy1.a = 'b';
console.log('handler1', handler1);
console.log('target1', target1, target1 === proxy1);
console.log(target1.a) // "b"
