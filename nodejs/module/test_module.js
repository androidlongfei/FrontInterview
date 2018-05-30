const t = require('./test.js');

console.log(t.test);// hello
console.log(t.add(1,2));//3
console.log(test1);// test1 是全局变量, 不需要exports也能用
// console.log(test2);//error 因为test2是局部变量，没被exports
// console.log(t.input(5));// error ,因为input方法没被exports
console.log(input1(10));// input1 是全局函数, 不需要exports也能用

/**
 * 以上测试得出如下结论:
 * 全局变量和函数不需要exports也能使用
 */
