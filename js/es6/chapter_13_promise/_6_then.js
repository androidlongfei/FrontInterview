// Promise 实例具有then方法，也就是说，then方法是定义在原型对象Promise.prototype上的。它的作用是为 Promise 实例添加状态改变时的回调函数。

// then方法的第一个参数是resolved状态的回调函数，第二个参数（可选）是rejected状态的回调函数。


// then方法返回的是一个新的Promise实例（注意，不是原来那个Promise实例）。因此可以采用链式写法，即then方法后面再调用另一个then方法。

const myRequest = require('./_3_getJson');

const url = 'http://127.0.0.1:9100'

myRequest.getJson(url + '/baidu').then(res => {
    console.log('百度成功', res);
    let resJson = JSON.parse(res);
    return myRequest.getJson(url + resJson.nextUrl)
}).then(res => {
    console.log('网易成功', res);
    let resJson = JSON.parse(res);
    return myRequest.getJson(url + resJson.nextUrl)
}).then(res => {
    console.log('京东成功', res);
}).catch(error => {
    console.log(error);
});

// 上面代码中，第一个then方法指定的回调函数，返回的是另一个Promise对象。
// 这时，第二个then方法指定的回调函数，就会等待这个新的Promise对象状态发生变化。

// 链式调用就像jQuery库一样，每个jQuery方法都会返回jQuery对象
