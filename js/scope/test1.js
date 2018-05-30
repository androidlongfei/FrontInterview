/**
 * Javascript中的函数“在定义它们的作用域里运行，而不是在执行它们的作用域里运行”
 */

/**
 2. JS中的声明提前
 js中的函数作用域是指在函数内声明的所有变量在函数体内始终是可见的。
 并且，变量在声明之前就可以使用了，这种情况就叫做声明提前（hoisting)
 tip:声明提前是在js引擎预编译时就进行了，在代码被执行之前已经有声明提前的现象产生了
 */

var name = "one";

function test() {
    console.log(name); //undefined，因为此时name已经在test函数中声明了
    var name = "two";
    console.log(name); //two
}
test();

// 上边就达到了下面的效果

var name = "one";

function test() {
    var name;
    console.log(name); //undefined
    name = "two";
    console.log(name); //two
}
test();
