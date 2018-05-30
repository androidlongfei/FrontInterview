// const 与 let 区别
//
// let与const都是只在声明所在的块级作用域内有效。
//
// 不可变动的引用使用const，可变动的引用使用 let
//
//let声明的变量可以改变，值和类型都可以改变，没有限制。
//
//对于复合类型的变量，如数组和对象，变量名不指向数据，而是指向数据所在的地址。const命令只是保证变量名指向的地址不变,
//
//对于基本数据类型,const声明后就不能改变


function Person(age, name){

  this.show = function(){
    console.log(age + '==' + name);
  }

}

const p1 = new Person(23, 'lisi');
// p1 = new Person(12,'s');//  报错，cosnt声明引用类型 ， 地址不能变
p1.show();
