# 原型链原理

- [原型链1](http://blog.csdn.net/guiqiss/article/details/53782008)
- [原型链2](http://blog.csdn.net/guiqiss/article/details/53782008)
- [原型链3](http://www.cnblogs.com/wangfupeng1988/p/3989357.html)

原型链主要是用来继承的

## 普通对象继承Object

```
var a = {};
```

```javascript
toString()
```

访问一个对象的属性时，先在基本属性中查找，如果没有，再沿着**proto**这条链向上找，这就是原型链

## 函数继承Function

```javascript
call()

apply()

arguments()
```

函数也是继承Object

# #

在JavaScript 中，每当定义一个对象（函数）时候，对象中都会包含一些预定义的属性。其中函数对象的一个属性就是原型对象 prototype。

注：普通对象没有prototype,但有proto属性。

## 函数对象和普通对象的创建过程

普通对象

var a = {};

创建过程如下:

```javascript
a = new Object();
a.__proto__ = Object.prototype
Object.prototype.__proto__ = null
```

函数对象
