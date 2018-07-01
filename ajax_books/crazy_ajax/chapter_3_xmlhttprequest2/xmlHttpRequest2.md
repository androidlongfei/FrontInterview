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

## 5 xhr相关属性和方法

- 设置`request header`和获取`response header`
- 设置responseType数据类型和获取对应response数据
- xhr.readyState和xhr.onreadystatechange
- xhr.send()
- 跨域xhr.withCredentials
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
"simple response header"包括的 header 字段有：Cache-Control, ,Content-Language,Content-Type,Expires,Last-Modified,Pragma;

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

### 5.2 xhr.responseType 和 xhr.response

#### 5.2.1 xhr.responseType

responseType是xhr level 2新增的属性，用来指定xhr.response的数据类型.

值               | xhr.response 数据类型
--------------- | :-----------------
`""`            | String字符串(默认值)
`"text"`        | String字符串
`"document"`    | Document对象(返回 XML)
`"json"`        | javascript 对象
`"blob"`        | Blob对象(二进制)
`"arrayBuffer"` | ArrayBuffer对象

```javascript
var xhr = createRequest()
// 当请求成功完成时触发，此时xhr.readystate=4
xhr.onload = function () {
    if (this.status == 200) {
        if (xhr.response) {
            console.log('onload json', typeof xhr.response, xhr.response) // object
        }
    }
}
xhr.responseType = "json"
// 创建 formData
var formData = new FormData();
formData.append("username", "Groucho");
xhr.open('POST', 'http://127.0.0.1:9100/form/responseJson?id=100', true)
xhr.setRequestHeader('X-Test', 'One')
xhr.setRequestHeader('X-Test', 'Two')
xhr.send(formData)
```

> xhr.responseType为`json`时,xhr.responseText属性不存在

#### 5.2.2 xhr.response

xhr提供了3个属性来获取请求返回的数据，分别是：xhr.response、xhr.responseText、xhr.responseXML.

**xhr.response**

```text
默认值：空字符串""

当请求完成时，此属性才有正确的值

请求未完成时，此属性的值可能是""或者 null，具体与 xhr.responseType有关：当responseType为""或"text"时，值为""；responseType为其他值时，值为 null
```

**xhr.responseText**

```text
默认值为空字符串""

只有当 responseType 为"text"、""时，xhr对象上才有此属性，此时才能调用xhr.responseText，否则抛错

只有当请求成功时，才能拿到正确值。以下2种情况下值都为空字符串""：请求未完成、请求失败
```

**xhr.responseXML**

```text
默认值为 null

只有当 responseType 为"text"、""、"document"时，xhr对象上才有此属性，此时才能调用xhr.responseXML，否则抛错

只有当请求成功且返回数据被正确解析时，才能拿到正确值。以下3种情况下值都为null：请求未完成、请求失败、请求成功但返回数据无法被正确解析时
```

### 5.3 xhr.readyState和xhr.onreadystatechange

xhr.readyState这个属性是只读属性，总共有5种可能值，分别对应xhr不同的不同阶段。每次xhr.readyState的值发生变化时，都会触发xhr.onreadystatechange事件。

