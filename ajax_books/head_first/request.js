/**
 * [createRequest 创建Ajax对象]
 * @return {[type]} [description]
 */
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
