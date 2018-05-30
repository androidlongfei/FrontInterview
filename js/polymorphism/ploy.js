/*多态的基本概念：一个引用类型（变量）在不同情况下的多种状态。
js本身是无态的，天生就支持多态。*/

/**
 * 多态是指一个引用(类型)在不同情况下的多种状态。
 * 也可以理解成：多态是指通过指向父类的引用，来调用在不同子类中实现的方法。
 */

//Master类
function Master(name) {
    this.name = name;
    //方法[给动物喂食物]
}
//原型法添加成员函数
Master.prototype.feed = function(animal, food) {
    window.alert("给" + animal.name + "喂" + food.name);
}
//食物类
function Food(name) {
    this.name = name;
}
//鱼
function Fish(name) {
    this.food = Food;
    this.food(name);
}
//骨头
function Bone(name) {
    this.food = Food;
    this.food(name);
}


//动物类
function Animal(name) {
    this.name = name;
}
//猫猫
function Cat(name) {
    this.animal = Animal;
    this.animal(name);
}
//狗狗
function Dog(name) {
    this.animal = Animal;
    this.animal(name);
}
var cat = new Cat("大花猫");
var fish = new Fish("黄花鱼");
var dog = new Dog("大花狗");
var bone = new Bone("猪骨头");
//创建一个主人
var master = new Master();
master.feed(cat, fish);
master.feed(dog, bone);
