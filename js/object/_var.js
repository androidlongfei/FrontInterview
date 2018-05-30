// 先使用后声明
function test() {
  console.log(mm)
  var mm = 123
}

// 先声明后使用
function test1() {
  var mm = 123
  console.log(mm)
}

// 声明不赋值
function test2() {
  console.log(mm)
}

// 不声明,直接使用
function test3() {
  console.log(mm)
}

// undefined
test()

// 123
test1()

// 报错 mm is not defined
test2()
