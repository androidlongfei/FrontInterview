# 个人整理前端面试题

## 一、原型链相关问题

### 1.原型链干嘛用的（初级）

主要作用有两个:

1.实例对象共享原型的方法与属性

例如:

```javascript
// 原型对象
function A(age){
    this.age = age
}

// 共享方法
A.prototype.eat = function(food){
    console.log('eat',food);
}

// 实例对象a1
var a1 = new A(15)
// 实例对象a2
var a2 = new A(18)
a1.eat('面')
a2.eat('米')
```

2.原型对象之间实现继承

```javascript
function A(){
    this.eat = function(food){
        console.log('eat',food);
    }
}

function B(age){
    this.age = age
}

// 原型对象B继承原型A
B.prototype = new A()

var b1 = new B(12)
b1.eat('米')
var b2 = new B(15)
b1.eat('面')
```

### 2.介绍下继承的几种方式（中级）

1.构造继承

```javascript
// 动物类
function Animal( name ) {
    // 属性
    this.name = name || 'Animal';
    // 实例方法
    this.sleep = function ( ) {
        console.log( this.name + '正在睡觉！' );
    }
}
// 原型方法
Animal.prototype.eat = function ( food ) {
    console.log( this.name + '正在吃：' + food );
};

// 猫
function Cat( name, age ) {
    Animal.call( this, name );//此方法重写了父类的构造函数上的this上定义的属性和方法
    this.age = age;
}

let cat = new Cat( 'Tom', 22 );
console.log( cat.name, cat.age ); // Tom 22
console.log( cat instanceof Animal ); // false
if(cat.eat){
    console.log(cat.eat('猫粮'));  // 没任何输出，无法继承原型方法
}
console.log( cat instanceof Cat ); // true
```

> 优点：可以实现多继承（call多个父类对象）;

> 缺点: 实例并不是父类的实例，只是子类的实例;只能继承父类的实例属性和方法，不能继承原型属性/方法;

2.原型链继承

```javascript
function Animal( name ) {
    // 属性
    this.name = name || 'Animal';
    // 实例方法
    this.sleep = function ( ) {
        console.log( this.name + '正在睡觉！' );
    }
}
// 原型方法
Animal.prototype.eat = function ( food ) {
    console.log( this.name + '正在吃：' + food );
};

function Cat( age ) {
    this.age = age;
}
Cat.prototype = new Animal();
let cat = new Cat( 22 );
console.log( cat instanceof Animal ); // true
console.log( cat instanceof Cat ); // true
cat.eat('egg'); // egg
```

> 优点:非常纯粹的继承关系，实例是子类的实例，也是父类的实例

> 缺点:无法实现多继承;创建子类实例时，无法向父类构造函数传参

3.组合继承(原型和构造的组合)

```javascript
function Animal(name) {
    this.name = name
    this.sleep = function () {
        console.log(this.name + '正在睡觉！');
    }
}
// 原型方法
Animal.prototype.eat = function (food) {
    console.log(this.name + '正在吃：' + food);
};
Animal.prototype.color = 'blue';

function Cat(name, age) {
    Animal.call(this, name);
    this.age = age;
}
Cat.prototype = Animal.prototype;

var cat = new Cat('Tom', 20);
console.log('cat', cat.__proto__ === Cat.prototype, cat.__proto__ === Animal.prototype); // cat true true
console.log(cat.name, cat.age);
cat.sleep();
console.log(cat instanceof Animal); // true
console.log(cat instanceof Cat); //true

console.log(new Cat('hiri', 30).name); // hiri
```

> 优点:支持多继承,可以向父类传递参数，可以继承父类的原型方法

> 缺点：效率有点偏低，因为需要拷贝父类的属性。

综上所述：推荐使用第三种。

### 3.原型链原理（中高级）

原型链主要是通过`__proto__`和`prototype`来实现的。

