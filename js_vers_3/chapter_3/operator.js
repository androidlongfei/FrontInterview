/**
 * == 与 === 的区别
 */

var result1 = ('55' == 55)
var result2 = ('55' === 55)
console.log('result1:', result1); // true , 因为转换后相等
console.log('result2:', result2); // false , 因为不同的数据类型不相等

// 备注:==是相等操作符,两个操作符相等则返回true.规则是先转化，后比较
// ===是全等操作符，它只在两个操作符未经转换就相等的情况下返回true.仅比较而不转化.

// 相等(==)的转换规则
// 1.boolean先转换为数字,true是1,false是0
// 2.一个是字符串，一个是数字,在比价相等之前先将字符串转化为数字
// 3.一个是对象，一个不是,先调用对象的valueOf(),再按之前的规则比价
// 4. null 和 undefined是相等的]
// 5. NaN 不等于 NaN (NaN是非数字)


console.log('boolean:', true == 1) // true
console.log('string and number:', '2' == 2); // true
console.log('null and undefined:', null == undefined); // true
console.log('NaN and NaN:', NaN == NaN); // fasle
console.log('print NaN:', Number('dd'));


// switch 使用全等操作符

var num = 3

switch (num) {
  case '3':
    console.log('string 3');
    break;
  case 3:
    console.log('num 3');
    break;
}

// 输出 num 3
