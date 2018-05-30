// 字符串的扩展

/**
 * includes,startsWith,endsWith,repeat
 */

/**
 * 1.JavaScript 允许采用\uxxxx形式表示一个字符，其中xxxx表示字符的 Unicode 码点。
 */

console.log("\u0061"); // a

/**
 * 2.
 * ES5 对字符串对象提供charAt方法，返回字符串给定位置的字符。该方法不能识别码点大于0xFFFF的字符.
 * ES6 at()可以
 */

let test = '𠮷';
let test1 = 'abc';

// charAt()

console.log(test.charAt(0)); // 乱码
console.log(test1.charAt(0)); // a

// at()

// console.log(test.at(0)); // 乱码
// console.log(test1.at(0)); // a

/**
 * 3.
 * includes()：返回布尔值，表示是否找到了参数字符串。
 * startsWith()：返回布尔值，表示参数字符串是否在原字符串的头部。
 * endsWith()：返回布尔值，表示参数字符串是否在原字符串的尾部。
 */

let str = 'hello world'

console.log(str.includes('ll')); // true
console.log(str.includes('lll')); // false
console.log(str.startsWith('hello')); // true
console.log(str.endsWith('world')); // true


/**
 * 4.
 * repeat方法返回一个新字符串，表示将原字符串重复n次。
 */


let str1 = 'we'

console.log(str1.repeat(3)); // wewewe


/**
 * 5.
 * ES2017 引入了字符串补全长度的功能。如果某个字符串不够指定长度，会在头部或尾部补全。
 * padStart() 头部补全
 * padEnd() 尾部补全
 * 如果原字符串的长度，等于或大于指定的最小长度，则返回原字符串。
 */

// 位数补全
// '1'.padStart(10, '0') // "0000000001"

// 提示字符串格式
// '12'.padStart(10, 'YYYY-MM-DD') // "YYYY-MM-12"
// '09-12'.padStart(10, 'YYYY-MM-DD') // "YYYY-09-12"


/**
 * 6.模版字符串
 * 模板字符串（template string）是增强版的字符串，用反引号（`）标识
 */

let xy = 100
let mn = 200

console.log(`${xy} + ${mn} = ${xy + mn}`); // 100 + 200 = 300