js中一切都是对象。每一个实例对象有一个隐藏的属性`__proto__`,每一个原型对象都有一个`prototype`属性。

实例对象的`__proto__`属性值等于原型对象的`prototype`属性值。

```javascript
function A(){

}
var a = new A()
console.log(a.__proto__ == A.prototype);
```

以下例子讲述原型链的过程

```javascript
function B(age){
    this.age = age
}
B() // B作为一个普通函数
B.call() // 继承自Function
B.toString() // 继承自Object
```

以上示例，是将B作为一个函数调用，而函数是`Funtion`的实例对象，它的原型对象是`Funtion`,所以`B.__proto__ == Funtion.prototype`,而Funtion.prototype值又是Object的实例，故`Funtion.prototype.__proto__ == Object.prototype`,而Object已经是最顶级的对象了,故原型链如下:

```
B.__proto__ => Function.prototype => Function.prototype.__proto__ => Object.prototype
```

> 以上可知函数B继承了Funtion和Object,故而B.call(),B.toString()都是来自于它们

```javascript
function B(age){
    this.age = age
}
var b = new B() // B作为一个原型对象，b1作为一个实例对象
```

以上示例B作为一个原型对象有`prototype`,b1作为一个实例对象有`__proto__`,所以`b.__proto__ == B.prototype`, 而B.prototype值又是Object的实例,故而`B.prototype.__proto__ == Object.prototype`,故原型链如下:

```
b.__proto__ => B.prototype => B.prototype.__proto__ => Object.prototype
```

> 如b.age会先在b中找，再到B.prototype中找，再到Object.prototype找。

通过new创建对象，分为以下三个步骤

```javascript
var b = new Object()   // 1.创建空对象
b.__proto__ = B.prototype   // 2.赋直 __proto__
B.call(b) // 3.初始化属性和方法
```

## 二、ajax相关

### 1.介绍下Get请求和Post请求的区别 （初级）

GET请求将所有请求参数转化为一个查询字符串，并将该字符串添加到请求的URL之后。GET请求传送的数据量较小，一般不能大于2KB。

Post请求是将参数序列化成一个字符串，通过send()发送服务器，对参数的大小没有限制。

### 2.XMLHttpRequest有哪几种状态，分别对应哪几个阶段 (中级)

XMLHttpRequest对象的readyState属性记录了它的状态，总共有5种可能值，分别对应xhr不同的阶段。

值 | 状态                        | 描述
- | :------------------------ | :-------------------
0 | UNSENT (初始状态，未打开)         | 成功创建XMLHttpRequest对象
1 | OPENED (已打开，未发送)          | open()方法已被成功调用，打开连接
2 | HEADERS_RECEIVED (已获取响应头) | 向服务端发送数据
3 | LOADING (正在下载响应体)         | 接受服务器返回的数据
4 | DONE (整个数据传输过程结束)         | 整个数据传输过程结束

> readyState的状态没变一次都会回调onreadystatechange(),可以在里面做不同的处理

### 3.描述下使用XMLHttpRequest对象发送form表单,FormData,Json数据的过程(中高级)

**发送json数据**

1. 打开连接，设置请求方式为post
2. 设置请求头,`Content-Type = application/json`
3. 将参数序列化为json字符串
4. 调用send()发送数据

**发送Form表单数据**

1. 打开连接，设置请求方式为post
2. 设置请求头,`Content-Type = application/application/x-www-form-urlencoded`
3. 将参数序列化为`键值对`形式用`&`拼接
4. 调用send()发送数据

**发送FormData**

它主要是用来发送二级制数据，比如文件等。

1. 打开连接，设置请求方式为post
2. 无需设置请求头`Content-Type`，浏览器会自动识别FormData自动添加。
3. 创建FormData对象,append参数
4. 调用send()发送FormData对象

### 4.使用axios库来发送form表单数据需要注意什么(中高级)

axios默认是使用URLSearchParams对象序列化参数来发送form表单数据。

但是URLSearchParams有两点不好：

