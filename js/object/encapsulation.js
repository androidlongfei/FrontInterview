/**
 * js面向对象 三大特性之 封装
 */

/*
*  js提供有以下几种控制方法和属性的访问权限:
*  1)公开级别:对外公开
*  2)私有级别:类本身可以访问,不对外公开
*/
function Person( name, age, sal ) {
	this.name = name; //公开的属性

	let _age = age; //私有的属性
	let _sal = sal; //私有的属性
	//在类中如何定义公开方法（特权方法），私有方法（内部方法）

  //如果我们希望操作私有的属性则可用公开方法去实现
	this.show = function ( ) {
		console.log( _age + " " + _sal );
	}
	//私有方法,可以访问对象的属性
	function show2( ) {
		console.log( _age + _sal );
	}
}
const p1 = new Person( "sp", 30, 4000 );
console.log(p1.name);// 访问公开属性
p1.show(); //这个可以成功， 通过公共的方法访问私有属性
//p1.show2( ); //不能在类的外部去访问私有的方法

p1.color = 'blue';
console.log(p1.color);
