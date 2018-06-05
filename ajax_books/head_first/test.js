var request = createRequest()
console.log('init', request)
request.onreadystatechange = function () {
    if (request.readyState == 1) {
        // 说明请求对象已经准备好了，可以发送了。就是在request.open()后
        console.log('1', request)
        console.log('---------------status---statusText', request.readyState, request.status, request.statusText) // 1 0 ''
    } else if (request.readyState == 2) {
        // 服务器正在处理请求，会做出响应
        console.log('2', request)
        console.log('---------------status---statusText', request.readyState, request.status, request.statusText) // 2 200 'ok'
    } else if (request.readyState == 3) {
        // 服务器正在发送数据，数据还没发送完
        console.log('3', request)
        console.log('---------------status---statusText', request.readyState, request.status, request.statusText) // 3 200 'ok'
    } else if (request.readyState == 4) {
        // 服务器已经处理完请求，数据可以使用了
        console.log('4', request)
        console.log('---------------status---statusText', request.readyState, request.status, request.statusText) // 4 200 'ok'
        if (request.status == 200) {
            doResText(request.responseText)
        }
    }
}

console.log('request.readyState', request.readyState) // 0

// 请求对象知道如何连接，知道连接到哪里
request.open('GET', 'http://127.0.0.1:9100/form/submitPersonInfo', true)

console.log('request.readyState', request.readyState) // 1

request.send(null)

function doResText(responseText) {
    console.log('doResText', typeof responseText, responseText, JSON.parse(responseText))
}

function doRes(response) {

}
