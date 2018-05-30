# 自定义vue参考文档

- [理解Object.defineProperty的作用](https://segmentfault.com/a/1190000007434923)
- [Object.defineProperty文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)
- [Vue双向数据绑定例子1](https://segmentfault.com/a/1190000014274840)
- [Vue双向数据绑定例子2](https://segmentfault.com/a/1190000006599500)
- [Vue双向数据绑定例子2-github](https://github.com/DMQ/mvvm)
- [queryselector使用](http://www.runoob.com/jsref/met-document-queryselector.html)

**querySelector**

querySelector() 方法仅仅返回匹配指定选择器的第一个元素。如果你需要返回所有的元素，请使用 querySelectorAll() 方法替代。

```html
获取文档中 id="demo" 的元素：

document.querySelector("#demo");
```

## 自执行函数

```
1.什么是自执行函数

其形如：（function(a){}）(a)
```

```
2.用处

javascript中没用私有作用域的概念，如果在多人开发的项目上，你在全局或局部作用域中声明了一些变量，可能会被其他人不小心用同名的变量给覆盖掉，

根据javascript函数作用域链的特性，可以使用这种技术可以模仿一个私有作用域，用匿名函数作为一个“容器”，

“容器”内部可以访问外部的变量，而外部环境不能访问“容器”内部的变量，

所以( function(){…} )()内部定义的变量不会和外部的变量发生冲突，俗称“匿名包裹器”或“命名空间”。
```
