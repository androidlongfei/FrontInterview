// js通过new关键字创建对象主要分三部


function Person(age) {
    this.age = age;
}

var p = new Person(11)

/**
 * new过程主要分为一下三个步骤
 *
 * <1> var p = {}   //创建空对象
 *
 * <2> p.__proto__ = Person.prototype   //赋直 __proto__
 *
 * <3>  Person.call(p) // 初始化属性和方法
 *
 */

console.log(p.__proto__ == Person.prototype); //输出 true ， 间接验证了第二步
console.log(p.age) //间接验证了第三步
