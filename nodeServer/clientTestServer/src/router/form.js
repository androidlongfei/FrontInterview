const formidable = require('formidable');
import _ from 'lodash';
import fs from 'fs'
import config from '../config/global.js'
var path = require('path');
import testJson from '../testData/test.js'
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

    // xhr.response.json
    app.post('/form/responseJson', function (req, res) {
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

    // xhr.withCredentials
    app.post('/form/withCredentials', function (req, res) {
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
    app.post('/form/sendJson', function (req, res) {
        console.log('post参数', req.body);
        console.log('get参数', req.query)
        res.json({
            message: 'send json ok',
            data: req.body
        })
    });

    // xhr.send(json)
    app.post('/form/requestInitInfoData', function (req, res) {
        // console.log('post参数', req.body);
        // console.log('data', req.body.data)
        fs.writeFile('./test.txt', req.body.data, function (err) {
            if (err) {
                throw err;
            }
            console.log('Saved.');
        });
        res.json({
            message: 'send json ok'
        })
    });

    // xhr.send(json)
    app.post('/form/bloodressure', function (req, res) {
        console.log('post参数', req.body);
        let data = fs.readFileSync('./src/testData/testData.json')
        let dataJson = JSON.parse(data);
        console.log('data', dataJson)
        console.log('data', testJson)
        res.json({
            message: 'send json ok',
            data: testJson
        })
    });

    // 测试jsonp
    app.get('/form/jsonp', function (req, res) {
        console.log('get参数', req.query)
        if (req.query.cb) {
            let resData = {
                message: '成功'
            }
            // query.cb是前后端约定的方法名字，其实就是后端返回一个直接执行的方法给前端，由于前端是用script标签发起的请求，
            // 所以返回了这个方法后相当于立马执行，并且把要返回的数据放在方法的参数里
            res.send(`${req.query.cb}(${JSON.stringify(resData)})`)
        }
    });
}
