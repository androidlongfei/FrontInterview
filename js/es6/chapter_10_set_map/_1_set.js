// set的用法

/**
 * ES6 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。
 */

//  基本用法 (整数)

const s = new Set();

[2, 3, 5, 4, 5, 2, 2].forEach(x => s.add(x));

for (let i of s) {
    console.log(i);
}

// 2 3 5 4

// 字符串
const s1 = new Set()
s1.add('s')
s1.add('a')
s1.add('b')
s1.add('a')
s1.add('c')

for (let item of s1) {
    console.log(item);
}

// s a b c

// 对象 (不同的引用地址)

const s2 = new Set()

const origin = [{
        a: 100
    },
    {
        a: 100
    }
]

origin.forEach(item => {
    s2.add(item)
})

for (let item of s2) {
    console.log(item);
}

// {a:100} {a:100}

// 相同的引用地址

console.log('--------------');

const s3 = new Set()

const obj = {
    a: 100
}

s3.add(obj)
s3.add(obj)

for (let item of s3) {
    console.log(item);
}

// { a: 100 }

/**
 * 2. api
 * add(value)：添加某个值，返回 Set 结构本身。
 * delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。
 * has(value)：返回一个布尔值，表示该值是否为Set的成员。
 * clear()：清除所有成员，没有返回值。
 */


/**
 * 3.应用
 */

let parm1 = [1, 2, 3, 4]
let parm2 = [3, 4, 5, 6, 7]

// 并集
// 1.合并数组
let mergeArr = [...parm1, ...parm2]
// 过滤重复元素
let filterRepeat = new Set(mergeArr)
console.log(filterRepeat); // Set { 1, 2, 3, 4, 5, 6, 7 }

// 交集
// let intersect = new Set([...parm1].filter(x => parm2.has(x)));
// console.log(intersect);

// 差集
let difference = new Set([...a].filter(x => !b.has(x)));
// Set {1}

// 目前没有直接的方法,在遍历数组时改变其结构
