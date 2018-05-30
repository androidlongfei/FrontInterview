/**
 * Promise 模拟 ajax
 */

const request = require('request');
const getJson = (url) => {
    return new Promise((resolve, reject) => {
        request(url, (error, res, body) => {
            // console.log('body', body);
            if (!error && res.statusCode === 200) {
                // 请求成功
                resolve(body)
            } else {
                // 请求失败
                reject(reject(new Error('请求出错')))
            }
        });
    });
}

module.exports = { getJson };
