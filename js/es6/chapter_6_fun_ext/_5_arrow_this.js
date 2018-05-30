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
    console.log('example2', this.param);
}

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
