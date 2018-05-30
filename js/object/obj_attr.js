
// javascript，检测对象中是否存在某个属性

//1.使用in关键字。

let obj = {
  x:1
}
console.log('x' in obj);//true
console.log('y' in obj);//false
console.log('toString' in obj);//继承属性

//2.使用对象的hasOwnProperty()方法。
console.log(obj.hasOwnProperty("x"));    　　 //true，自有属性中有x
console.log(obj.hasOwnProperty("y"));    　　 //false，自有属性中不存在y
console.log(obj.hasOwnProperty("toString")); //false，这是一个继承属性，但不是自有属性

// 3.用undefined判断
conosle.log(obj.x!==undefined);        //true
conosle.log(o.y!==undefined);        //false
console.log(o.toString!==undefined);  //true
