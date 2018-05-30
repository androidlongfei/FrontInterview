//计算斐波那契数列
function fib(n) {
  // console.log(n)
  var result = 0;
   if (n > 2) {
     result = fib(n - 1) + fib(n - 2);
   } else if (n > 0) {
    result = 1;
  }
  return result;
}
 function result() {
     var startTime, endTime;
     var d = new Date();
     startTime = d.getTime();
     //console.log(startTime);
     console.log(fib(50));
     d = new Date();
     endTime = d.getTime();
     return (endTime-startTime)/1000;
 }
console.log(result());
console.log('end....')
