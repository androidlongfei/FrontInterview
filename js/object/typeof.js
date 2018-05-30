function show(x) {

    console.log(typeof x); // undefined
    console.log(typeof 10); // number
    console.log(typeof 'abc'); // string
    console.log(typeof true); // boolean

    console.log(typeof
        function() {}); //function

    console.log(typeof [1, 'a', true]); //object
    console.log(typeof {
        a: 10,
        b: 20
    }); //object
    console.log(typeof null); //object
    console.log(typeof new Number(10)); //object
}
show();

/*
以上代码列出了typeof输出的集中类型标识，其中上面的四种（undefined, number, string, boolean）属于简单的值类型，不是对象。
剩下的几种情况——函数、数组、对象、null、new Number(10)都是对象。
他们都是引用类型。
*/

// 判断一个变量是不是对象非常简单。值类型的类型判断用typeof，引用类型的类型判断用instanceof。
var fn = function () { };
console.log(fn instanceof Object);  // true

// 一切（引用类型）都是对象，对象是属性的集合
