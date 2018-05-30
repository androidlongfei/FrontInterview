// 属性扩展

/**
 * 1.属性名表达式
 * JavaScript 定义对象的属性，有两种方法。
 * 方法一:obj.foo = true;
 * 方法二:obj['a' + 'bc'] = 123;
 */

let propKey = 'foo';

let obj = {
    [propKey]: true,
    ['a' + 'bc']: 123
};

console.log(obj); // { foo: true, abc: 123 }

// 备注:属性名表达式与简洁表示法，不能同时使用，会报错。
