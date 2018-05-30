/**
 * cosnt:声明一个只读的常量。一旦声明，常量的值就不能改变。
 */

const PI = 3.1415;

console.log(PI);

// PI = 3; // 报错 Assignment to constant variable

/**
 * 1.const声明的变量不得改变值，
 * 这意味着，const一旦声明变量，就必须立即初始化，不能留到以后赋值。
 */


// const foo
// 报错 Missing initializer in const declaration


/**
 * 2.const的作用域与let命令相同：只在声明所在的块级作用域内有效。
 */

/**
 * 3.const声明的常量，也与let一样不可重复声明。
 */

var message = "Hello!";
let age = 25;

// 以下两行都会报错
// const message = "Goodbye!";
// const age = 30;

// 4. const本质
// const实际上保证的，并不是变量的值不得改动，而是变量指向的那个内存地址不得改动
// 对于简单类型的数据（数值、字符串、布尔值），值就保存在变量指向的那个内存地址，因此等同于常量。
// 但对于复合类型的数据（主要是对象和数组），变量指向的内存地址，保存的只是一个指针，const只能保证这个指针是固定的，至于它指向的数据结构是不是可变的，就完全不能控制了。
// 因此，将一个对象声明为常量必须非常小心。
