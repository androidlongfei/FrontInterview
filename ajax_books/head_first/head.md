# head first Ajax

JavaScript不是编译的而是一种解释性语言，任何时候都可以有改变。

**request请求对象**

```javascript
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
```

请求对象只是一个普通的JavaScript对象，所有它可以有属性，这些属性可以有值。

利用请求对象可以告诉浏览器做什么，而且可以用它要求浏览器对服务器发出请求，并得到结果。(请求对象就是浏览器暴露的一个可以与服务器通信的接口对象)

要与浏览器通信，而不是服务器。浏览器把你的请求对象发送给服务器，而且在将响应数据发送回到web页面之前浏览器会解释服务器的响应。

请求对象属性如下:

- readyState 服务器处理请求时，会多次做出响应。浏览器使用readyStates属性来指示请求正处在其处理生命周期的哪个阶段。
- status和statusText 浏览器使用status和statusText属性来告诉你的代码服务器返回的HTTP状态，如200,'ok'表示服务器认为一切正常。
- responseText 服务器响应会存储在responseText中。通常是文本。
- responseXML 如果服务器将数据作为XML返回，则存储在responseXML，否则为空
- onreadystatechange 用于告诉浏览器当服务器响应一个请求时调用哪个函数

**request.open**

```javascript
request.open('GET', 'http://127.0.0.1:9100/form/submitPersonInfo', true)
```

> 执行此方法，请求对象就知道如何连接，知道连接到哪里.

**readState的四种状态**

浏览器基于服务器的响应回调你的函数。每次请求对象的readState属性改变时，浏览器会运行请求对象的`onreadystatuechange`属性指定的函数.

```javascript
request.onreadystatechange = function () {
    if (request.readyState == 1) {
        // 说明请求对象已经准备好了，可以发送了.就是在request.open()后
    } else if (request.readyState == 2) {
        // 服务器正在处理请求
    } else if (request.readyState == 3) {
        // 服务器正在发送数据，数据还没发送完
    } else if (request.readyState == 4) {
        // 服务器已经处理完请求，数据可以使用了
    }
}
```

> request.readyState默认是0，在执行完request.open()后,request.readyState值变为了1

**eval**

eval(str)会解析一个字符串，将这个字符串转化为一个"表达式"，并执行表达式返回结果。

**同步与异步**

异步意味着不依赖请求和响应的顺序.

同步请求会阻塞所有代码的工作。
