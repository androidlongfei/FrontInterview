var execut = {
  message: 'execut',
  sayHello(age, name) {
    console.log('hello,' + this.message + ' i am ' + name + ' and i has ' + age)
  }
}

var zhansan = {
  message: 'world;'
}

// call
execut.sayHello.call(zhansan, 25, 'zhangsan')
// apply
execut.sayHello.apply(zhansan, [25, 'zhangsan'])
// bind
execut.sayHello.bind(zhansan)(25, 'zhangsan')

// 输出结果为:hello,world; i am zhangsan and i has 25

/**   call与apply比较    **/

// 结果都相同。从写法上我们就能看出二者之间的异同。
// 相同之处在于，第一个参数都是要绑定的上下文，后面的参数是要传递给调用该方法的函数的。
// 不同之处在于，call方法传递给调用函数的参数是逐个列出的，而apply则是要写在数组中。

// bind的主要用法，绑定指定上下文,随时调用

var bin = execut.sayHello.bind(zhansan)
bin(25, 'zhangsan')
// 输出结果为:hello,world; i am zhangsan and i has 25
var bin1 = execut.sayHello.bind(zhansan, 26, 'lisi')
bin1()
// 输出结果为:hello,world; i am lisi and i has 26

/*** bind 总结 **/
// bind可以绑定上下文
// bind方法返回的是一个修改过后的函数,想什么时候调就什么时候调用
