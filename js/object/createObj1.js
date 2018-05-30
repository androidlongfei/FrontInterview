/*
* JS中基于对象等同于面向对象
* JS中没有class，但是有新的名字叫做原型对象，因此类等同于原型对象
*
*/

/*
* 类（原型对象）和对象的区别和联系
* 1.类是抽象的概念，代表一类事物
* 2.对象是具体的，代表一类实体
* 3.对象是以类（原型对象）为模板创建起来的
*
*/

function Person(){

}

var person1 = new Person();
person1.name = 'zhangsan';
person1.age = 10;
console.log(Person.constructor);
//输出[Function: Function]，可以得出函数是Function的实例
console.log(person1.constructor);//对象实例的构造函数
//输出[Function: Person]，可以得出person1是Person的实例
console.log(typeof person1);//a的类型是什么

var b = {};
console.log(b.constructor);


// 如何判断一个对象实例是不是某个类型
if(person1 instanceof Person){
  console.log('person1 is instance of Person')
}
