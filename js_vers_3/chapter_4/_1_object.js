// js 函数传递参数都是值传递
//
// 基本数据类型(boolean,string,number,undefined,null,)是固定大小，保存在栈内存中

function setObj(obj) {
  obj.name = 'lisi'
}

function setObjAttr(obj) {
  obj = new Object() // obj 是局部变量，函数运行完即销毁
  // obj = {}
  console.log('obj', obj) // 输出 {}
  obj.name = 'wanwu'
  console.log('new setObjAttr', obj)
}

var person = new Object()
console.log('person', person) // shansan
person.name = 'shansan'
setObj(person)
console.log('setObj', person) // lisi
setObjAttr(person)
console.log('setObjAttr', person) // lisi

// Object类型
//

var objectType = {
  kk: 123
}

var arrayType = [1, 2, 3]

function funType() {

}

console.log('Object是对象', objectType instanceof Object); // true

console.log('Array是数组', arrayType instanceof Array); // true

console.log('数组是对象:', arrayType instanceof Object); // true 数组是对象

console.log('对象是数组:', objectType instanceof Array); // false 对象不是数组

console.log('函数是对象:', funType instanceof Object); // true  函数是对象

console.log('null是对象:', null instanceof Object); // true  null不是对象

function addTen() {
  var item = 0

  function getItem() {
    item += 10
    return item
  }
  return getItem
}

var add = addTen()

for (var i = 1; i <= 10; i++) {
  console.log(i, add())
}
