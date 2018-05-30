/**
 * 块级作用域
 * ES5,只有全局作用域和函数作用域.
 * ES6增加了块级作用域.
 */

{
    let kk = 10
}

// console.log(kk); // 报错

/**
 * 1.允许块级作用域的任意嵌套
 */

{
    {
        let m = 100
        console.log(m) // 100
    }
}

/**
 * 2.外层作用域无法读取内层作用域的变量
 */

{
    {
        let m = 100
    }
    // console.log(m) // 报错
}

/**
 * 2.内层作用域可以定义外层作用域的同名变量
 */
{
    let insane = 'Hello World1';
    console.log('外insane', insane);
    //
    {
        let insane = 'Hello World2'
        console.log('内insane', insane);
    }
}

/**
 * 3.块级作用域代替立即执行函数表达式
 */
(function () {
    console.log('tmp')
})()

{
    console.log('tmp')
}

/**
 * 4. 块级作用域声明函数
 * es5:不能在块级作用域中声明函数
 * es6:块级作用域内声明的函数类似于let，对作用域之外没有影响.
 */

{
    function mm(m) {
        console.log(m);
    }
    mm('kk') // kk
}
mm('ss')
