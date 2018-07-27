 // 原型对象 = 构造函数

 // 既是原型对象又是构造函数
 function Person(name) {
     this.name = name
 }

 console.log('Person.prototype', Person.prototype); // 在浏览器中输出：指向Object

 // 普通对象1
 var p1 = new Person('zhangsan');
 console.log(p1.name);

 console.log(p1.__proto__);

 // 普通对象的__proto__对应原型对象的prototype,如p.__proto__ == Person.prototype

 var te = function () {

 }

 console.log('test', te.prototype);
