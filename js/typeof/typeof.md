# js中的类型检测

在JavaScript中，有5种基本数据类型和1种复杂数据类型。

基本数据类型有:Undefined, Null, Boolean, Number,String。

复杂数据类型是Object。Object中还细分了很多具体的类型,比如:Json, Array, Function, Date, Reg, Error。

检测数据类型有以下三种方法:

- typeof
- instanceof
- Object.prototype.toString.call

```javascript
var num = 123;
var str = 'abcdef';
var bool = true;
var arr = [1, 2, 3, 4];
var json = { name: 'wenzi', age: 25 };
var func = function () { console.log('this is function'); }
var und = undefined;
var nul = null;
var date = new Date();
var reg = /^[a-zA-Z]{5,20}$/;
var error = new Error();
```

## 1.typeof

```javascript
console.log(
    typeof num,
    typeof str,
    typeof bool,
    typeof arr,
    typeof json,
    typeof func,
    typeof und,
    typeof nul,
    typeof date,
    typeof reg,
    typeof error
);

// 输出结果：number string boolean object object function undefined object object object object
```

可见用typeof检测 array json undefined null date red error 都是object

总结: typeof 只能检测 num , string , boolean

## 2.instanceof

```javascript
console.log(
    num instanceof Number,
    str instanceof String,
    bool instanceof Boolean,
    arr instanceof Array,
    json instanceof Object,
    func instanceof Function,
    und instanceof Object,
    nul instanceof Object,
    date instanceof Date,
    reg instanceof RegExp,
    error instanceof Error
)
// false false false true true true false false true true true
```

总结: instanceof只能检测object不能检测到number,string,boolean

## 3.toString.call

```javascript
console.log(
    Object.prototype.toString.call(num),
    Object.prototype.toString.call(str),
    Object.prototype.toString.call(bool),
    Object.prototype.toString.call(arr),
    Object.prototype.toString.call(json),
    Object.prototype.toString.call(func),
    Object.prototype.toString.call(und),
    Object.prototype.toString.call(nul),
    Object.prototype.toString.call(date),
    Object.prototype.toString.call(reg),
    Object.prototype.toString.call(error)
);
// 输出结果如下:
// [object Number] [object String] [object Boolean] [object Array]
// [object Object] [object Function] [object Undefined] [object Null]
// [object Date] [object RegExp] [object Error]
```

总结:此方法都能检测出来,推荐使用。

## 对比

类型判断  | typeof       | instanceof          | toString.call
----- | :----------- | :------------------ | --------------------------
num   | number       | false               | [object Number]
str   | string       | false               | [object String]
bool  | boolean      | false               | [object Boolean]
arr   | object       | true                | [object Array]
json  | object       | true                | [object Object]
func  | function     | true                | [object Function]
und   | undefined    | false               | [object Undefined]
nul   | object       | false               | [object Null]
date  | object       | true                | [object Date]
reg   | object       | true                | [object RegExp]
error | object       | true                | [object Error]
优点    | 使用简单，能直接输出结果 | 能检测出复杂的类型           | 检测出所有的类型
缺点    | 检测出的类型太少     | 基本类型检测不出，且不能跨iframe | IE6下undefined,null均为Object
