/**
 * JSONP请求工具
 * @param url 请求的地址
 * @param data 请求的参数
 * @returns {Promise<any>}
 */
const request = ({ url, data }) => {
    return new Promise((resolve, reject) => {
        // 处理传参成xx=yy&aa=bb的形式
        const handleData = (data) => {
            const keys = Object.keys(data)
            const keysLen = keys.length
            return keys.reduce((pre, cur, index) => {
                const value = data[cur]
                const flag = index !== keysLen - 1 ? '&' : ''
                return `${pre}${cur}=${value}${flag}`
            }, '')
        }
        // 动态创建script标签
        const script = document.createElement('script')
        // 接口返回的数据获取
        window.jsonpCb = (res) => {
            document.body.removeChild(script)
            delete window.jsonpCb
            resolve(res)
        }
        script.src = `${url}?${handleData(data)}&cb=jsonpCb`
        document.body.appendChild(script)
    })
}
// 使用方式
request({
    url: 'http://localhost:9871/api/jsonp',
    data: {
        // 传参
        msg: 'helloJsonp'
    }
}).then(res => {
    console.log(res)
})
