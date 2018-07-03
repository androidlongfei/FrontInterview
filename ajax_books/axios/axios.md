# axios 源码解读

- [github](https://github.com/axios/axios)
- [源码解读](https://github.com/ronffy/axios-tutorial)
- [使用文档](https://segmentfault.com/a/1190000008470355?utm_source=tuicool&utm_medium=referral)
- [文档](https://cloud.tencent.com/developer/article/1098141)

部分源码如下:

`default.js`代码片段

```javascript
transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
        utils.isArrayBuffer(data) ||
        utils.isBuffer(data) ||
        utils.isStream(data) ||
        utils.isFile(data) ||
        utils.isBlob(data)
    ) {
        return data;
    }
    if (utils.isArrayBufferView(data)) {
        return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
        setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
        return data.toString();
    }
    if (utils.isObject(data)) {
        setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
        return JSON.stringify(data);
    }
    return data;
}]
```

`utils.js`代码片段

```javascript
function isURLSearchParams(val) {
    return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}
```

`xhr.js`代码片段

```javascript
var requestData = config.data;
var requestHeaders = config.headers;

if (utils.isFormData(requestData)) {
  delete requestHeaders['Content-Type']; // Let the browser set it
}

var request = new XMLHttpRequest();
if (requestData === undefined) {
  requestData = null;
}

// Send the request
request.send(requestData);
```

由以上代码可知:

1. axios默认是使用URLSearchParams对象序列化参数来发送form表单数据(`'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'`).
2. axios默认会将json对象序列化json字符串来发送json数据(`'Content-Type': 'application/json; charset=UTF-8'`)

## 2.发送Get请求

```javascript
axios.get('http://127.0.0.1:9100/axios/getOne', {
        params: {
            id: 12345,
            name: '张三',
            love: {
                sport: ['football'],
                food: 'meal'
            }
        }
    })
    .then(function (res) {
        console.log('one get res', res);
    })
    .catch(function (error) {
        console.log(error);
    });
```

> Content-Type默认值为`application/json; charset=utf-8`

自定义axios如下:

```javascript
axios({
    url: 'http://127.0.0.1:9100/axios/getTwo',
    method: 'get',
    params: {
        id: 12345,
        name: '张三',
        love: {
            sport: ['football'],
            food: 'meal'
        }
    },
    data: {},
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    transformRequest: [function (data) {
        return data;
    }]
}).then(function (res) {
    console.log('two get res', res);
}).catch(function (error) {
    console.log('two error', error)
})
```

> Content-Type值为`application/x-www-form-urlencoded`

`Content-Type`的值不影响Get请求

## 3.使用application/x-www-form-urlencoded发送POST请求

### 3.1用URLSearchParams对象序列化参数

- [URLSearchParams Demo](https://www.cnblogs.com/coolle/p/7027950.html)

axios默认是使用URLSearchParams对象序列化参数来发送form表单数据。主要是为了大部分后端框架通用。

### 3.2使用qs库来编码数据
