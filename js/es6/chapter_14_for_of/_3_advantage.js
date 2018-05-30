/**
 * 1.数组提供内置的forEach方法
 * 缺点:无法中途跳出forEach循环，break命令或return命令都不能奏效。
 */

const myArray = [1, 2, 3, 4, 5]

myArray.forEach(function (value) {
    console.log(value);
});

// 值 1 2 3 4 5

/**
 * 2.for...in循环可以遍历数组的键名。
 * 数组的键名是数字，但是for...in循环是以字符串作为键名“0”、“1”、“2”等等。
 * for...in循环不仅遍历数字键名，还会遍历手动添加的其他键，甚至包括原型链上的键
 * 某些情况下，for...in循环会以任意顺序遍历键名
 *
 * 总之，for...in循环主要是为遍历对象而设计的，不适用于遍历数组
 */


for (let item in myArray) {
    console.log(item);
}

// 键 0 1 2 3 4

/**
 * 3.for...of
 * 有着同for...in一样的简洁语法，但是没有for...in那些缺点
 * 不同于forEach方法，它可以与break、continue和return配合使用。
 */

for (let item of myArray) {
    if (item > 3) {
        break;
    }
    console.log(item);
}

// 值 1 2 3

/**
 * 总结:
 * 遍历对象用for...in
 * 遍历数组用for...of和forEach
 * 遍历数组需要用到break,continue等控制语句时，用for of
 */
