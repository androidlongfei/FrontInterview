// Object.assign

/**
 * Object.assign方法用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）。
 */


/**
 * 基本用法
 * 第一个参数是目标对象，后面的参数都是源对象。
 * 注意，如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性。
 * Object.assign拷贝的属性是有限制的，只拷贝源对象的自身属性（不拷贝继承属性），也不拷贝不可枚举的属性（enumerable: false）。
 */

const target = { a: 1 };

const source1 = { b: 2 };
const source2 = { c: 3 };

const pa = Object.assign(target, source1, source2)

console.log('pa', pa); // { a: 1, b: 2, c: 3 }
console.log('target === pa', target === pa);

/**
 * 1.浅拷贝
 * Object.assign方法实行的是浅拷贝，而不是深拷贝。也就是说，如果源对象某个属性的值是对象，那么目标对象拷贝得到的是这个对象的引用。
 */

const obj1 = { a: { b: 1 } };
const obj2 = Object.assign({}, obj1);

obj1.a.b = 2;
console.log(obj2); // { a: { b: 2 } }

/**
 * 2.同名属性的替换
 * 对于嵌套的对象，一旦遇到同名属性，Object.assign的处理方法是替换，而不是添加。
 */

const mTarget = { a: { b: 'c', d: 'e' } }
const mSource = { a: { b: 'hello' } }
const target1 = Object.assign(mTarget, mSource)
console.log(mTarget); // { a: { b: 'hello' } }
// 上面代码中，mTarget对象的a属性被mSource对象的a属性整个替换掉了，而不会得到{ a: { b: 'hello', d: 'e' } }的结果
console.log('target1 === mTarget', mTarget === target1);


/**
 * 3.常见用途
 */

// 3.1 为对象添加属性
console.log(Object.assign({ a: 12, b: 34 }, { x: 10 })); // { a: 12, b: 34, x: 10 }

// 3.2 为对象添加方法

// 3.3 克隆对象。将原始对象拷贝到一个空对象，就得到了原始对象的克隆
console.log(Object.assign({}, { a: 10 })); // {a:10}

// 3.4 合并多个对象

// 3.5 将多个对象合并到某个对象。
const merge = (target, ...sources) => {
    console.log('...sources', ...sources);
    return Object.assign(target, ...sources)
}

const tar = {
    a: 10
}
console.log('merge', merge(tar, { b: 10 }, { c: 24 }));
