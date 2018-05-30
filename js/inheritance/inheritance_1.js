
// 1. 构造继承（或者call继承）

// 定义一个动物类
function Animal( name ) {
	// 属性
	this.name = name || 'Animal';
	// 实例方法
	this.sleep = function ( ) {
		console.log( this.name + '正在睡觉！' );
	}
}
// 原型方法
Animal.prototype.eat = function ( food ) {
	console.log( this.name + '正在吃：' + food );
};
Animal.prototype.color = 'blue';

// 核心：使用父类的构造函数来增强子类实例，等于是复制父类的实例属性给子类（没用到原型）

function Cat( name, age ) {
	// call方法是Function类中的方法
	// call方法的第一个参数的值赋值给类(即方法)中出现的this
	// call方法的第二个参数开始依次赋值给类(即方法)所接受的参数
	Animal.call( this, name );//此方法重写了父类的构造函数上的this上定义的属性和方法
	this.age = age;
}

let cat = new Cat( 'Tom', 22 );
console.log( cat.name, cat.age );
console.log(cat.sleep( ));
console.log( cat instanceof Animal ); // false
console.log( cat instanceof Cat ); // true

// console.log(new Animal().color); // blue
// console.log(cat.eat('egg')); // 错误 ，没有继承prototype
// console.log(cat.color));// 错误 ，没有继承prototype

/*
特点：

      1.解决了子类实例共享父类引用属性的问题(实例属性和方法)
      2.创建子类实例时，可以向父类传递参数
      3.可以实现多继承（call多个父类对象）
缺点:
      1.实例并不是父类的实例，只是子类的实例
      2.只能继承父类的实例属性和方法，不能继承原型属性/方法
      3.无法实现函数复用，每个子类都有父类实例函数的副本，影响性能

*/
