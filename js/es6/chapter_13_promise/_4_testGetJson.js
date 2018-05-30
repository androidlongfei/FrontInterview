const request = require('request');
const myRequest = require('./_3_getJson');

// 1. 异步依次获取百度 => 网易数据 => 京东数据 （类似同步）
myRequest.getJson('http://www.baidu.com').then(baiduBody => {
    // console.log(baiduBody);
    console.log('get 百度 url success', '百度成功');
    myRequest.getJson('http://www.163.com/')
}, baiduError => {
    console.log('get 百度 url failed', baiduError);
}).then(wangyiBody => {
    // console.log(wangyiBody);
    console.log('get 网易 url success', '网易成功');
    myRequest.getJson('https://www.jd.com/')
}, wangyiError => {
    console.log('get 网易 url failed', '网易失败');
}).then(jdBody => {
    // console.log(jdBody);
    console.log('get 京东 url success', '京东成功');
}, jdError => {
    console.log('get 京东 url failed', '京东成功');
})

// get 百度 url success 百度成功
// get 网易 url success 网易成功
// get 京东 url success 京东成功

// 2. 一般异步

request('http://www.baidu.com', (error, res, body) => {
    if (!error && res.statusCode === 200) {
        // 请求成功
        console.log('一般 get 百度 url success', '百度成功');
        request('http://www.163.com/', (error, res, body) => {
            if (!error && res.statusCode === 200) {
                // 请求成功
                console.log('一般 get 网易 url success', '网易成功');
                request('https://www.jd.com/', (error, res, body) => {
                    if (!error && res.statusCode === 200) {
                        // 请求成功
                        console.log('一般 get 京东 url success', '京东成功');
                    }
                });
            }
        });
    }
});
