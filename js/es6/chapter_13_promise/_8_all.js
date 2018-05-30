/**
 * Promise.all方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。
 * const p = Promise.all([p1, p2, p3]);
 */

/**
 * Promise.all方法接受一个数组作为参数.数组每一项都是一个Promise实例.
 */

// p的状态由p1、p2、p3决定，分成两种情况。

/**
 * (1).只有p1、p2、p3的状态都变成fulfilled，p的状态才会变成fulfilled，此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数。
 * (2).只要p1、p2、p3之中有一个被rejected，p的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数。
 * (3).如果作为参数的 Promise实例，自己定义了catch方法，那么它一旦被rejected，并不会触发Promise.all()的catch方法。
 */

const request = require('request');
const myRequest = require('./_3_getJson');
const url = 'http://127.0.0.1:9100';

// 第一种情况，所有的请求都正确

let p1 = myRequest.getJson(url + '/baidu')
let p2 = myRequest.getJson(url + '/wangyi')
let p3 = myRequest.getJson(url + '/jd')

let promises = []
promises.push(p1)
promises.push(p2)
promises.push(p3)

Promise.all(promises).then(posts => {
    console.log('第一种:', posts);
}).catch(error => {
    console.log('第一种:', error);
});

// 输出结果如下:
// 第一种: [ '{"title":"这是百度","nextUrl":"/wangyi"}','{"title":"这是网易","nextUrl":"/jd"}','{"title":"这是京东","nextUrl":""}' ]


// 第二种情况，有一个请求出错

let p11 = myRequest.getJson(url + '/baidu');
let p12 = myRequest.getJson(url + '/wangyi1'); // 错误的地址
let p13 = myRequest.getJson(url + '/jd');
console.log('p11', p11);
let promises1 = [];
promises1.push(p11);
promises1.push(p12);
promises1.push(p13);

Promise.all(promises1).then(posts => {
    console.log('第二种:', posts);
}).catch(error => {
    console.log('第二种:', error);
});

// 第二个请求出错,输出结果如下:
// 第二种: Error: 请求出错


// 第三种情况,如果一个请求出错,所有的请求都返回


let p21 = new Promise((resolve, reject) => {
    request(url + '/baidu', (error, res, body) => {
        // console.log('body', body);
        if (!error && res.statusCode === 200) {
            // 请求成功
            resolve(body)
        } else {
            // 请求失败
            resolve(error)
        }
    })
})

let p22 = new Promise((resolve, reject) => {
    request(url + '/wangyi1', (error, res, body) => {
        // console.log('body', body);
        if (!error && res.statusCode === 200) {
            // 请求成功
            resolve(body)
        } else {
            // 请求失败
            console.log('error', error);
            resolve(error)
        }
    })
})

let p23 = new Promise((resolve, reject) => {
    request(url + '/jd', (error, res, body) => {
        // console.log('body', body);
        if (!error && res.statusCode === 200) {
            // 请求成功
            resolve(body)
        } else {
            // 请求失败
            // reject(error)
            resolve(error)
        }
    })
})

let promises2 = [];
promises2.push(p21);
promises2.push(p22);
promises2.push(p23);

Promise.all(promises2).then(posts => {
    console.log('第三种:', posts);
}).catch(error => {
    console.log('第三种:', error);
});

// 输出结果如下:
// 第三种: [ '{"title":"这是百度","nextUrl":"/wangyi"}',null,'{"title":"这是京东","nextUrl":""}' ]
