var xhr = new XMLHttpRequest()
// 当请求成功完成时触发，此时xhr.readystate=4
xhr.onload = function () {
    if (this.status == 200) {
        if (xhr.response) {
            console.log('onload json', typeof xhr.response, xhr.response)
        }
    }
}
xhr.responseType = "json"
xhr.open('POST', 'http://127.0.0.1:9200/api/test/list?id=100', true)
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8')
xhr.send('name=zhansan&age=34&love=' + JSON.stringify({ sport: 'football', food: 'meal' }))