1.URLSearchParams序列化参数必须是键值对形式，没有json方便.

2.URLSearchParams不是所有的浏览器均支持(兼容性不好)

解决方法是：定义一个请求拦截器，将需要发送的参数使用qs库编码一下即可

## 三、作用域,作用域链,上下文(初中级)

**1.作用域**

`作用域`是你的代码在运行时，各个变量、函数和对象的可访问性，换句话说，作用域决定了你的代码里的变量和其他资源在各个区域中的可见性。

在 JavaScript 中有两种作用域:

- 全局作用域
- 局部作用域

一个应用中全局作用域的生存周期与该应用相同。局部作用域只在该函数调用执行期间存在。

**2.作用域链**

`作用域链`的作用是保证了作用域中所有变量和函数的有序访问。当解析一个变量时，JavaScript开始从最内层沿着父级寻找所需的变量或其他资源。

**3.上下文**

作用域指的是变量的`可见性`，而上下文指的是`在相同的作用域中的this的值`。我们当然也可以使用函数方法改变上下文。

## 四、跨域产生的原因，以及解决方法(中级)

跨域主要是浏览器的同源策略产生的，比如两个不同的`源`互相通信，就会导致跨域。

同源:如果两个页面的协议,端口,域名都相同，则两个页面具有相同的源。

解决跨域常用的方法有三种:

- JSONP
- CORS
- 代理

**JSONP**

在HTML标签里，一些标签比如script、img这样的获取资源的标签是没有跨域限制的,JSONP就是利用script标签来决跨域的。

其原理就是给script标签的src属性赋上url请求地址，并将回调函数名以参数的形式拼接在url后，后端收到请求后，直接将结果以参数的形式拼接在回调函数中返回给前端。由于前端是用script标签发起的请求，所以收到后端返回的回调函数名后会立刻执行。

前端代码:

```html
<body>
    jsonp
    <script type='text/javascript'>
        // 后端返回直接执行的方法，相当于执行这个方法，由于后端把返回的数据放在方法的参数里，所以这里能拿到res。
        window.jsonpCb = function (res) {
            console.log('res', res) // 输出 {message: "成功"}
        }
    </script>
    <script src='http://localhost:9100/form/jsonp?msg=helloJsonp&cb=jsonpCb' type='text/javascript'></script>
</body>
```

后端代码(nodejs):

```javascript
// 测试jsonp
app.get('/form/jsonp', function (req, res) {
    console.log('get参数', req.query)
    if (req.query.cb) {
        let resData = {
            message: '成功'
        }
        // query.cb是前后端约定的方法名字，其实就是后端返回一个直接执行的方法给前端，由于前端是用script标签发起的请求，
        // 所以返回了这个方法后相当于立马执行，并且把要返回的数据放在方法的参数里
        res.send(`${req.query.cb}(${JSON.stringify(resData)})`)
    }
});
```

**CORS**

CORS是一个W3C标准，全称是"跨域资源共享"（Cross-origin resource sharing）. 专门用来解决跨域的。

前端什么也不用干，就是正常发请求就可以，如果需要带cookie的话，前后端都要设置一下.

客户端:

```javascript
xhr.responseType = "json"
xhr.withCredentials = true
```

服务端(nodejs):

```javascript
import cors from 'cors'
import cookieParser from 'cookie-parser'
const app = express()
app.use(cookieParser())
// 跨域带cookie
const corsOptions = {
    origin: ['http://127.0.0.1:8080', 'http://local.cloud.enndata.cn:8080', 'http://10.4.52.29:9100'],
    credentials: true, // 客户端带cookie必须设置为true
    allowedHeaders: 'Content-Type,Content-Length,Authorization,Accept,X-Requested-With,token,lktoken,cookie',
    exposedHeaders: 'token'
}
app.use(cors(corsOptions))
```

> origin设置了允许跨域的源

