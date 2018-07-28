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
