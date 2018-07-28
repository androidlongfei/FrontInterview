# 个人整理前端面试题

## 原型链相关问题

### 1.原型链干嘛用的（初级）

主要作用有两个:

1.实例对象共享原型的方法与属性

例如:

```javascript
// 原型对象
function A(age){
    this.age = age
}

// 共享方法
A.prototype.eat = function(food){
    console.log('eat',food);
}

// 实例对象a1
var a1 = new A(15)
// 实例对象a2
var a2 = new A(18)
a1.eat('面')
a2.eat('米')
```

2.原型对象之间实现继承

```javascript
function A(){
    this.eat = function(food){
        console.log('eat',food);
    }
}

function B(age){
    this.age = age
}

// 原型对象B继承原型A
B.prototype = new A()

var b1 = new B(12)
b1.eat('米')
var b2 = new B(15)
b1.eat('面')
```

### 2.介绍下继承的几种方式（中级）

1.构造继承

```javascript
// 动物类
function Animal( name ) {
    // 属性
    this.name = name || 'Animal';
    // 实例方法
    this.sleep = function ( ) {
        console.log( this.name + '正在睡觉！' );
    }
}
// 原型方法
Animal.prototype.eat = function ( food ) {
    console.log( this.name + '正在吃：' + food );
};

// 猫
function Cat( name, age ) {
    Animal.call( this, name );//此方法重写了父类的构造函数上的this上定义的属性和方法
    this.age = age;
}

let cat = new Cat( 'Tom', 22 );
console.log( cat.name, cat.age ); // Tom 22
console.log( cat instanceof Animal ); // false
if(cat.eat){
    console.log(cat.eat('猫粮'));  // 没任何输出，无法继承原型方法
}
console.log( cat instanceof Cat ); // true
```

> 优点：可以实现多继承（call多个父类对象）;

> 缺点: 实例并不是父类的实例，只是子类的实例;只能继承父类的实例属性和方法，不能继承原型属性/方法;

2.原型链继承

```javascript
function Animal( name ) {
    // 属性
    this.name = name || 'Animal';
    // 实例方法
    this.sleep = function ( ) {
        console.log( this.name + '正在睡觉！' );
    }
}
// 原型方法
Animal.prototype.eat = function ( food ) {
    console.log( this.name + '正在吃：' + food );
};

function Cat( age ) {
    this.age = age;
}
Cat.prototype = new Animal();
let cat = new Cat( 22 );
console.log( cat instanceof Animal ); // true
console.log( cat instanceof Cat ); // true
cat.eat('egg'); // egg
```

> 优点:非常纯粹的继承关系，实例是子类的实例，也是父类的实例

> 缺点:无法实现多继承;创建子类实例时，无法向父类构造函数传参

3.组合继承(原型和构造的组合)

```javascript
function Animal(name) {
    this.name = name
    this.sleep = function () {
        console.log(this.name + '正在睡觉！');
    }
}
// 原型方法
Animal.prototype.eat = function (food) {
    console.log(this.name + '正在吃：' + food);
};
Animal.prototype.color = 'blue';

function Cat(name, age) {
    Animal.call(this, name);
    this.age = age;
}
Cat.prototype = Animal.prototype;

var cat = new Cat('Tom', 20);
console.log('cat', cat.__proto__ === Cat.prototype, cat.__proto__ === Animal.prototype); // cat true true
console.log(cat.name, cat.age);
cat.sleep();
console.log(cat instanceof Animal); // true
console.log(cat instanceof Cat); //true

console.log(new Cat('hiri', 30).name); // hiri
```

> 优点:支持多继承,可以向父类传递参数，可以继承父类的原型方法

> 缺点：效率有点偏低，因为需要拷贝父类的属性。

综上所述：推荐使用第三种。

### 3.原型链原理（中高级）

原型链主要是通过`__proto__`和`prototype`来实现的。

js中一切都是对象。每一个实例对象有一个隐藏的属性`__proto__`,每一个原型对象都有一个`prototype`属性。

实例对象的`__proto__`属性值等于原型对象的`prototype`属性值。

```javascript
function A(){

}
var a = new A()
console.log(a.__proto__ == A.prototype);
```

以下例子讲述原型链的过程

```javascript
function B(age){
    this.age = age
}
B() // B作为一个普通函数
B.call() // 继承自Function
B.toString() // 继承自Object
```

以上示例，是将B作为一个函数调用，而函数是`Funtion`的实例对象，它的原型对象是`Funtion`,所以`B.__proto__ == Funtion.prototype`,而Funtion.prototype值又是Object的实例，故`Funtion.prototype.__proto__ == Object.prototype`,而Object已经是最顶级的对象了,故原型链如下:

```
B.__proto__ => Function.prototype => Function.prototype.__proto__ => Object.prototype
```

> 以上可知函数B继承了Funtion和Object,故而B.call(),B.toString()都是来自于它们

```javascript
function B(age){
    this.age = age
}
var b = new B() // B作为一个原型对象，b1作为一个实例对象
```

以上示例B作为一个原型对象有`prototype`,b1作为一个实例对象有`__proto__`,所以`b.__proto__ == B.prototype`, 而B.prototype值又是Object的实例,故而`B.prototype.__proto__ == Object.prototype`,故原型链如下:

```
b.__proto__ => B.prototype => B.prototype.__proto__ => Object.prototype
```

> 如b.age会先在b中找，再到B.prototype中找，再到Object.prototype找。

通过new创建对象，分为以下三个步骤

```javascript
var b = new Object()   // 1.创建空对象
b.__proto__ = B.prototype   // 2.赋直 __proto__
B.call(b) // 3.初始化属性和方法
```
