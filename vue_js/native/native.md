# Vue与native交互

参考文档如下:

- [参考1](https://blog.csdn.net/lhb_11/article/details/79273012)
- [代码](https://github.com/lhb11/native-js-interactive-encapsulation)
- [Vue插件](https://cn.vuejs.org/v2/guide/plugins.html)
- [Vue组件通讯](https://cn.vuejs.org/v2/guide/components.html#%E5%8A%A8%E6%80%81%E7%BB%84%E4%BB%B6)
- [node模块与es6模块](http://www.jb51.net/article/126843.htm)

## 原生JS与Native交互

`H5向native发送数据`，native定义一个方法A，h5通过window对象调用方法A，并传递参数，native监听到方法A被调用时，获取参数再做相应的处理。

```javascript
var sendBtn = document.getElementById('#sendBtn')
btn.onclick = function(){
    // 调用native接口 , 给native传递数据
    if(window.receiveDataFormNaive){
        // 备注 receiveDataFormNaive 是在native定义的 （方法A）
        var test = '测试'
        window.receiveDataFormNaive(test)
    }
}
```

`H5从native获取数据`，首先native定义方法A,H5定义方法B。H5调用native的方法A(可传递参数),native收到后，再调用H5的方法B(传递参数)。h5监听到方法B被调用时，获取参数再做相应的处理。

```javascript
var sendBtn = document.getElementById('#sendBtn')
btn.onclick = function(){
    // 调用native接口
    if(window.receiveDataFormNaive){
        // 备注 receiveDataFormNaive 是在native定义的 （方法A）
        window.receiveDataFormNaive()
    }
}

function receiveDataFormNaiveCall(data){
    // 此方法是供native调用的 (方法B)
    console.log(data)
}
```

## Vue 与 Native 交互

由于vue中作用域的关系，所以交互的事件必须挂载到window上，那么实现思路就是写一个vue的plugin（插件），并且把这个插件对象挂载到window上。

思路如下:

1.通过插件的形式定义一个组件CompA，CompA是Vue的一个实例。

2.将组件CompA绑定到Vue的原形和window对象上

3.在页面组件CompB的onCreated()中注册CompA的一个事件。因为CompA已经绑定到Vue的原形上，那么在onCreated可以通过this.CompA获取CompA的对象实例。注册监听事件示例,this.CompA.$on('getSexCall')

4.当H5监听到native调用window对象的某个方法时，通过CompA的$emit发送一个事件getSexCall，这样页面CompB就能收到数据了。因为CompA已经绑定到window上，那么通过window.CompA就可以获取到CompA的实例。发送事件示例,window.CompA.$emit('getSexCall',data)。

示例代码如下:

定义插件，创建组价CompA，并绑定

```javascript
export default function install(Vue, options) {
    let CompA= new Vue({
        data: {
            'message': ''
        },
        template: '<div> {{message}} </ div>'
    });
    // 将CompA添加到Vue原型上
    Vue.prototype.CompA = CompA
    // 将CompA添加到window对象上
    window.CompA = CompA
}
```

在页面组件ComB中注册监听器

```javascript

created() {
    // 监听native发出时间
    this.CompA.$on('getSexCall', (data) => {
        console.log('组件收到getSexCall事件', data)
        this.getSexCall(data)
    })
},
methods:{
    getSexCall(data){
        console.log(data)
    }
}
```

监听到native调用window方法时，发送事件并带数据，此数据是native传过来的。

```javascript
// 此方法供native调用
window.getSexCall = (data) => {
    console.log('H5收到native调用的getSexCall', data)
    // 调用vue实例的$emit方法,来发送事件,在通过$on在接受事件
    window.CompA.$emit('getSexCall', data);
}
```

## Vue与Native交互遇到的问题

### 接口延时

问题描述:进入vue的第一个页面时，调用native的A接口,这时window对象下没有挂载A接口.

```javascript
mounted(){
    // 调用native的A接口
    if(window.IOS.A){
        window.IOS.A()
    }
}
```

主要原因是,native的webview只有在页面加载完时才注入接口，vue的mounted生命周期函数是将虚拟dom转化为真实的dom，native的webview认为其页面还没有加载完成，所以在mounted中无法检测到native的接口。

解决方法如下:

一、H5注册一个接口(如B)，挂载在window对象下，native的webview加载H5的Url后调用H5的B接口,并传入数据，H5收到数据后将其挂载在window对象下,然后在vue的created()和mounted()中可以获取到window对象下的数据。

```javascript
// 供native的B接口
window.B = function(data){
    // 将数据挂载在window对象下
    window.$nativeData = data
}
```

```javascript
created(){
    if(window.$nativeData){
        // 在vue的created中可以获取到native传过来的数据
        console.log(window.$nativeData);
    }
}
mounted(){
    if(window.$nativeData){
        // 在vue的mounted中可以获取到native传过来的数据
        console.log(window.$nativeData);
    }
}
```

二、在vue的mounted中启动一个定时器检测native的是否有注入

```javascript

data(){
    return{
        isChecked:true
    }
}

mounted(){
    this.checkInjection()
}
methods:{
    checkInjection(){
        if(this.isChecked){
            setTimeout(function(){
                if(window.IOS.A){
                    console.log('检测到...')
                    this.isChecked = false
                }else{
                    this.checkInjection()
                }
            },500)
        }
    }
}
```

备注:因为vue是单页应用,所以只有在入口页才会存在延时问题,其它页面可以在created()中调到native的接口.
