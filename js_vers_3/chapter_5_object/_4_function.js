function Person() {

}

Person.prototype = {
    age: 100,
    setName: function (name) {

    }
}

console.log('Person', Person);
var person = new Person()
console.log('person.construct', person.constructor);
console.log('person', person);
