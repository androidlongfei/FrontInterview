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

// 1. 使用typeof 检测

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
// 可见用typeof检测 array json  undefined null date red error 都是object
// function 是 function

// 2. 使用instance检测

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
// 输出结果如下:
// num : false
// str : false
// bool : false
// arr : true
// json : true
// func : true
// und : false
// nul : false
// date : true
// reg : true
// error : true

// 从上面的运行结果我们可以看到，num, str和bool没有检测出他的类型

// 当然可以用Number,String,Boolean包装一下,就可以检测出来了

var num = new Number(123);
var str = new String('abcdef');
var boolean = new Boolean(true);

// 同时，我们也要看到，und和nul是检测的Object类型，才输出的true，因为js中没有Undefined和Null的这种全局类型

// 3.使用Object.prototype.toString.call检测

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

if (Object.prototype.toString.call(num) == '[object Number]') {
    console.log(num + ' is Number'); // 输出: 123 is Number
}

// 输出结果如下:
// [object Number] [object String] [object Boolean] [object Array]
// [object Object] [object Function] [object Undefined] [object Null]
// [object Date] [object RegExp] [object Error]

// 可见此方法都能检测出来

// 推荐使用第三种方法
