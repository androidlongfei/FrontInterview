
// == 与 ===

console.log(false === 'false')
console.log(false == 'false')

console.log(false === null)
console.log(false == null)

console.log(undefined === null)
console.log(undefined == null)

console.log(0 === '')
console.log(0 == '')


// function语句

var x = 2;
　　function test(){
　　　　this.x = 1;
　　}
　　var o = new test();
console.log(o.x)
　　console.log(x); //2
