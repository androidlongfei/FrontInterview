
/*
从这句console.log(f1.prototype) //f1 {} 的输出就结果可以看出，f1.prototype就是f1的一个实例对象。
就是在f1创建的时候,创建了一个它的实例对象并赋值给它的prototype，基本过程如下：
var temp = new f1();
f1.prototype = temp;
f1.__proto__ = Function.prototype
*/


function f1(){

};
var temp = new f1();
console.log(f1.prototype);

var m = {};
console.log();
