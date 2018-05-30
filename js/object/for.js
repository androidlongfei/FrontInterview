
// 在for循环中变量都是全局的。不像java，在函数内声明的变量，在函数外不能直接访问，js都是全局的，所以可以访问

for (var i=0; i<5; i++){
  // console.log(i);
}
console.log(i);//输出5 ，之所以是5，是因为在循环外，最后还要走一次i++

for (var h=0; h<5; h++) {
  var object = 'hello';
}

console.log(object);//hello,  由此可见for循环中的变量都是全局变量

for (let m=0; m<5; m++){

}
// console.log(m);//报错 let声明，m的作用域在for循环以内
