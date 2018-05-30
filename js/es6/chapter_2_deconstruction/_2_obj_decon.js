// 对象的解构赋值

/**
 * 对象的解构与数组有一个重要的不同。数组的元素是按次序排列的，变量的取值由它的位置决定；而对象的属性没有次序，变量必须与属性同名，才能取到正确的值。
 */


let {
    foo,
    bar
} = {
    foo: "aaa",
    bar: "bbb"
};

console.log(foo, bar); // aaa bbb

let {
    x,
    y
} = {
    x: {
        a: 100,
        b: 101
    }
}

console.log(x); // { a: 100, b: 101 }

let {
    m,
    n
} = {
    m: {
        a: 100,
        b: 101
    },
    n: [1, 2, 3]
}

console.log(m, n); // { a: 100, b: 101 } [ 1, 2, 3 ]

/**
 * 2.对象嵌套，解构赋值
 * 引用类型赋值的地址
 */

const parma1 = {
    address: {
        unit: 1,
        city: 'beijing'
    },
    age: 100,
    name: 'zhangsan'
}

const { address, name } = parma1
console.log(name, address); // zhangsan { unit: 1, city: 'beijing' }
// 改变地址
parma1.address.city = 'hubei'
console.log(name, address); // zhangsan { unit: 1, city: 'hubei' }
// 再次改变
address.city = 'shanghai'
console.log(name, parma1.address); // zhangsan { unit: 1, city: 'shanghai' }
