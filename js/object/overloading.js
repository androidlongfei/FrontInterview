
function test(a,b){
	console.log("hello");
}
function test(a){
	console.log(a);
}
function test(a,b){
	console.log(a+" "+b);
}
test(23); //输出23 undefined
test(3,"hello");//输出3 hello

/*
* 1.js在调用一个函数的时候,是根据函数名来调用的,如果有多个函数名相同,则认最后那一个函数.
* 2.直接定义一个函数或者变量,实际上这些函数和变量就是全局函数和全局变量(本质上他们是属于window对象的)
*/
