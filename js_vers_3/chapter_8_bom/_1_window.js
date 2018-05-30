// 1.全局作用域

/**
 * 一般情况下window对象等价于全局对象。
 * 在全局作用域中声明的变量，函数都会成为windows对象的属性和方法。
 *
 */

var age = 29

function sayAge() {
    console.log(this.age);
}

console.log(window.age); // 输出 29
console.log(window.sayAge); // 输出 29

/**
 * 全局对象于window对象的不同:
 * 全局变量不能通过delete操作符删除,直接在window上定义的对象可以
 */

// 在node环境下执行会报错
var name = 'sd'
console.log(delete window.name) // 返回false

window.sex = '男'
console.log(delete window.sex) // 返回true
