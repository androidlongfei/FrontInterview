//3.封装

let person = function (){
 //变量作用域为函数内部，外部无法访问
 let name = 'defalut'
 return {
   getName:function(){
     return name
   },
   setName:function(newName){
     name = newName
   }
 }
}()

console.log(person.name) // 直接访问 undefine
console.log(person.getName()) //defalut

person.setName('hello')
console.log(person.getName()) //hello
