const formidable = require('formidable');
// import _ from 'lodash';
module.exports = function (app) {
    app.get('/axios/getOne', function (req, res) {
        console.log('post参数', req.body);
        console.log('get参数', req.query)
        // console.log('headers参数', req.headers);
        res.json({
            message: '请求成功'
        });
    });

    app.get('/axios/getTwo', function (req, res) {
        console.log('post参数', req.body);
        console.log('get参数', req.query)
        // console.log('headers参数', req.headers);
        res.json({
            message: '请求成功'
        });
    });

    app.get('/axios/getThree/:id', function (req, res) {
        console.log('post参数', req.body);
        console.log('get参数', req.query);
        console.log('params参数', req.params);
        res.json({
            message: '请求成功'
        });
    });

    app.get('/axios/testGet', function (req, res) {
        console.log('post参数', req.body);
        console.log('get参数', req.query)
        console.log('headers参数', req.headers);
        res.json({
            message: '提交成功GET'
        });
    });

    app.post('/axios/testPOST', function (req, res) {
        console.log('post参数', req.body);
        console.log('get参数', req.query)
        console.log('headers参数', req.headers);
        res.json({
            message: '提交成功POST'
        });
    });

    // xhr.timeout
    app.get('/axios/timeout', function (req, res) {
        console.log('post参数', req.body);
        console.log('get参数', req.query)
        setTimeout(() => {
            res.json({
                message: '超时回调'
            })
        }, 3000)
    });

    // xhr.formData text
    app.post('/axios/formdataText', function (req, res) {
        console.log('post参数', req.body);
        console.log('get参数', req.query)
        var form = new formidable.IncomingForm();
        var resObj = {}
        form.parse(req, function (err, fields, files) {
            if (err) {
                console.log(err)
            }
            console.log('formdata参数', fields)
            resObj = fields
            res.json({
                message: 'formdata text ok',
                data: resObj
            })
        })
    });

    // xhr.withCredentials
    app.post('/axios/withCredentials', function (req, res) {
        console.log('post参数', req.body);
        console.log('get参数', req.query)
        res.json({
            message: 'formdata text ok',
            data: req.headers
        })
        // console.log('headers', req.headers)
        // console.log(res.respon)
        res.header('token', '123124')
        console.log('Cookies: ', req.cookies)
        // Cookies that have been signed
        console.log('Signed Cookies: ', req.signedCookies)
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            if (err) {
                console.log(err)
            }
            console.log('formdata参数', fields)
            // 设置cookie，maxAge为过期时长，毫秒为单位，此处设置一分钟
            res.cookie('islogin', 'sucess', { maxAge: 60000 });
            res.json({
                message: 'formdata text ok',
                data: req.headers
            })
        })
    });

    // xhr.send(json)
    app.post('/axios/sendJson', function (req, res) {
        console.log('post参数', req.body);
        console.log('get参数', req.query)
        res.json({
            message: 'send json ok',
            data: req.body
        })
    });
}
