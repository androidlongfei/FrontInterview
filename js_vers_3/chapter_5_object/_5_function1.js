// 实例中的指针仅指向原型，而不是构造函数
function Person() {

}
console.log('Person.prototype', Person.prototype);

Person.prototype.age = 100

Person.prototype.setName = function (name) {
    console.log('Person.prototype.setName', name);
    console.log('this.name', this.name);
    console.log('Person.prototype.age', this.age);
}
var person = new Person()
console.log('person', person)
person.name = 'kk'
person.setName('hhee')


console.log('Person.prototype', Person.prototype);


Person.prototype = {
    age: 200
}
console.log('person', person);
var person1 = new Person()
console.log('person1', person1);
console.log('person1', person1.setName('rrt')); // 报错，由此可见person和person1指向的不是一个原型
