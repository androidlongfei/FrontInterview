/**
 * Symbol:ES6 引入了一种新的原始数据类型Symbol，表示独一无二的值.
 * 它是 JavaScript 语言的第七种数据类型，前六种是：undefined、null、布尔值（Boolean）、字符串（String）、数值（Number）、对象（Object）。
 */


/**
 * 1.Symbol 值通过Symbol函数生成.
 * 凡是属性名属于 Symbol 类型，就都是独一无二的，可以保证不会与其他属性名产生冲突。
 */

let s = Symbol();

console.log(s) // Symbol()
console.log(typeof s); // symbol


/**
 * 2.参数
 * Symbol函数可以接受一个字符串作为参数，表示对 Symbol 实例的描述，主要是为了在控制台显示，或者转为字符串时，比较容易区分。
 */

let s1 = Symbol('foo');
let s2 = Symbol('bar');

console.log(s1); // Symbol(foo)
console.log(s2); // Symbol(bar)

console.log(s1.toString()); // Symbol(foo)
console.log(s2.toString()); // Symbol(bar)

console.log(Symbol('aaa') === Symbol('aaa')); // false 可见Symbol是唯一的参数只是起到一个注释的作用


/**
 * 3.作为属性名的Symbol
 * Symbol 值作为属性名时，该属性还是公开属性，不是私有属性。
 */

let mySymbol = Symbol();

// 第一种写法
let a = {};
a[mySymbol] = 'Hello!';

// 第二种写法
let b = {
    [mySymbol]: 'Hello!'
};

// 第三种写法
let c = {};
Object.defineProperty(c, mySymbol, { value: 'Hello!' });

console.log('a', a);
console.log(a[mySymbol]);

console.log('b', b);
console.log(b[mySymbol]);

console.log('c', c);
console.log(c[mySymbol]);


/**
 * 4.消除魔术字符串
 * 就是作为唯一值
 */

const colorType = {
    red: Symbol(),
    bule: Symbol(),
    green: Symbol()
};

console.log('colorType', colorType);

const choiceType = (type) => {
    switch (type) {
        case colorType.red:
            console.log('red');
            break;
        case colorType.bule:
            console.log('bule');
            break;
        case colorType.green:
            console.log('green');
            break;
        default:

    }
}
choiceType(colorType.red)
choiceType(colorType.bule)
