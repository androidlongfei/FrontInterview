var foo1 = new function () {

}

function Foo() {

}
var foo2 = new Foo();

console.log(typeof foo1); // object
console.log(typeof foo2); // object
