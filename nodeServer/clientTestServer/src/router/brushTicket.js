// 刷票

import axios from 'axios'
import async from 'async'

module.exports = function (app) {
    app.post('/test', function (req, res) {
        console.log('/test')
        res.json({
            'number': 80
        });
    });

    app.post('/testPost', function (req, res) {
        console.log('testPost body data', req.body);
        console.log('testPost headers', req.headers);
        res.json(req.body);
    });

    app.get('/ticket', function (req, res) {
        console.log('/ticket')
        let user = '13650079856'
        let password = 'zztt0318'
        async.waterfall([
            // 1.获取区域码接口
            (cb) => {
                axios({
                    url: 'https://passport.iqiyi.com/apis/phone/get_support_areacode.action',
                    method: 'post',
                    params: {},
                    data: {
                        local: 1,
                        agenttype: 1,
                        ptid: '01010021010000000000'
                    },
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    transformRequest: [function (data) {
                        var dataStr = stringify(data)
                        console.log('dataStr', dataStr)
                        return dataStr
                    }]
                }).then(function (res) {
                    // console.log('two get res.status', res.status);
                    console.log('two get res.data', res.data);
                    cb(null, res.data)
                }).catch(function (error) {
                    console.log('two error', error)
                    cb(error)
                })
            },
            (areaData, cb) => {
                console.log('areaData', areaData);
                cb(null, areaData)
            }
        ], (err, result) => {
            if (err) {
                console.log('err', err);
            }
            console.log('res data', result)
            res.json(result);
        })
    });
}

// 序列化json对象
function stringify(data) {
    if (typeof data !== 'object') {
        return data
    }
    var strList = []
    var str = ''
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            var val = data[key]
            if (!val) {
                val = ''
            }
            if (val && typeof val !== 'string') {
                val = JSON.stringify(val)
            }
            var item = key + '=' + encodeURIComponent(val)
            strList.push(item)
        }
    }
    // console.log('strList =>', strList)
    for (var i = 0; i < strList.length; i++) {
        str += strList[i]
        if (i != (strList.length - 1)) {
            str += '&'
        }
    }
    // console.log('str =>', str)
    return str
}
