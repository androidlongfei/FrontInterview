console.log('a_b.js');

function A() {
    // 原型对象A
}

console.log(A);

function B() {
    // 原型对象B
}
var b1 = new B(); // 实例对象b1
console.log(b1);
A.prototype = b1;
var a1 = new A(); // 实例对象a1
console.log(a1.__proto__ === b1); //true
console.log(a1.__proto__.__proto__ === B.prototype) //true
console.log(a1.__proto__.__proto__.__proto__ === Object.prototype) //true

console.log(B.prototype.__proto__ == Object.prototype) // true 原型对象B的原型链默指向Object


console.log('Object', Function.prototype.__proto__ === Object.prototype); // true 函数由对象(类)创建，只有原型对象才有prototype属性

console.log('Function', Object.__proto__ === Function.prototype); // true 对象(实例)又由函数创建，只有实例对象才有__proto__属性

console.log(Object.prototype.__proto__); // null 最顶级了(没谁能制造对象了)

// 哈哈 对象创建函数，函数再创建对象
