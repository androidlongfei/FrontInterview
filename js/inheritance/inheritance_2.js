
// 2.  原型链继承（或者call继承）

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

function Cat( age ) {
	this.age = age;
}
Cat.prototype = new Animal();
Cat.prototype.name = 'Tom';

let cat = new Cat( 22 );
console.log( cat.name, cat.age );
cat.sleep();
console.log( cat instanceof Animal ); // true
console.log( cat instanceof Cat ); // true

// console.log(new Animal().color); // blue
cat.eat('egg'); // egg
console.log(cat.color);// blue

function Dog(){

}
Dog.prototype = new Animal();
Dog.prototype.name = 'kolin';
let dog = new Dog();
console.log('dog name',dog.name);
console.log('cat name',cat.name);

/*
特点：
      1.非常纯粹的继承关系，实例是子类的实例，也是父类的实例
      2.父类新增原型方法/原型属性，子类都能访问到
      3.简单，易于实现
缺点:
      1.要想为子类新增属性和方法，必须要在new Animal()这样的语句之后执行，不能放到构造器中
      2.无法实现多继承(重要缺点)
      3.来自原型对象的引用属性是所有实例共享的 (详情看demo.js)
			4.创建子类实例时，无法向父类构造函数传参(重要缺点)
*/
