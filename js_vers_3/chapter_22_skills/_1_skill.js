// bind 自定义bind函数

function mBind(fn, context) {
    // this 是全局
    // console.log('mBind', this);
    return function () {
        console.log('fn---arguments', arguments);
        return fn.apply(context, arguments)
    }
}

var data = {
    name: 'zhangsan',
    age: 20
}

function test() {
    console.log('this', this)
    console.log('arguments', arguments)
    console.log('name', this.name)
    console.log('age', this.age)
    return this.age * 10
}

var mTest = mBind(test, data)
mTest(13)
console.log('bind return', mTest())
