// 自定义model

const myMoudel = (function () {
    let _cacheArray = [] // 私有属性

    function put(data) {
        if (data) {
            _cacheArray.push(data)
        }
    }

    function length() {
        return _cacheArray.length
    }

    return {
        put: put, // 公有方法,供外部访问
        get: function (index) {
            // 共有方法
            if (index && index < length()) {
                return _cacheArray[index]
            }
        },
        getAll: function () {
            // 共有方法
            return _cacheArray
        },
        delAll: function () {
            _cacheArray.splice(0, _cacheArray.length);
        }
    }
})()

module.exports = myMoudel
