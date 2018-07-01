# XMLHttpRequest Level 2详解

- [mozilla XMLHttpRequest](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest)
- [segmentfault XMLHttpRequest](https://segmentfault.com/a/1190000004322487)
- [csdn XMLHttpRequest](https://blog.csdn.net/liujie19901217/article/details/51137263)

**XMLHttpRequest Level 1的缺点**

- 只支持文本数据的传送，无法读取和上传二进制文件。
- 传送和接收数据时，没有进度信息，只能提示有没有完成。
- 受到`同域限制`，只能向同一域名的服务器请求数据。

**XMLHttpRequest Level 2增加的新特性**

- 可以设置HTTP请求的时限,就是设置请求超时
- 可以使用FormData对象管理表单数据
- 可以上传文件和获得数据传输的进度信息
- 可以获取服务器端的二进制数据。
- 可以请求不同域名下的数据（跨域资源共享，Cross-origin resource sharing，简称 CORS）。

## 1.超时设定

`XMLHttpRequest 2`对象，增加了timeout属性，可以设置HTTP请求的时限，表示请求在等待响应多少毫秒之后就停止。

在给timeout属性属性设置一个数值后，如果在规定的时间内浏览器还没有接收到响应，那么就会触发timeout事件，进而会调用ontimeout事件处理程序。

```javascript
var xhr = createRequest()
xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
        console.log('readyState......2', xhr)
    }
}
// xhr.send() 调用后触发此函数,同时开始计算超时
xhr.onloadstart = function () {
    console.log('onloadstart已调用xhr.send()函数,开始计算超时......1', new Date().toLocaleTimeString())
}
// 超时回调函数
xhr.ontimeout = function () {
    console.log('ontimeout超时咯......3', new Date().toLocaleTimeString())
}
// 设置超时
xhr.timeout = 2 * 1000
// 请求对象知道如何连接，知道连接到哪里
xhr.open('GET', 'http://127.0.0.1:9100/form/timeout?id=100', true)
xhr.send(null)
```

## 2.FormData模拟表单

`XMLHttpRequest 2`添加了一个新的接口FormData.利用FormData对象,我们可以通过JavaScript用一些键值对来模拟一系列表单控件。我们还可以使用XMLHttpRequest的send()方法来异步的提交这个"表单".

比起普通的ajax,使用FormData的最大优点就是我们可以异步上传一个二进制文.

- [FormData对象](https://developer.mozilla.org/zh-CN/docs/Web/API/FormData/Using_FormData_Objects)

### 2.1使用FormData发送Text

```javascript
// 创建 formData
var formData = new FormData();
formData.append("username", "Groucho");
formData.append("love", JSON.stringify({ sport: 'swimming', book: 'yuwen' }));
formData.append("accountnum", 123456); //数字123456会被立即转换成字符串 "123456"

// 请求对象知道如何连接，知道连接到哪里
xhr.open('POST', 'http://127.0.0.1:9100/form/formdataText?id=100', true)

// 发送formData
xhr.send(formData)
```

使用FormData主要事项:

- POST请求
- 无需专门设置Content-Type属性。xhr对象能够识别传入的数据类型是FormData的实例，并配置适当的头部信息。如`Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryrIs90I7Jxv1q0HIH`。
- `key-value`中的value必须是字符串，数字默认会转化为字符串,Json对象必须转化为字符串。

## 3.使用FormData上传文件和进度事件

- [进度条对象](https://developer.mozilla.org/zh-CN/docs/Web/Events/%E8%BF%9B%E5%BA%A6%E6%9D%A1)
- [upload对象](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/upload)

XMLHttpRequestEventTarget接口定义了7个事件如下：

事件            | 相应属性的信息类型
------------- | :---------
onloadstart() | 开始
onprogress()  | 数据传输进行中
onabort()     | 终止
onerror()     | 失败
onload()      | 成功
ontimeout()   | 超时
onloadend()   | 完成(不管成功与否)

部分代码如下:

```javascript
interface XMLHttpRequestEventTarget : EventTarget {
  // event handlers
  attribute EventHandler onloadstart;
  attribute EventHandler onprogress;
  attribute EventHandler onabort;
  attribute EventHandler onerror;
  attribute EventHandler onload;
  attribute EventHandler ontimeout;
  attribute EventHandler onloadend;
};

interface XMLHttpRequestUpload : XMLHttpRequestEventTarget {

};

interface XMLHttpRequest : XMLHttpRequestEventTarget {
  // event handler
  attribute EventHandler onreadystatechange;
  readonly attribute XMLHttpRequestUpload upload;
};
```

- 1.每一个XMLHttpRequest里面都有一个upload属性，而upload是一个XMLHttpRequestUpload对象
- 2.XMLHttpRequest和XMLHttpRequestUpload都继承了同一个XMLHttpRequestEventTarget接口，所以xhr和xhr.upload都有以上7个事件
- 3.onreadystatechange是XMLHttpRequest独有的事件

### 3.1 上传单个文件

```javascript
var uploadFile = document.getElementById('uploadFile')
uploadFile.onclick = function (event) {
    var filesDom = document.getElementById('chooseFile')
    console.log('files', filesDom.files)
    startUpload(filesDom.files)
}

function startUpload(files) {
    var xhr = createRequest()
    console.log('init', xhr)
    // xhr.send() 调用后触发此函数,同时开始计算超时
    xhr.onloadstart = function () {
        console.log('onloadstart已调用xhr.send()函数,开始计算超时......1', new Date().toLocaleTimeString())
    }
    // 超时回调函数
    xhr.ontimeout = function () {
        console.log('ontimeout超时咯......3', new Date().toLocaleTimeString())
    }
    // 当请求成功完成时触发，此时xhr.readystate=4
    xhr.onload = function () {
        if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
            var responseText = xhr.responseText
            console.log('onload doResText', JSON.parse(responseText))
        }
    }
    // 上传阶段，回调函数 ---------------------------------------

    // 上传开始
    xhr.upload.onloadstart = function (ev) {
        console.log('onloadstart', ev)
    }
    // 数据传输进行中(即xhr.send()之后，xhr.readystate=2之前)触发，每50ms触发一次；
    xhr.upload.onprogress = function (ev) {
        let pre = Math.floor((ev.loaded / ev.total) * 100)
        let preDom = document.getElementById('pre')
        preDom.innerHTML = pre
        console.log('upload.onprogress', pre)
    }
    // 上传终止
    xhr.upload.onabort = function (ev) {}
    // 上传超时
    xhr.upload.ontimeout = function (ev) {}
    // 上传失败
    xhr.upload.onerror = function (ev) {}
    // 上传成功
    xhr.upload.onload = function (ev) {
        console.log('upload.onload...')
        if (ev.loaded == ev.total) {
            let pre = Math.floor((ev.loaded / ev.total) * 100)
            let preDom = document.getElementById('pre')
            preDom.innerHTML = '上传完成'
        }
    }
    // 上传结束
    xhr.upload.onloadend = function (ev) {
        console.log('upload.onloadend...', ev)
    }
    // 上传结束 ---------------------------------------

    // 设置超时
    xhr.timeout = 6 * 1000
    // 创建 formData
    var formData = new FormData();
    formData.append("username", "Groucho");
    formData.append("accountnum", 123456);
    formData.append('myfile', files[0], files[0].name)
    // formData上传单个文件
    xhr.open('POST', 'http://127.0.0.1:9100/form/formdataFile/single?id=100', true)
    // 发送formData
    xhr.send(formData)
}
```

> `ev.loaded`已经上传的字节数据

> `ev.total`字节总数

xhr一共有8个相关事件：7个XMLHttpRequestEventTarget事件+1个独有的onreadystatechange事件；而xhr.upload只有7个XMLHttpRequestEventTarget事件。

### 3.2 上传多个文件

```javascript

// 数据传输进行中(即xhr.send()之后，xhr.readystate=2之前)触发，每50ms触发一次；
xhr.upload.onprogress = function (ev) {
    let pre = Math.floor((ev.loaded / ev.total) * 100)
    let preDom = document.getElementById('pre')
    preDom.innerHTML = pre
    console.log('upload.onprogress', pre)
}

// 上传成功
xhr.upload.onload = function (ev) {}

// 创建 formData
var formData = new FormData();
formData.append("username", "Groucho");
formData.append("accountnum", 123456);
for (var i = 0; i < files.length; i++) {
    var file = files[i]
    // console.log('myfile', file.name)
    formData.append('myfile', file, file.name)
}

// formData上传多个文件
xhr.open('POST', 'http://127.0.0.1:9100/form/formdataFile/multiple?id=100', true)

// 发送formData
xhr.send(formData)
```

> 多个文件也只有一个进度条

> 多个文件上传完也只会调用一次onload函数

## 4.使用Blob发送和接受二进制数据

- [Blob segmentfault](https://segmentfault.com/a/1190000011563430)
- [mozilla-blob](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob)
- [创建文件并下载](https://www.zhangxinxu.com/wordpress/2017/07/js-text-string-download-as-html-json-file/)
- [Blob Demo](https://www.zhangxinxu.com/wordpress/2013/10/understand-domstring-document-formdata-blob-file-arraybuffer/)

## 5 xhr相关属性

- 设置`request header`和获取`response header`
- 设置responseType数据类型和获取对应response数据
- 可发送类型的数据
- 跨域
- 事件触发条件和事件触发顺序

### 5.1 request header 和 response header

#### 5.1.2 设置request header

在发送Ajax请求（实质是一个HTTP请求）时，我们可能需要设置一些请求头部信息，比如content-type、connection、cookie、accept-xxx等。

xhr提供了setRequestHeader来允许我们修改请求 header。

```javascript
void setRequestHeader(DOMString header, DOMString value);
```

> 方法的第一个参数 header 大小写不敏感，即可以写成content-type，也可以写成Content-Type，甚至写成content-Type;

> Content-Type的默认值与具体发送的数据类型有关

> setRequestHeader必须在open()方法之后，send()方法之前调用，否则会抛错；

> setRequestHeader可以调用多次，最终的值不会采用覆盖override的方式，而是采用追加append的方式.

示例代码:

```javascript
var xhr = createRequest()
// 当请求成功完成时触发，此时xhr.readystate=4
xhr.onload = function () {
    if (this.status == 200) {
        var responseText = xhr.responseText
        console.log('onload doResText', JSON.parse(responseText))
    }
}
// 创建 formData
var formData = new FormData();
formData.append("username", "Groucho");
xhr.open('POST', 'http://127.0.0.1:9100/form/setRequestHeader?id=100', true)
xhr.setRequestHeader('X-Test', 'One')
xhr.setRequestHeader('X-Test', 'Two') // x-test:"One, Two"
xhr.send(formData)
```

#### 5.1.3 获取response header

- [Access-Control-Expose-Headers](https://cloud.tencent.com/developer/section/1189898)

xhr提供了2个用来获取响应头部的方法：getAllResponseHeaders和getResponseHeader。前者是获取 response 中的所有header 字段，后者只是获取某个指定 header 字段的值。

另外，getResponseHeader(header)的header参数不区分大小写。

```javascript
DOMString getAllResponseHeaders();
DOMString getResponseHeader(DOMString header);
```

使用以上两个方法遇到如下问题:

1. 使用getAllResponseHeaders()看到的所有response header与实际在控制台 Network 中看到的 response header不一样，比如network中又token这个响应头，但是但是此方法的返回值中却没有。
2. 使用getResponseHeader()获取某个自定义header的值时(如token)，浏览器抛错`Refused to get unsafe header "XXX"`.

原因如下:

1. W3C的 xhr 标准中做了限制，规定客户端无法获取response中的 Set-Cookie、Set-Cookie2这2个字段，无论是同域还是跨域请求
2. W3C的cors标准对于跨域请求也做了限制，规定对于跨域请求，客户端允许获取的response header字段只限于`simple response header`和`Access-Control-Expose-Headers`

```text
"simple response header"包括的 header 字段有：Cache-Control ,Content-Language,Content-Type,Expires,Last-Modified,Pragma;

"Access-Control-Expose-Headers"：首先得注意是"Access-Control-Expose-Headers"进行跨域请求时响应头部中的一个字段，对于同域请求，响应头部是没有这个字段的。这个字段中列举的 header 字段就是服务器允许暴露给客户端访问的字段。
```

所以getAllResponseHeaders()只能拿到限制以外（即被视为safe）的header字段，而不是全部字段；而调用getResponseHeader(header)方法时，header参数必须是限制以外的header字段，否则调用就会报Refused to get unsafe header的错误.

解决方式是：服务器端对`自定义响应头`加以配置，使其暴露出来，这样浏览器就能获取到了。

示例代码:

```javascript
var xhr = createRequest()
// 当请求成功完成时触发，此时xhr.readystate=4
xhr.onload = function () {
    if (this.status == 200) {
        var responseText = xhr.responseText
        console.log('getResponseHeader', xhr.getAllResponseHeaders())
        // content-type: application/json; charset=utf-8
        console.log('token', xhr.getResponseHeader('token'))
        // 报错 efused to get unsafe header "token"
        console.log('onload doResText', JSON.parse(responseText))
    }
}
```
