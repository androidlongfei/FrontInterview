
// 3. 组合继承（call继承 + 原型链继承）

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

// let animal = new Animal();

// 核心：将父类的实例作为子类的原型

function Cat( age,name ) {
	//继承父元素属性和方法
	Animal.call(this,name)
	this.age = age;
}
//继承父元素原型链中的方法
Cat.prototype = new Animal();

let cat = new Cat( 22, 'Tom' );
console.log( cat.name, cat.age );
cat.sleep();
cat.eat('fish');
console.log( cat instanceof Animal ); // true
console.log( cat instanceof Cat ); // true

/*
特点：
      1.可以继承实例属性/方法，也可以继承原型属性/方法
      2.既是子类的实例，也是父类的实例
      3.可传参
      4.函数可复用
缺点:
      1.调用了两次父类构造函数，生成了两份实例（子类实例将子类原型上的那份屏蔽了）
*/
