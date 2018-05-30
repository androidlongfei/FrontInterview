/**
 * 一、类的定义
 * ES6 提供了更接近传统语言的写法，引入了 Class（类）这个概念，作为对象的模板。通过class关键字，可以定义类。
 */



// es5定义类

function Point(x, y) {
    this.x = x;
    this.y = y;
}

Point.prototype.toString = function () {
    return '(' + this.x + ', ' + this.y + ')';
};

var p = new Point(1, 2);

console.log('es5', p.x); // es5 1


// es6定义类

//定义类
class MyPoint {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    toString() {
        return `(${this.x},${this.y})`;
    }
}

let myPoint = new MyPoint(4, 5);
console.log('es6', myPoint.x); // es6 4

/**
 * 二、严格模式
 * 类和模块的内部，默认就是严格模式，所以不需要使用use strict指定运行模式
 */


/**
 * 三、constructor 方法
 * constructor方法是类的默认方法，通过new命令生成对象实例时，自动调用该方法。
 * 一个类必须有constructor方法，如果没有显式定义，一个空的constructor方法会被默认添加。
 */



/**
 * 四、类的实例
 * 生成类的实例对象的写法，与 ES5 完全一样，也是使用new命令。前面说过，如果忘记加上new，像函数那样调用Class，将会报错。
 * 与 ES5 一样，实例的属性除非显式定义在其本身（即定义在this对象上），否则都是定义在原型上（即定义在class上）。
 */

class TestPoint {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    toString() {
        return `(${this.x},${this.y})`;
    }

    test() {
        return 'call test'
    }
}

let testPoint = new TestPoint(4, 5);
console.log(testPoint.hasOwnProperty('x')); // true
testPoint.z = 100;
console.log(testPoint.hasOwnProperty('z'), testPoint.z); // true 100
console.log(testPoint.hasOwnProperty('toString')); // false 可见toString是定义在原型上（即定义在class上）


/**
 * 五.不存在变量提升
 * 必须先定义后使用
 */


/**
 * 六、this指向
 * 类的方法内部如果含有this，它默认指向类的实例。但是，必须非常小心，一旦单独使用该方法，很可能报错。
 *
 */

class MyPrint {
    printName(name = 'there') {
        this.print(`Hello ${name}`);
    }

    print(text) {
        console.log(text);
    }
}

const myPrint = new MyPrint();
const { printName } = myPrint;
// printName(); // Cannot read property 'print' of undefined


// 一个比较简单的解决方法是，在构造方法中绑定this，这样就不会找不到print方法了。

class MyPrint1 {

    constructor() {
        this.printName1 = this.printName1.bind(this) // printName1中的this指向类的实例
    }

    printName1(name = 'there') {
        this.print(`Hello ${name}`);
    }

    print(text) {
        console.log(text);
    }
}

const myPrint1 = new MyPrint1();
const { printName1 } = myPrint1;

printName1(); // Hello there

/**
 * 七、Class 的取值函数（getter）和存值函数（setter）
 */

class MyTest {
    constructor(prop) {
        this.prop = prop
    }

    get prop() {
        return 'getter';
    }
    set prop(value) {
        console.log('setter: ' + value);
    }
}

let myTest = new MyTest('张三') // setter: 张三
console.log(myTest.prop); // getter
myTest.prop = '李四' // setter: 李四
console.log(myTest.prop); // getter


/**
 * 八、Class 的静态方法
 * 类相当于实例的原型，所有在类中定义的方法，都会被实例继承。如果在一个方法前，加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。
 * 父类的静态方法，可以被子类继承。
 */


class Foo {
    static classMethod() {
        return 'hello';
    }
}

Foo.classMethod() // 'hello'

var foo = new Foo();
// foo.classMethod() // foo.classMethod is not a function
