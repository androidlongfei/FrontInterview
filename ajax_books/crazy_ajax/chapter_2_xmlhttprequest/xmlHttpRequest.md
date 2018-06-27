# XMLHttpRequest对象详解

主要讲解`XMLHttpRequest Level 1`

- XMLHttpRequest对象的基本知识
- XMLHttpRequest的常用熟悉
- XMLHttpRequest的常用方法

## 1.XMLHttpRequest对象概述

XMLHttpRequest最通用的定义是:它是一套可以在JavaScript,JScript等脚本语言中使用的API,它通过HTPP协议异步地向服务器发送请求，并获取从服务器返回的响应。它的用处是提供与服务器异步通信的能力。

## 2.XMLHttpRequest的方法和属性

XMLHttpRequest包含了一些基本的属性和方法，它正是通过这些属性和方法与服务器通信的。

### 2.1基本方法

- abort() 停止发送当前请求
- getAllResponseHeaders() 获取服务器返回的全部响应头。
- getResponseHeader('key') 根据响应头的`key`获取`value`
- open('get','url',true) 建立与服务器URL的连接，并设置请求的方法，以及是否使用异步请求。
- send(content) 发送请求。其中content是请求参数
- setRequestHeader('label','value') 在发送请求之前，先设置请求头

**getAllResponseHeaders()和getResponseHeader()**

在请求被发送之后，getAllResponseHeaders()和getResponseHeader()这两个方法可以获取服务器的响应头。

```javascript
if (request.status == 200) {
    console.log('4----', request.getAllResponseHeaders())
    console.log('4----', request.getResponseHeader('content-type'))
}
```

```
getAllResponseHeaders方法返回值
content-type: application/json; charset=utf-8

getResponseHeader方法返回值
application/json; charset=utf-8
```

getAllResponseHeaders()用于返回全部的响应头，其返回值是"key:value"形式的字符串。

注意:`request.readyState==1`时,以上两方法是没有返回值的。

### 2.2属性

- onreadystatechange 该属性用于指定XMLHttpRequest对象状态改变时的事件处理函数。
- readyState 该属性用于获取XMLHttpRequest对象的处理状态
- responseText 该属性用于获取服务器的响应文本
- responseXML 该属性用于获取服务器的响应的XML文档
- status 该属性是服务器返回的状态码，只有当服务器响应已完成时才有状态码。
- statusText 该属性是服务器返回的状态文本信息

**readyState和onreadystatechange属性**

XMLHttpRequest对象状态改变时onreadystatechange属性对应的函数被触发。

XMLHttpRequest属性的状态可以通过readyState获取，主要有以下几种状态:

- 0 : XMLHttpRequest还没初始化
- 1 : 开始发送请求
- 2 : 请求发送完成
- 3 : 开始读取服务器的响应
- 4 : 读取服务器响应结束

readyState状态为2时服务器可以获取到XMLHttpRequest对象发送的请求参数。

注意：这两个属性名在IE中可以不区分大小写，但在其它浏览器中要严格区分大小写，建议小写。

**status和statusText属性**

服务器常用的状态码如下:

- 200 服务器响应正常
- 304 该资源在上次请求后没有任何修改。
- 400 无法找到请求的资源
- 401 访问资源的权限不够
- 403 没有权限访问资源
- 404 需要访问的资源不存在
- 414 请求的URl太长
- 500 服务器内部错误

### 2.4 发送请求

创建兼容的XMLHttpRequest对象:

```javascript
function createRequest() {
    var request = null
    try {
        // 除IE以外的所有浏览器
        request = new XMLHttpRequest()
    } catch (er) {
        try {
            // 大部分IE浏览器
            request = ActiveXObject('Msxml2.XMLHTTP')
        } catch (er) {
            // 小部分IE浏览器
            request = ActiveXObject('Microsoft.XMLHTTP')
        }
    }
    return request
}
```

**GET请求**

GET请求用于从服务器获取数据。

GET请求将所有请求参数转化为一个查询字符串，并将该字符串添加到请求的URL之后。

GET请求传送的数据量较小，一般不能大于`2KB`.

虽然GET请求的请求参数是附加在URL之后，但使用send方法时，还是应该传入参数`null`。因为`send()`在IE上可行，在Firefox会报错。

GET请求如下:

```javascript
var request = createRequest()
request.onreadystatechange = function () {
    if (request.readyState == 4) {
        // 服务器已经处理完请求，数据可以使用了
        console.log('4', request)
        if (request.status == 200) {
            doResText(request.responseText)
        }
    }
}

request.open('GET', 'http://127.0.0.1:9100/form/testGet?name=zhansan&age=100', true)
request.send(null)

function doResText(responseText) {
    console.log('doResText', typeof responseText, responseText, JSON.parse(responseText))
}
```

**POST请求**

POST请求适用性更广，可以使用更大的参数。

POST请求步骤如下:

- 使用open方法打开连接，指定请求方式
- 设置正确的请求头，设置`content-type`
- 发送请求，把请求参数转为查询字符串，将该字符串作为send()方法的参数。

```javascript
var request = createRequest()
request.onreadystatechange = function () {
    if (request.readyState == 4) {
        // 服务器已经处理完请求，数据可以使用了
        console.log('4', request)
        if (request.status == 200) {
            doResText(request.responseText)
        }
    }
}

request.open('POST', 'http://127.0.0.1:9100/form/testPOST?name=zhansan&age=100', true)
request.setRequestHeader('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
var loveJson = {
    sport: '足球'
}
var postData = "address=中国" + "&love=" + JSON.stringify(loveJson)
// var postData = "address=123&love=足球"
request.send(postData)

function doResText(responseText) {
    console.log('doResText', typeof responseText, responseText, JSON.parse(responseText))
}
```
