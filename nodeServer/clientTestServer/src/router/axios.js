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

    app.post('/axios/postOne', function (req, res) {
        console.log('post参数', req.body);
        console.log('get参数', req.query)
        console.log('params参数', req.params);
        res.json({
            message: 'postOne请求成功'
        });
    });

    app.post('/axios/postTwo/:id', function (req, res) {
        console.log('post参数', req.body);
        console.log('get参数', req.query);
        console.log('params参数', req.params);
        res.json({
            message: 'postTwo请求成功'
        });
    });

    app.post('/axios/postThree', function (req, res) {
        console.log('post参数', req.body);
        console.log('get参数', req.query);
        console.log('params参数', req.params);
        res.json({
            message: 'postThree请求成功'
        });
    });

    app.post('/axios/json/postOne', function (req, res) {
        console.log('post参数', req.body);
        console.log('get参数', req.query)
        console.log('params参数', req.params);
        res.json({
            message: 'postOne请求成功'
        });
    });

    app.post('/axios/json/postTwo/:id', function (req, res) {
        console.log('post参数', req.body);
        console.log('get参数', req.query)
        console.log('params参数', req.params);
        res.json({
            message: 'postTwo请求成功'
        });
    });

    app.post('/axios/json/postThree', function (req, res) {
        console.log('post参数', req.body);
        console.log('get参数', req.query)
        console.log('params参数', req.params);
        res.json({
            message: 'postThree请求成功'
        });
    });
}
