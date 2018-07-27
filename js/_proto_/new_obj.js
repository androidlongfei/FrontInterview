// js通过new关键字创建对象主要分三部


function Person(age) {
    this.age = age;
}

let p = new Person(11)

/**
 * new过程主要分为一下三个步骤
 *
 * <1> let p = {}   //创建空对象
 *
 * <2> p.__proto__ = Person.prototype   //赋直 __proto__
 *
 * <3>  Person.call(p) // 初始化属性和方法
 *
 */

console.log(p.__proto__ == Person.prototype); //输出 true ， 间接验证了第二步
console.log(p.age) //间接验证了第三步

/**
 * 原型链概念:
 *
 * 那么__proto__是什么？我们在这里简单地说下。
 * 每个对象都会在其内部初始化一个属性，就是__proto__，当我们访问一个对象的属性时，
 * 如果这个对象内部不存在这个属性，那么他就会去__proto__里找这个属性，
 * 这个__proto__又会有自己的__proto__，于是就这样 一直找下去，
 * 也就是我们平时所说的原型链的概念。
 *
 */

//例子
function Animal() {

}
Animal.prototype.say = function () {
    console.log('hello');
}
let a = new Animal();
console.log(a.__proto__ == Animal.prototype)
a.say(); // 输出 hello

/**
 * 首先let a = new Animal()；可以得出a.__proto__=Animal.prototype。
 * 那么当我们调用a.say()时，首先a中没有say这个属性，
 * 于是，他就需要到他的__proto__中去找，也就是Person.prototype，
 * 而我们在上面定义了 Person.prototype.Say=function(){};
 * 于是，就找到了这个方法
 */
