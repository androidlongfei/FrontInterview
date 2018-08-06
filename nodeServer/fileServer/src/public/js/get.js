var xhr = new XMLHttpRequest()
xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
        if (xhr.status == 200) {
            console.log('4----', xhr.getAllResponseHeaders())
            var responseText = xhr.responseText
            console.log('doResText', typeof responseText, responseText, JSON.parse(responseText))
        }
    }
}

// 设置超时
xhr.timeout = 2 * 1000

// 请求对象知道如何连接，知道连接到哪里
// xhr.open('GET', 'http://127.0.0.1:9200/api/test?id=100&name=zhangsan', true)

xhr.setRequestHeader('Cache-Control', 'no-cache'); // 设置不缓存

xhr.send(null)
