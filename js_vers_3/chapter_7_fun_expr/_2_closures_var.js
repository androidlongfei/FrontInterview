// 1.闭包

/**
 * 闭包：有权访问另一个函数作用域中的变量的函数.
 * 闭包缺点:只能取得包含函数中任何变量的最后一个值.
 */

// 2.私有变量

/**
 * 任何函数中定义的变量都可以认为是私有变量,因为函数外部不能访问这些变量。
 */


// 3.静态私有变量

/**
 * 初始化未经声明的变量，总是会创建一个全局的变量
 */

(function () {

    // 私有变量
    var mm = 10

    // 私有函数
    function test() {
        return mm
    }

    // 构造函数（作用域是全局）
    Person = function () {

    }

    Person.prototype.my = function () {
        mm++
        return test
    }

})()

var tt = new Person().my()

console.log(tt()) // 输出 11

// 4.模块模式

/**
 * 模块模式:是为单例创建私有变量和特权方法.
 * 单例:指的就是只有一个实例的对象。
 */

var app = function () {
    var name = 'zhangsan'
    var age = 100
    return {
        setName: function (mName) {
            name = mName
        },
        getName() {
            return name
        }
    }
}()

console.log('name', app.getName())
app.setName('lisi')
console.log('getName', app.getName())
