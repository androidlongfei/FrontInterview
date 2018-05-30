/**
 * JavaScript 的对象（Object），本质上是键值对的集合（Hash 结构），但是传统上只能用字符串当作键。这给它的使用带来了很大的限制.
 *
 * 为了解决这个问题，ES6 提供了 Map 数据结构。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键
 */

// 基本用法

const m = new Map();
const o = { p: 'Hello World' };

m.set(o, 'content'); // 其实是将对象的地址作为key
console.log(m.get(o)); // "content"

m.set('name', '张三')
console.log(m.get('name'));
console.log(m.has('name'));

console.log(m);

/**
 * 2.api
 * map.set()
 * map.get()
 * map.has() // 包含某个元素
 * map.delete() //删除某个元素
 * map.clear() //删除所有元素
 */
