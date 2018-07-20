 //3.封装

 let Person = function () {
     //变量作用域为函数内部，外部无法访问
     let name = 'defalut' // 私有属性
     return {
         getName: function () {
             return name // 公共方法
         },
         setName: function (newName) {
             name = newName // 公共方法
         }
     }
 }

 let newPerson = new Person()
 console.log(newPerson.name) // 直接访问 undefine
 console.log(newPerson.getName()) // defalut

 newPerson.setName('hello')
 console.log(newPerson.getName()) //hello

 let newPerson1 = new Person()
 console.log(newPerson1.getName()) // defalut
