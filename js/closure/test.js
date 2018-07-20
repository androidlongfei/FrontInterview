let add = function (a) {
    console.log(a)
    return function (b) {
        return a + b;
    }
}

let result = add(10)
console.log(result(20))
console.log(result(30))
console.log(result(20))

function Person() {
    let a = 100;

    function m(b) {
        return a + b
    }

    this.publicMethod = function (b) {
        return m(b)
    }
}

let person = new Person();
console.log(person.publicMethod(100));
