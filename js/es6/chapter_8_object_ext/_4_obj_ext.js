// 对象扩展运算符 (ES2017才有)

/**
 * 1.对象的解构赋值
 * 对象的解构赋值用于从一个对象取值，相当于将所有可遍历的、但尚未被读取的属性，分配到指定的对象上面。
 * 所有的键和它们的值，都会拷贝到新对象上面
 */

// ES2017

// let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };

// console.log('x', x);


let test = {
    name: 'zhangsan',
    age: 23,
    love: [{ t: 1 }, { t: 2 }],
    relate: {
        r: 'me'
    }
}

console.log('test', { ...test });

let cloneTest = { ...test, new: 'nn' }

console.log(cloneTest);
