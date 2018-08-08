/**
 * 箭头函数注意事项
 */

/**
 * 1.函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。
 */

/**
 * 1.1
 * this指向的固定化，并不是因为箭头函数内部有绑定this的机制，实际原因是箭头函数根本没有自己的this，导致内部的this就是外层代码块的this。
 */

param = 100

// Nodejs 全局中的this默认是一个空对象。并且在全局中this与global对象没有任何的关系
console.log(this); // {}
console.log(global.this); // 100

function example1() {
    // this指向global,谁调用指向谁
    console.log('example1', this.param);
}

let example2 = () => {
    // 箭头函数无this,所以this就指向外层代码块的this，而外层代码块指向的this就是全局的this{}
    console.log('example2', this, this.param);
}

// this.param = '333'

example1() // example1 100
example2() // example2 undefined

/**
 * 1.2 箭头函数可以让setTimeout里面的this，绑定定义时所在的作用域，而不是指向运行时所在的作用域。
 */

function foo() {
    console.log('foo this.id', this.id);
    setTimeout(() => {
        console.log('id:', this.id);
    }, 100);
}

// 全局变量
id = 21;

console.log('global', global.id); // global 21

// foo函数的this指向global
foo() // foo this.id 21

// foo函数内的this指向{id:42}
foo.call({
    id: 42
});
// foo this.id 42

// 设置全局变量

this.mm = '哈哈'

let example3 = {
    age: 100,
    name: '李四',
    getAge: () => {
        // this 指向全局作用域
        return this.age
    },
    setAge: (mAge) => {
        // this 指向全局作用域
        console.log('setAge this =>', this); // { mm: '哈哈' }
        this.age = mAge
        console.log('setAge this =>', this); // { mm: '哈哈', age: 200 }
    },
    setName: function (mName) {
        // this指向example3
        console.log('setName this =>', this); // { age: 100, name: '李四',... }
        this.name = mName
    },
    getName: function () {
        // this指向example3
        return this.name
    }
}

console.log('example3 age=>', example3.age, example3.getAge()); // 100 undefined
example3.setAge(200)
console.log('example3 age=>', example3.age, example3.getAge()); // 100 200

console.log('example3 name=>', example3.name, example3.getName()); // 李四 李四
example3.setName('王五')
console.log('example3 name=>', example3.name, example3.getName()); // 王五 王五


const testCall = () => {
    console.log('testCall', this, this.kkl)
}

const testCall1 = function () {
    console.log('testCall', this.kkl)
}

testCall.call({ kkl: 1001 }) // undefined
testCall1.call({ kkl: 1001 }) // 1001

// 箭头函数无法通过call()改变函数内this的指向


var obj = {
    id: 1,
    show: function () {
        return () => {
            console.log(this, this.id) // 1
        }
    }
}
obj.show()() // { id: 1, show: [Function: show] } 1

// 此例中，箭头函数为一匿名函数，其父级作用域为show函数，因此箭头函数绑定show函数的作用域，show函数中this指向调用show函数的对象，即obj，obj中有id属性，且值为1，所以输出1

obj.show.call({ id: 500 })() // { id: 500 } 500

// 以上改变了箭头函数父级作用域内的this，那箭头函数的this也跟着改变了

// 箭头函数的上下文对象指向它父级作用域的上下文对象
