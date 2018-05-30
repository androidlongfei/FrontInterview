// 有时我们会看到这样一种调用方法：函数名.call（对象实例） 这样调用,该函数的this就是这个对象实例。
//
//
// call方法是Function类中的方法
// call方法的第一个参数的值赋值给类(即方法)中出现的this
// call方法的第二个参数开始依次赋值给类(即方法)所接受的参数
//
// 小案例：
var dog = {
	name: "hello"
};
function test(args1, args2) {
	console.log( this.name ,args1, args2);
}
test.call( dog ,'one',2); //==dog.test;  输出：hello,one,1


 // 例子2

 function p( x ) {
 	console.log( x );
 }
 var obj = {
 	counter: 5
 }
 function func( ) {

 }
 func.prototype.show = function ( x ) {
 	p.call( x, this.counter );
 }
 var s = new func( );
 // s.show( obj ); // 输出 undifined
 s.show.call( obj ); // 输出 5

 // call apply，这两个方法基本上是一个意思，
 // 区别在于 call 的第二个参数可以是任意类型，
 // 而apply的第二个参数必须是数组，也可以是arguments
 
