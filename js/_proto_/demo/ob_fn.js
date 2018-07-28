console.log('ob.fn.js');

// 把Object当普通函数来使用，它是Function的实例对象，所以共享Fuction的方法,有__proto__属性
console.log(Object.call());
console.log(Object.__proto__ === Function.prototype); // true

// 把Object当原型对象来使用,它有prototype属性
console.log(Object.prototype)

// 实例化Object对象 , 它有__proto__属性指向Object.prototype
var a = new Object()

console.log(a.__proto__ === Object.prototype); // true

// Object.prototype 已经是最顶级的对象了

function a() {}

console.log(a.toString()); // [object Object]
