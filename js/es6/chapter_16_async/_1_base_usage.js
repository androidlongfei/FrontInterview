// ES2017 标准引入了 async 函数，使得异步操作变得更加方便。
// async 函数是什么？一句话，它就是 Generator 函数的语法糖。

/**
 * 一.基本用法
 * async函数返回一个 Promise 对象，可以使用then方法添加回调函数。当函数执行的时候，一旦遇到await就会先返回，等到异步操作完成，再接着执行函数体内后面的语句。
 */


async function f() {
    return 'hello world';
}

f().then(v => console.log(v))
// "hello world"

// nodejs使用的是CommonJS的模块化规范，import是ES6的模块化规范关键字。使用import，必须引入babel转义支持。

const request = require('request');
const url = 'http://127.0.0.1:9100'


const getUrlData = (url) => {
    return new Promise((resolve, reject) => {
        request(url, (error, res, body) => {
            // console.log('body', body);
            if (!error && res.statusCode === 200) {
                // 请求成功
                resolve(JSON.parse(body))
            } else {
                // 请求失败
                resolve({ error: '请求出错' })
            }
        });
    });
}

// async函数返回的 Promise 对象，必须等到内部所有await命令后面的 Promise 对象执行完，才会发生状态改变.只有async函数内部的异步操作执行完，才会执行then方法指定的回调函数.
// await命令后面是一个 Promise 对象。如果不是，会被转成一个立即resolve的 Promise 对象。
// async函数内部return语句返回的值，会成为then方法回调函数的参数。

// *按顺序触发(按顺序完成异步操作)
const orderlyTest = async () => {
    let baidu = await getUrlData(url + '/baidu') // getUrlData函数会返回一个Promise对象
    console.log('1 baidu', baidu);
    let wangyi = await getUrlData(url + baidu.nextUrl)
    console.log('2 wangyi', wangyi);
    let jd = await getUrlData(url + wangyi.nextUrl)
    console.log('3 jd', jd);
    return [baidu, wangyi, jd]
}

// 输出 1 baidu 1 baidu { title: '这是百度', nextUrl: '/wangyi' } 2 wangyi { title: '这是网易', nextUrl: '/jd' } 3 jd { title: '这是京东', nextUrl: '' }

orderlyTest().then(v => {
    console.log('orderlyTest all data', v);
})

// 输出 orderlyTest all data [ { title: '这是百度', nextUrl: '/wangyi' },{ title: '这是网易', nextUrl: '/jd' },{ title: '这是京东', nextUrl: '' } ]


// *同时触发(同时执行的异步操作)
const concurrentTest = async () => {
    let all = await Promise.all([getUrlData(url + '/baidu'), getUrlData(url + '/wangyi'), getUrlData(url + '/jd')])
    console.log('all', all);
    return all
}

// 输出 all [ { title: '这是百度', nextUrl: '/wangyi' },{ title: '这是网易', nextUrl: '/jd' },{ title: '这是京东', nextUrl: '' } ]

concurrentTest().then(v => {
    console.log('concurrentTest all data', v);
})

// 输出 concurrentTest all data [ { title: '这是百度', nextUrl: '/wangyi' },{ error: '请求出错' },{ title: '这是京东', nextUrl: '' } ]

/**
 * 二.使用注意点
 * 1.await命令后面的Promise对象，运行结果可能是rejected，所以最好把await命令放在try...catch代码块中
 * 2.多个await命令后面的异步操作，如果不存在继发关系，最好让它们同时触发。
 * 3.await命令只能用在async函数之中，如果用在普通函数，就会报错。
 */
