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

XMLHttpRequest对象状态改变时onreadystatechange对应的函数被触发。
