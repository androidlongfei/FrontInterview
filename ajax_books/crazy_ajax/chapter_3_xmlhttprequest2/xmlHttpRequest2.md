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
- 可以上传文件
- 可以请求不同域名下的数据（跨域资源共享，Cross-origin resource sharing，简称 CORS）。
- 可以获取服务器端的二进制数据。
- 可以获得数据传输的进度信息。

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

### 2.1使用FormData发送text

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
