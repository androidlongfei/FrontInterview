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

```javascript
var params = new URLSearchParams();
var love = {
    sport: ['football'],
    food: 'meal'
}
params.append('id', '2345');
params.append('name', '李四');
params.append('love', JSON.stringify(love));
console.log('params=>', params.toString());
// params => id=2345&name=%E6%9D%8E%E5%9B%9B&love=%7B%22sport%22%3A%5B%22football%22%5D%2C%22food%22%3A%22meal%22%7D
axios({
    url: 'http://127.0.0.1:9100/axios/postOne',
    method: 'post',
    params: {
        id: 56789,
        name: '李四',
        test: {
            sport: ['swimming'],
            food: 'meal'
        }
    },
    data: params,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    transformRequest: [function (data) {
        return data;
    }]
}).then(function (res) {
    console.log('two post res', res);
}).catch(function (error) {
    console.log('two error', error)
})
// Content-Type: application/x-www-form-urlencoded
```

axios默认会转化URLSearchParams对象,如下:

```javascript
if (utils.isURLSearchParams(data)) {
    setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
    return data.toString();
}
```

> URLSearchParams不是所有的浏览器均支持,建议使用qs库来编码数据

### 3.2使用qs库来编码数据

```javascript
var paramData = {
    id: 6757,
    name: '王五',
    test: {
        sport: ['swimming', 'football'],
        food: 'meal'
    },
    haha: '',
    haha1: undefined,
    haha2: null
}
axios({
    url: 'http://127.0.0.1:9100/axios/postThree',
    method: 'post',
    params: {
        id: 56789,
        name: '李四',
        test: {
            sport: ['swimming'],
            food: 'meal'
        }
    },
    data: paramData,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    transformRequest: [function (data) {
        // transformRequest 允许在向服务器发送前，修改请求数据
        // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法

        // 使用qs库,序列化json对象
        // var dataStr = qs.stringify(data)
        // 自定义qs,序列化json对象
        var dataStr = stringify(data)
        console.log('dataStr', dataStr)
        return dataStr
    }]
}).then(function (res) {
    console.log('three post res', res);
}).catch(function (error) {
    console.log('three error', error)
})
```

自定义序列化工具函数如下:

```javascript
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
            var item = key + '=' + window.encodeURIComponent(val)
            strList.push(item)
        }
    }
    console.log('strList =>', strList)
    for (var i = 0; i < strList.length; i++) {
        str += strList[i]
        if (i != (strList.length - 1)) {
            str += '&'
        }
    }
    console.log('str =>', str)
    return str
}
```

## 4.使用application/json;charset=utf-8发送POST请求

```javascript
var paramData = {
    id: 6757,
    name: '王五',
    test: {
        sport: ['swimming', 'football'],
        food: 'meal'
    }
}
axios({
    url: 'http://127.0.0.1:9100/axios/json/postOne',
    method: 'post',
    params: {
        id: 56789,
        name: '李四',
        test: {
            sport: ['swimming'],
            food: 'meal'
        }
    },
    data: JSON.stringify(paramData),
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    }
}).then(function (res) {
    console.log('one post res', res);
}).catch(function (error) {
    console.log('one error', error)
})
```

axios默认会将需要发送的josn对象序列化为字符串,代码如下:

```javascript
if (utils.isObject(data)) {
    setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
    return JSON.stringify(data);
}
```

故此如下代码也行:

```javascript
axios({
    url: 'http://127.0.0.1:9100/axios/json/postTwo/103',
    method: 'post',
    params: {
        id: 56789,
        name: '李四',
        test: {
            sport: ['swimming'],
            food: 'meal'
        }
    },
    data: paramData,
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    }
}).then(function (res) {
    console.log('two post res', res);
}).catch(function (error) {
    console.log('two error', error)
})
```

自定义transformRequest时，会覆盖默认值。所以需要手动序列化参数或者通过`JSON.stringify(data)`序列化成json字符串。

自定义transformRequest代码如下:

```javascript
axios({
    url: 'http://127.0.0.1:9100/axios/json/postThree',
    method: 'post',
    params: {
        id: 56789,
        name: '李四',
        test: {
            sport: ['swimming'],
            food: 'meal'
        }
    },
    data: JSON.stringify(paramData), // 或者在这里序列化
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    transformRequest: [function (data) {
        // 手动序列化成json字符串
        if (typeof data == 'object') {
            return JSON.stringify(data)
        }
        return data
    }]
}).then(function (res) {
    console.log('three post res', res);
}).catch(function (error) {
    console.log('three error', error)
})
```
