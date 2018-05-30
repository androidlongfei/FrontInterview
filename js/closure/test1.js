var result = [ ];
function foo( ) {
	let i = 0;
	for ( ; i < 3; i = i + 1 ) {
		result[i] = function ( ) {
			console.log( i )
		}
	}
};
foo( );
result[0]( ); // 3
result[1]( ); // 3
result[2]( ); // 3

/*
这段代码中,程序员希望foo函数中的变量i被内部循环的函数使用,并且能分别获得他们的索引,
而实际上,只能获得该变量最后保留的值,也就是说.闭包中所记录的自由变量,
只是对这个变量的一个引用,而非变量的值,当这个变量被改变了,闭包里获取到的变量值,也会被改变
*/


//解决的方法之一,是让内部函数在循环创建的时候立即执行,并且捕捉当前的索引值,
//然后记录在自己的一个本地变量里.然后利用返回函数的方法,重写内部函数,让下一次调用的时候,返回本地变量的值,改进后的代码:

// 优化后
function foo1( ) {
	var i = 0;
	for ( ; i < 3; i = i + 1 ) {
		result[i] = ( function ( j ) {
			return function () {
				console.log( j );
			};
		})( i );
	}
};
