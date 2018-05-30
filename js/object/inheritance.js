/**
 * js面向对象 三大特性之 继承
 */

// 为什么需要继承
// 解决代码冗余问题-->继承
// 抽象出一个学生类，即把中学生和小学生的共性拿出来

function Stu( name, age ) {
	this.name = name;
	this.age = age;
	this.show = function ( ) {
		console.log( this.name + ' ' + this.age );
	}
}
function MidStu( name, age ) {
	this.stu = Stu;
	this.stu( name, age );
	//JS中实际上是通过对象冒充来实现继承，这句话不可少，因为JS是动态语言，如果不执行，则不能实现继承效果
}
function Pupil( name, age ) {
	this.stu = Stu;
	this.stu( name, age );

  // 重写：子类可以重新写函数来覆盖父类的某个方法
  this.show = function(){
    console.log('only show name', this.name);
  }
}
let midStu = new MidStu( '中学生', 18 );
midStu.show( );

let pupil = new Pupil('小学生', 8);
pupil.show();

// 重载：JS中不支持重载，即不可以通过参数的个数或者是类型来决定调用哪个函数，
// 但是因为JS天然的支持可变参数的，所以，它可以是看成天然支持重载
