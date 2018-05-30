// 使用 async for...of 组合并发执行

const request = require('request');
const url = 'http://127.0.0.1:9100'

const urlArrs = ['/baidu', '/wangyi', '/jd']

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

// (同时执行的异步操作)
const concurrentTest = async () => {
    let promises = [];
    for (let urlItem of urlArrs) {
        promises.push(getUrlData(url + urlItem));
    }
    console.log('promises', promises);
    // 输出 promises [ Promise { <pending> },Promise { <pending> },Promise { <pending> } ]
    let all = await Promise.all(promises);
    console.log('all', all);
    // 输出 all [ { title: '这是百度', nextUrl: '/wangyi' },{ title: '这是网易', nextUrl: '/jd' },{ title: '这是京东', nextUrl: '' } ]
    return all
}

concurrentTest().then(v => {
    console.log('concurrentTest all data', v);
    // 输出 concurrentTest all data [ { title: '这是百度', nextUrl: '/wangyi' },{ title: '这是网易', nextUrl: '/jd' },{ title: '这是京东', nextUrl: '' } ]
})
