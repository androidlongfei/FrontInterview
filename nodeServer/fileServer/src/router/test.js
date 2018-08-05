import querystring from 'querystring'

class Test {
    constructor() {
        this.paths = ['/api/test']
    }

    // 处理ajax Get请求
    ['GET /api/test'](req, res, params) {
        let expire = (Date.now() + 1 * 60 * 1000) // 1分钟
        let expireTime = new Date(expire).toUTCString()
        console.log('绝对时间expireTime ---->', expireTime);
        res.setHeader('Expires', expireTime)
        res.setHeader('Cache-Control', `public, max-age=${30}`); // 30秒
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        res.end(JSON.stringify({ success: 'ok1' }))
    }

    // 处理ajax Post请求
    ['POST /api/test/list'](req, res, params) {
        let body = ''
        // 每当接收到请求体数据，累加到post中
        req.on('data', function (chunk) {
            body += chunk; // 一定要使用+=，如果body=chunk，因为请求favicon.ico，body会等于{}
            // console.log('chunk:', chunk);
        });
        req.on('end', function () {
            // console.log('body:', body);
            let postParam = ''
            // console.log('req---content-type', req.headers['content-type'])
            if (req.headers['content-type'] === 'application/json;charset=UTF-8') {
                postParam = JSON.parse(body)
            } else if (req.headers['content-type'] === 'application/x-www-form-urlencoded;charset=UTF-8') {
                postParam = querystring.parse(body)
            }
            // console.log('body--->', body);
            console.log('getParam--->', params);
            console.log('postParam--->', postParam);
            res.setHeader('Cache-Control', `public, max-age=${30}`); // 30秒 无效，只对Get请求有效
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify({ success: 'ok', data: postParam }))
        })
    }

    doReq(req, res) {
        console.log('处理test', req.url);
        let urls = req.url.split('?')
        let url = urls[0]
        let params = {}
        if (urls[1]) {
            try {
                params = querystring.parse(urls[1])
            } catch (err) {
                console.log(err);
            }
        }
        let doMethod = `${req.method} ${url}`
        console.log('doMethod', doMethod);
        if (this[doMethod]) {
            this[doMethod](req, res, params)
        } else {
            console.log('路由不存在');
            res.writeHead(404, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify({ message: '找不到路由' }))
        }
    }
}
module.exports = new Test()
