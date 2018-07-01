var formidable = require('formidable');
import _ from 'lodash';
var fs = require('fs');
import config from '../config/global.js'
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

    // xhr.timeout
    app.get('/form/timeout', function (req, res) {
        console.log('post参数', req.body);
        console.log('get参数', req.query)
        setTimeout(() => {
            res.json({
                message: '超时回调'
            })
        }, 3000)
    });

    // xhr.formData text
    app.post('/form/formdataText', function (req, res) {
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

    // xhr.formData single file
    app.post('/form/formdataFile/single', function (req, res) {
        console.log('post参数', req.body);
        console.log('get参数', req.query)
        var form = new formidable.IncomingForm();
        var uploadDir = app.get('uploadDir');
        form.uploadDir = uploadDir;
        form.parse(req, function (err, fields, files) {
            if (err) { console.log(err) }
            console.log('files......', files);
            console.log('fields......', fields);
            let resImgs = []
            _.each(files, function (file) {
                console.log('file.name', file)
                let suffs = file.name.split('.')
                let fileSuffix = suffs[suffs.length - 1]
                let oldname = file.path;
                let newname = `${oldname}.${fileSuffix}`
                newname = `${uploadDir}/${file.name}` // 使用原始名字
                fs.rename(oldname, newname, function (err) {
                    if (err) console.log(err);
                    let name = ''
                    name = newname.substring(newname.lastIndexOf('/') + 1, newname.length)
                    let resImg = {};
                    resImg.path = `${config.host}:${config.port}/download/${name}`
                    resImg.orginName = file.name
                    resImg.size = file.size
                    resImgs.push(resImg)
                    res.json({
                        message: 'formdata upload single file ok',
                        data: resImgs
                    })
                })
            })
        })
    });

    // xhr.formData multiple file
    app.post('/form/formdataFile/multiple', function (req, res) {
        console.log('post参数', req.body);
        console.log('get参数', req.query)
        let form = new formidable.IncomingForm();
        let uploadDir = app.get('uploadDir');
        // 设置上传图片路径
        form.uploadDir = uploadDir;
        let files = {}
        let fields = {}
        form.on('field', function (field, value) {
            fields[field] = value
        }).on('file', function (field, file) {
            if (!files[field]) {
                files[field] = []
            }
            files[field].push(file)
        }).on('end', function () {
            console.log('files......', files);
            console.log('fields......', fields);
            let resImgs = []
            _.each(files.myfile, function (file) {
                let suffs = file.name.split('.')
                let fileSuffix = suffs[suffs.length - 1]
                let oldname = file.path;
                let newname = `${oldname}.${fileSuffix}`
                newname = `${uploadDir}/${file.name}` // 使用原始名字
                fs.rename(oldname, newname, function (err) {
                    if (err) console.log(err);
                    let name = ''
                    name = newname.substring(newname.lastIndexOf('/') + 1, newname.length)
                    let resImg = {};
                    resImg.path = `${config.host}:${config.port}/download/${name}`
                    resImg.orginName = file.name
                    resImg.size = file.size
                    resImgs.push(resImg)
                    if (files.myfile.length === resImgs.length) {
                        res.json({
                            message: 'formdata upload multiple file ok',
                            data: resImgs
                        })
                    }
                })
            })
        });
        form.parse(req);
    });

    // xhr.setRequestHeader
    app.post('/form/setRequestHeader', function (req, res) {
        console.log('post参数', req.body);
        console.log('get参数', req.query)
        console.log('headers', req.headers)
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            if (err) {
                console.log(err)
            }
            console.log('formdata参数', fields)
            res.json({
                message: 'formdata text ok',
                data: req.headers
            })
        })
    });

    // xhr.getResponseHeader
    app.post('/form/getResponseHeader', function (req, res) {
        console.log('post参数', req.body);
        console.log('get参数', req.query)
        // console.log('headers', req.headers)
        // console.log(res.respon)
        res.header('token', '123124')
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            if (err) {
                console.log(err)
            }
            console.log('formdata参数', fields)
            res.json({
                message: 'formdata text ok',
                data: req.headers
            })
        })
    });
}
