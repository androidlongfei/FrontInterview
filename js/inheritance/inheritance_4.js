
// 4. 拷贝继承

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

function Cat(name){
  var animal = new Animal();
  for(var p in animal){
    Cat.prototype[p] = animal[p];
  }
  Cat.prototype.name = name || 'Tom';
}

// Test Code
var cat = new Cat();
console.log(cat.name);
cat.sleep();
console.log(cat instanceof Animal); // false
console.log(cat instanceof Cat); // true

/*
特点：
      1.支持多继承
缺点:
      1.效率较低，内存占用高（因为要拷贝父类的属性）
      2.无法获取父类不可枚举的方法（不可枚举方法，不能使用for in 访问到）
*/
