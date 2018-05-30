/**
 * 箭头函数基本使用
 */


// 1.  一个参数对应一个表达式
// param => expression;
// 例如
let func = (x => x + 2); // 也可以去掉最外面的小括号
console.log(func(5)); // 输出 7

//2. 多个参数对应一个表达式
// (param [, param]) => expression;
//例如
let func1 = ((x, y) => (x + y)); // 也可以去掉最外面的小括号
console.log(func1(1, 2)); //输出 3

//3. 一个参数对应多个表示式
// param => {statements;}
//例如
let func2 = (x => {
    x++;
    return x;
}); //多个表达式必须用{}包裹,如果有返回值必须用return
console.log(func2(1)); // 输出 2

//4. 多个参数对应多个表达式
// ([param] [, param]) => {statements}
// 例如
let func3 = (x, y) => {
    x++;
    y++;
    return x * y;
};
console.log(func3(1, 2)); // 输出 6

//5. 表达式里没有参数
// () => expression;
//例如
let func4 = (() => 10);
console.log(func4()); // 输出 10

//6. 传入一个表达式，返回一个对象
// ([param]) => ({ key: value });
// 例如
let fuc5 = (x) => ({
    key: x
});
console.log(fuc5(12)); // 输出 {key:12}
