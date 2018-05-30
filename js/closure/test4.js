 //3.封装

let Person = function (){
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
}

let newPerson = new Person()
console.log(newPerson.name) // 直接访问 undefine
console.log(newPerson.getName()) //defalut

newPerson.setName('hello')
console.log(newPerson.getName()) //hello
