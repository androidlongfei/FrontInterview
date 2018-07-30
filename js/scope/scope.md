# 理解 JavaScript 作用域

- <http://www.cnblogs.com/lhb25/archive/2011/09/06/javascript-scope-chain.html>
- <http://web.jobbole.com/91134/>

## 什么是作用域？

作用域是你的代码在运行时，各个变量、函数和对象的可访问性。换句话说，作用域决定了你的代码里的`变量和其他资源在各个区域中的可见性`。

## 为什么需要作用域？最小访问原则

那么，限制变量的可见性，不允许你代码中所有的东西在任意地方都可用的好处是什么？其中一个优势，是作用域为你的代码提供了一个`安全层级`。计算机安全中，有个常规的原则是：`用户只能访问他们当前需要的东西`。

在你的编程旅途中，你会意识到作用域在你的代码中可以提升性能，跟踪 bug 并减少 bug。作用域还解决不同范围的同名变量命名问题。记住不要弄混作用域和上下文。它们是不同的特性。

## JavaScript中的作用域

在 JavaScript 中有两种作用域

- 全局作用域
- 局部作用域

当变量定义在一个函数中时，变量就在局部作用域中，而定义在函数之外的变量则从属于全局作用域。每个函数在调用的时候会创建一个新的作用域。

## 全局作用域

当你在文档中（document）编写 JavaScript 时，你就已经在全局作用域中了。JavaScript 文档中（document）只有一个全局作用域。定义在函数之外的变量会被保存在全局作用域中。

```javascript
var test = 'hello' // 全局作用域
```

全局作用域里的变量能够在其他作用域中被访问和修改。

```javascript
var test = 'hello' // 全局作用域
function foo(){
    console.log(test); // hello
}
```

## 局部作用域

定义在函数中的变量就在局部作用域中。并且函数在每次调用时都有一个`不同的作用域`。这意味着同名变量可以用在不同的函数中。因为这些变量绑定在不同的函数中，拥有不同作用域，彼此之间不能访问。

```javascript
var mk = 'ss' // 全局作用域
function some1(){
    var t1 = 'hh' // 局部作用域
    function some2(){
        var t2 = 'mm' // 局部作用域
    }
}
```

let和const关键字支持在块级声明中创建使用局部作用域。

```javascript
{
    let jk = 'lll'
    console.log(jk); // lll
}
console.log(jk); // undefined
```

一个应用中全局作用域的`生存周期与该应用相同`。局部作用域只在该函数调用`执行期间存在`。

## 上下文

很多开发者经常弄混作用域和上下文，似乎两者是一个概念。但并非如此。作用域是我们上面讲到的那些，而上下文通常涉及到你代码某些特殊部分中的this值。

作用域指的是`变量的可见性`，而上下文指的是`在相同的作用域中的this的值`。我们当然也可以使用函数方法改变上下文。

## 执行环境

为了解决掉我们从上面学习中会出现的各种困惑，"执行环境（context）"这个词中的"环境（context）"指的是作用域而并非上下文。

JavaScript 是一种单线程语言，所以它同一时间只能执行单个任务。其他任务排列在执行环境中。当 JavaScript 解析器开始执行你的代码，环境（作用域）默认设为全局。全局环境添加到你的执行环境中，事实上这是执行环境里的第一个环境。

之后，每个函数调用都会添加它的环境到执行环境中。无论是函数内部还是其他地方调用函数，都会是相同的过程。

每个函数都会创建它自己的执行环境。

当浏览器执行完环境中的代码，这个环境会从执行环境中弹出，执行环境中当前环境的状态会转移到父级环境。浏览器总是先执行在执行栈顶的执行环境（事实上就是你代码最里层的作用域）。

全局环境只能有一个，函数环境可以有任意多个。 执行环境有两个阶段：创建和执行。

## 创建阶段

第一阶段是创建阶段，是函数刚被调用但代码并未执行的时候。创建阶段主要发生了 3 件事。

- 创建变量对象
- 创建作用域链
- 设置上下文（this）的值

## 变量对象

变量对象（Variable Object）也称为活动对象（activation object），包含所有变量、函数和其他在执行环境中定义的声明。当函数调用时，解析器扫描所有资源，包括函数参数、变量和其他声明。当所有东西装填进一个对象，这个对象就是变量对象。

```javascript
'variableObject': {
    // contains function arguments, inner variable and function declarations
}
```

## 作用域链

在执行环境创建阶段，作用域链在变量对象之后创建。作用域链包含变量对象。作用域链用于解析变量。当解析一个变量时，JavaScript 开始从最内层沿着父级寻找所需的变量或其他资源。作用域链包含自己执行环境以及所有父级环境中包含的变量对象。

```javascript
'scopeChain': {
    // contains its own variable object and other variable objects of the parent execution contexts
}
```

## 执行环境对象

执行环境可以用下面抽象对象表示：

```javascript
executionContextObject = {
    'scopeChain': {}, // contains its own variableObject and other variableObject of the parent execution contexts
    'variableObject': {}, // contains function arguments, inner variable and function declarations
    'this': valueOfThis
}
```

## 代码执行阶段

执行环境的第二个阶段就是代码执行阶段，进行其他赋值操作并且代码最终被执行。

## 词法作用域

词法作用域的意思是在函数嵌套中，内层函数可以访问父级作用域的变量等资源。这意味着子函数词法绑定到了父级执行环境。

## JavaScript函数的4个内置方法

- Function.prototype.apply()
- Function.prototype.bind() (Introduced in ECMAScript 5 (ES5))
- Function.prototype.call()
- Function.prototype.toString()

Function.prototype.toString()返回函数代码的字符串表示。
