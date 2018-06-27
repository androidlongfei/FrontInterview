module.exports = function (app) {
    app.post('/form/submitPersonInfo', function (req, res) {
        console.log('post参数', req.body);
        console.log('get参数', req.query)
        console.log('headers参数', req.headers);
        res.json({
            message: '提交成功'
        });
    });

    app.get('/form/submitPersonInfo', function (req, res) {
        console.log('post参数', req.body);
        console.log('get参数', req.query)
        console.log('headers参数', req.headers);
        res.json({
            message: '提交成功'
        });
    });

    app.get('/form/testGet', function (req, res) {
        console.log('post参数', req.body);
        console.log('get参数', req.query)
        console.log('headers参数', req.headers);
        res.json({
            message: '提交成功GET'
        });
    });

    app.post('/form/testPOST', function (req, res) {
        console.log('post参数', req.body);
        console.log('get参数', req.query)
        console.log('headers参数', req.headers);
        res.json({
            message: '提交成功POST'
        });
    });
}