> 配置allowedHeaders和exposedHeaders，将自定义响应头加进去，这样xhr.getResponseHeader('token')就可以获取到了

**代理**

将前端请求地址代理为后端的地址，使其统一，就可以避免跨域了.

Nginx配置

```text
server{
    # 监听9099端口
    listen 9099;
    # 域名是localhost
    server_name localhost;
    #凡是localhost:9099/api这个样子的，都转发到真正的服务端地址http://localhost:9100
    location ^~ /api {
        proxy_pass http://localhost:9100;
    }    
}
```

> Nginx转发的方式似乎很方便！但这种使用也是看场景的，如果后端接口是一个公共的API，比如一些公共服务获取天气什么的，前端调用的时候总不能让运维去配置一下Nginx，如果兼容性没问题（IE 10或者以上），CROS才是更通用的做法。

## Vue相关

### 1.Vue组件的生命周期，以及生周期钩子函数内可以做什么 (初中级)

生命周期钩子        | 组件状态                                                                              | 最佳实践
------------- | :-------------------------------------------------------------------------------- | :---------------------------------------
beforeCreate  | 已经创建了Vue组件的实例且this已经指向该实例，组件实例的属性还没有初始化，所以无法访问到data、computed、watch、methods上的方法和数据 | 常用于初始化非响应式变量
created       | 组件的属性初始化完成,可访问data、computed、watch、methods上的方法和数据，未挂载到DOM，不能访问到$el属性               | 常用于页面的初始化，比如初始化data中的属性，注册组件的监听器等
beforeMount   | 在挂载开始之前被调用，beforeMount之前，会找到对应的template，并编译成render函数                              | -----
mounted       | 实例挂载到DOM上，此时可以通过DOM API获取到DOM节点，this.$el属性可以获取到dom节点                              | 常用于获取VNode信息和操作，ajax请求
beforeUpdate  | 响应式数据更新时调用,此时响应式数据对应的Dom还没有更新                                                     | 常用于在更新之前访问现有的DOM，比如手动移除已添加的事件监听器
updated       | 组件DOM已经更新，可执行依赖于DOM的操作                                                            | 避免在这个钩子函数中操作数据，可能陷入死循环。当然canvas的更新可以在里面做
beforeDestroy | 实例销毁之前调用。这一步，实例仍然完全可用，this仍能获取到实例                                                 | 常用于销毁定时器、解绑全局事件等操作
destroyed     | 实例销毁后调用，调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁                           | ---

### 2.父子组件的渲染过程 （中级）

#### 父子组件不通过props传递数据或者传递静态数据

1. 组价初始化时，仅当子组件完成挂载后，父组件才会挂载
2. 数据更新时，两者相互不影响
3. 销毁父组件时，先将子组件销毁后才会销毁父组件

例如 parent是父组件，child是子组件，生命周期如下:

**组件初始化**

```text
parent.beforeCreate() => parent.created() => parent.beforeMount() => child.beforeCreate() => child.created() => child.beforeMount() => child.mounted()
```

**数据改变**

parent 执行如下:

```text
parent.beforeUpdate() => parent.updated()
```

child 执行如下:

```text
child.beforeUpdate() => child.updated()
```

> 两者相互之间没有交集

**父组件销毁时**

```text
parent.beforeDestroy() => child.beforeDestroy() => child.destroyed() => parent.destroyed()
```

> 子组件销毁不影响父组件

#### 父子组件通过props传递动态数据

父子组件的初始化与销毁和传递静态数据一样，只不过数据改变时相互之间有交集。

例如 parent是父组件，child是子组件，parent通过props给child传递一个对象(obj)。

parent改变obj的值，回调函数如下:

```text
parent.beforeUpdate() => child.beforeUpdate() => child.updated() => parent.updated()
```

> child改变obj的值，也是一样的

### 3.Vue原理 （中高级）

通过Object.defineProperty劫持对象的属性，当属性变化时，再通过观察者模式更新属性对应的DOM.
