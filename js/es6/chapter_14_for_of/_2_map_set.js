// Set 和 Map 结构也原生具有 Iterator 接口，可以直接使用for...of循环。

/**
 * for...of在Set中的基本用法
 */

let engines = new Set(["Gecko", "Trident", "Webkit", "Webkit"]);
engines.add("Jdon")
for (var e of engines) {
    console.log(e);
}
// Gecko Trident Webkit Jdon

let newEngines = [...engines];
console.log('newEngines', newEngines); // [ 'Gecko', 'Trident', 'Webkit', 'Jdon' ]

/**
 * for...of在Map中的基本用法
 */

let es6 = new Map();
es6.set("edition", 6);
es6.set("committee", "TC39");
es6.set("standard", "ECMA-262");
for (var [name, value] of es6) {
    console.log(name + ": " + value);
}

// edition: 6
// committee: TC39
// standard: ECMA-262

/**
 * 备注
 * 首先，遍历的顺序是按照各个成员被添加进数据结构的顺序。
 * 其次，Set结构遍历时，返回的是一个值，而 Map 结构遍历时，返回的是一个数组，该数组的两个成员分别为当前 Map 成员的键名和键值。
 */

let map = new Map().set('a', 1).set('b', 2);
for (let pair of map) {
    console.log(pair);
}
// ['a', 1]
// ['b', 2]