值 | 状态                        | ss
- | :------------------------ | :------------------------------------------------------------------------------------------
0 | UNSENT (初始状态，未打开          | 此时xhr对象被成功构造，open()方法还未被调用
1 | OPENED (已打开，未发送)          | open()方法已被成功调用，send()方法还未被调用。注意：只有xhr处于OPENED状态，才能调用xhr.setRequestHeader()和xhr.send(),否则会报错
2 | HEADERS_RECEIVED (已获取响应头) | send()方法已经被调用, 响应头和响应状态已经返回
3 | LOADING (正在下载响应体)         | 响应体(response entity body)正在下载中，此状态下通过xhr.response可能已经有了响应数据
4 | DONE (整个数据传输过程结束)         | 整个数据传输过程结束，不管本次请求是成功还是失败

```javascript
xhr.onreadystatechange = function () {
    switch(xhr.readyState){
      case 1://OPENED
        //do something
            break;
      case 2://HEADERS_RECEIVED
        //do something
        break;
      case 3://LOADING
        //do something
        break;
      case 4://DONE
        //do something
        break;
    }
}
```

### 5.4 xhr.send()

```javascript
void send(data)
```

xhr.send(data)的参数data可以是以下几种类型：

- ArrayBuffer
- Blob
- Document
- DOMString
- FormData
- null

如果是 GET/HEAD请求，send()方法一般不传参或传 null。不过即使你真传入了参数，参数也最终被忽略，xhr.send(data)中的data会被置为 null.

xhr.send(data)中data参数的数据类型会影响请求头部content-type的默认值：

```text
如果data是 Document 类型，同时也是HTML Document类型，则content-type默认值为text/html;charset=UTF-8;否则为application/xml;charset=UTF-8；

如果data是 DOMString 类型，content-type默认值为text/plain;charset=UTF-8；

如果data是 FormData 类型，content-type默认值为multipart/form-data; boundary=[xxx]

如果data是其他类型，则不会设置content-type的默认值
```

当然这些只是content-type的默认值，但如果用xhr.setRequestHeader()手动设置了中content-type的值，以上默认值就会被覆盖。

另外需要注意的是，若在断网状态下调用xhr.send(data)方法，则会抛错：Uncaught NetworkError: Failed to execute 'send' on 'XMLHttpRequest'。一旦程序抛出错误，如果不 catch 就无法继续执行后面的代码，所以调用 xhr.send(data)方法时，应该用 try-catch捕捉错误。

```javascript
try{
    xhr.send(data)
  }catch(e) {
    //doSomething...
  };
```

### 5.5 xhr.withCredentials

```text
我们都知道，在发同域请求时，浏览器会将cookie自动加在request header中。但大家是否遇到过这样的场景：在发送跨域请求时，cookie并没有自动加在request header中。
```

造成这个问题的原因是：在CORS标准中做了规定，默认情况下，浏览器在发送跨域请求时，不能发送任何认证信息（credentials）如"cookies"和"HTTP authentication schemes"。除非xhr.withCredentials为true（xhr对象有一个属性叫withCredentials，默认值为false）。

所以根本原因是cookies也是一种认证信息，在跨域请求中，client端必须手动设置xhr.withCredentials=true，且server端也必须允许request能携带认证信息（即response header中包含Access-Control-Allow-Credentials:true），这样浏览器才会自动将cookie加在request header中。

另外，要特别注意一点，一旦跨域request能够携带认证信息，server端一定不能将Access-Control-Allow-Origin设置为*，而必须设置为请求页面的域名.

客户端:

```javascript
xhr.responseType = "json"
xhr.withCredentials = true
```

服务端:

```javascript
import cors from 'cors'
import cookieParser from 'cookie-parser'
const app = express()
app.use(cookieParser())
// 跨域带cookie
const corsOptions = {
    origin: 'http://127.0.0.1:8080',
    credentials: true, // 客户端带cookie必须设置为true
    allowedHeaders: 'Content-Type,Content-Length,Authorization,Accept,X-Requested-With,token,lktoken,cookie,X-Test'
}
// middle
app.use(cors(corsOptions))
```

### 5.6 xhr事件触发条件和顺序

#### 5.6.1 xhr事件触发条件

事件                 | 触发条件
------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
onreadystatechange | 每当xhr.readyState改变时触发；但xhr.readyState由非0值变为0时不触发。
onloadstart        | 调用xhr.send()方法后立即触发，若xhr.send()未被调用则不会触发此事件。
onprogress         | xhr.upload.onprogress在上传阶段(即xhr.send()之后，xhr.readystate=2之前)触发，每50ms触发一次；xhr.onprogress在下载阶段（即xhr.readystate=3时）触发，每50ms触发一次。
onload             | 当请求成功完成时触发，此时xhr.readystate=4
onloadend          | 当请求结束（包括请求成功和请求失败）时触发
onabort            | 当调用xhr.abort()后触发
ontimeout          | xhr.timeout不等于0，由请求开始即onloadstart开始算起，当到达xhr.timeout所设置时间请求还未结束即onloadend，则触发此事件。
onerror            | 在请求过程中，若发生Network error则会触发此事件（若发生Network error时，上传还没有结束，则会先触发xhr.upload.onerror，再触发xhr.onerror；若发生Network error时，上传已经结束，则只会触发xhr.onerror）。注意，只有发生了网络层级别的异常才会触发此事件，对于应用层级别的异常，如响应返回的xhr.statusCode是4xx时，并不属于Network error，所以不会触发onerror事件，而是会触发onload事件。

#### 5.6.2 xhr事件触发顺序

当请求一切正常时，相关的事件触发顺序如下：

```text
1.触发xhr.onreadystatechange(之后每次readyState变化时，都会触发一次)

2.触发xhr.onloadstart

//上传阶段开始：

3.触发xhr.upload.onloadstart

4.触发xhr.upload.onprogress

5.触发xhr.upload.onload

6.触发xhr.upload.onloadend

// 上传结束，下载阶段开始：

7.触发xhr.onprogress

8.触发xhr.onload

9.触发xhr.onloadend
```
