const myRequest = require('./_3_getJson');

const url = 'http://127.0.0.1:9100'

/**
 * 1.Promise.prototype.catch方法是.then(null, rejection)的别名，用于指定发生错误时的回调函数。
 */

myRequest.getJson(url + '/baidu1').then(res => {
    console.log('百度成功', res);
    let resJson = JSON.parse(res);
    return myRequest.getJson(url + resJson.nextUrl)
}).catch(error => {
    console.log('catch error', error);
});

// catch error Error: 请求出错

myRequest.getJson(url + '/baidu1').then(res => {
    console.log('百度成功', res);
    let resJson = JSON.parse(res);
    return myRequest.getJson(url + resJson.nextUrl)
}, error => {
    console.log('reject error', error);
});

// reject error Error: 请求出错


// 由以上可知，它们是等价的


/**
 * 2.then方法指定的回调函数，如果运行中抛出错误，也会被catch方法捕获。
 */

myRequest.getJson(url + '/baidu').then(res => {
    console.log('百度成功', res);
    throw new Error('test'); // 抛出错误，捕获后，后面就不执行了
    let resJson = JSON.parse(res);
    return myRequest.getJson(url + resJson.nextUrl)
}).then(res => {
    console.log('网易成功', res);
    let resJson = JSON.parse(res);
    return myRequest.getJson(url + resJson.nextUrl)
}).catch(error => {
    console.log('error', error);
});

// error Error: test




/**
 * 3.如果 Promise 状态已经变成resolved，再抛出错误是无效的。
 */

const promise = new Promise(function (resolve, reject) {
    resolve('ok');
    throw new Error('test');
});
promise
    .then(function (value) { console.log(value) })
    .catch(function (error) { console.log(error) });

// ok

/**
 * 代码解析
 * 上面代码中，Promise 在resolve语句后面，再抛出错误，不会被捕获，等于没有抛出。因为 Promise 的状态一旦改变，就永久保持该状态，不会再变了。
 */


/**
 * 4.以上三点归总
 * 一般来说，不要在then方法里面定义 Reject 状态的回调函数（即then的第二个参数），总是使用catch方法。
 * 跟传统的try/catch代码块不同的是，如果没有使用catch方法指定错误处理的回调函数，Promise 对象抛出的错误不会传递到外层代码，即不会有任何反应。
 */


/**
 * 5.一般总是建议，Promise 对象后面要跟catch方法，这样可以处理 Promise 内部发生的错误。
 * catch方法返回的还是一个 Promise 对象，因此后面还可以接着调用then方法。
 */

myRequest.getJson(url + '/baidu1').then(res => {
    console.log('百度成功', res);
    let resJson = JSON.parse(res);
    return myRequest.getJson(url + resJson.nextUrl)
}).catch(error => {
    console.log('获取百度失败', error);
    return myRequest.getJson(url + '/wangyi')
}).then(res => {
    console.log('网易成功', res);
    let resJson = JSON.parse(res);
    return myRequest.getJson(url + resJson.nextUrl)
}).catch(error => {
    console.log('获取网易失败', error);
    return myRequest.getJson(url + '/jd')
}).then(res => {
    console.log('京东成功', res);
}).catch(error => {
    console.log('获取京东失败', error);
});
