

function Person(age){
  //公共属性
  this.age = age;
  //公共方法
  this.test = function(){
    console.log(this.age);
  }
}

/*
* 给对象增加属性
*/

let person1 = new Person(23);
person1.name = 'zhangsan';
person1.show = function(){
  console.log('person1 show',this.name)
}
person1.test();
person1.show();

let person2 = new Person();
person2.name = 'lisi';
person2.show = function(){
  console.log('person2 show',this.name);
}
person2.show();

/**
 * 以上几种方法有一个问题，那就是以上对象独占函数代码（计算机会为每个对象划分独立内存来存储方法），这样如果对象过多，则会影响效率
 */


// 以下是原型法：这样多个对象可以共享函数代码(就是方法放在公共区)
// 注意prototype 声明的方法只能访问类（ 原型对象）的公共属性和方法
function Animal(age,height){
  this.age = age;//公共属性
  this.height = height;//公共属性

 // 公共方法
  this.getAge = function(){
    return this.age
  }

  let _age = age;// 私有属性
  //私有方法
  function test(){

  }
}

Animal.prototype.show = function(name){
  console.log('show name', name);
}

Animal.prototype.add = function(){
  //访问公共属性 和 方法
  console.log('add', this.getAge() + this.height);
}

Animal.prototype.access_private = function(){
  //访问私有属性
  console.log('access_private', _age);//出错，不能访问私有属性
  test();//出错，不能访问私有方法
}


let dog = new Animal();
dog.name = 'joni';
dog.show(dog.name);

let dog1 = new Animal(23,170);
dog1.name = 'mark';
dog1.show(dog1.name);
dog1.add();
// dog1.access_privat();
