# 生命周期

- [Vue生命周期深入](https://segmentfault.com/a/1190000014705819)
- [组件钩子](https://segmentfault.com/a/1190000013956945)

生命周期：Vue 实例从开始创建、初始化数据、编译模板、挂载Dom→渲染、更新→渲染、卸载等一系列过程，我们称这是 Vue 的生命周期，各个阶段有相对应的事件钩子

- 单组件的生命周期
- 父子组件的生命周期
- 兄弟组件的生命周期
- 宏mixin的生命周期

## 生命周期钩子函数

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

## 单组件的生命周期

模板文件

```html
<template>
<div>
    <h3 ref="h3">单组件</h3>
    <p ref="p1" :count="this.dataVar" id="p1">count:{{dataVar}}</p>
    <el-button @click="dataVar += 1">更新 {{dataVar}}</el-button>
    <el-button @click="handleDestroy">销毁{{compName}}</el-button>
</div>
</template>
```

```javascript
data() {
    return {
        dataVar: 1
    }
}
```

```javascript
beforeCreate() {
    console.log('--data未初始化--beforeCreate', this, this.dataVar) // this有值 this.dataVar为undefined
}
```

> 已经创建了Vue组件的实例且this已经指向该实例，组件实例的属性还没有初始化，所以无法访问到data、computed、watch、methods上的方法和数据

> 常用于初始化非响应式变量

```javascript
created() {
    console.log(`--${this.compName}--created`, this.dataVar, this.$el) // 1 undefined
    this.dataVar = 4 // 初始化数据
}
```

> 组件的属性初始化完成,可访问data、computed、watch、methods上的方法和数据，未挂载到DOM，不能访问到$el属性

> 常用于页面的初始化，比如初始化data中的属性，注册组件的监听器等

```javascript
beforeMount() {
    console.log(`--${this.compName}--beforeMount`, this.$el) // undefined
}
```

> 在挂载开始之前被调用，beforeMount之前，会找到对应的template，并编译成render函数

```javascript
mounted() {
    console.log(`  --${this.compName}--mounted`, this.$el, this.$refs.p1) // dom节点 <div></div>
    console.log('h3', this.$refs.h3); // <h3>单组件</h3>
}
```

> 实例挂载到DOM上，此时可以通过DOM API获取到DOM节点，this.$el属性可以获取到dom节点

> 常用于获取VNode信息和操作，ajax请求

```javascript
beforeUpdate() {
    console.log(`  --${this.compName}--beforeUpdate`, this.dataVar, document.getElementById('p1')) // 5 <p count="5">5</p>
}
```

> 响应式数据更新时调用,响应式数据对应的Dom还没有更新

> 常用于在更新之前访问现有的DOM，比如手动移除已添加的事件监听器

```javascript
updated() {
    console.log(`  --${this.compName}--updated`, this.dataVar) // 4
}
```

> 组件DOM已经更新，可执行依赖于DOM的操作

> 避免在这个钩子函数中操作数据，可能陷入死循环。当然canvas的更新可以在里面做

```javascript
beforeDestroy() {
    console.log(`  --${this.compName}--beforeDestroy`, this.dataVar) // 4
}
```

> 实例销毁之前调用。这一步，实例仍然完全可用，this仍能获取到实例

> 常用于销毁定时器、解绑全局事件、销毁插件对象等操作

```javascript
destroyed() {
    console.log(`  --${this.compName}--destroyed`)
}
```

> 实例销毁后调用，调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁

总结:

1. 初始化组件时，仅执行了beforeCreate/Created/beforeMount/mounted四个钩子函数
2. 当改变data中定义的变量（响应式变量）时，会执行beforeUpdate/updated钩子函数
3. 销毁组件时，会执行beforeDestory/destroyed钩子函数
4. 初始化和销毁时的生命钩子函数均只会执行一次，beforeUpdate/updated可多次执行

## 父子组件的生命周期

### 父子组件不通过props传递数据或者传递静态数据

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

### 父子组件通过props传递动态数据

父子组件的初始化与销毁和传递静态数据一样，只不过数据改变时相互之间有交集。

例如 parent是父组件，child是子组件，parent通过props给child传递一个对象(obj)。

parent改变obj的值，回调函数如下:

```text
parent.beforeUpdate() => child.beforeUpdate() => child.updated() => parent.updated()
```

> child改变obj的值，也是一样的

## 兄弟组件的生命周期

1. 组件的初始化（mounted之前）分开进行，挂载是从上到下依次进行
2. 当没有数据关联时，兄弟组件之间的更新和销毁是互不关联的

例如,父组件p，子组件c1、c2，c1与c2是兄弟组件

**初始化**

```text
p.beforeCreate() => p.created() => p.beforeMount() => c1.beforeCreate() => c1.created() => c1.beforeMount() => c1.beforeCreate() => c1.created() => c1.beforeMount() => c1.mounted() => c2.mounted() => p.mounted()
```

## 宏mixin的生命周期

例如，组件p,mixin

**初始化**

```text
mixin.beforeCreate() => p.beforeCreate => mixin.created => p.created => mixin.beforeMount => p.beforeMount => mixin.mounted => p.mounted
```

**更新**

```text
mixin.beforeUpdate() => p.beforeUpdate => mixin.updated => p.updated
```

**销毁**

```text
mixin.beforeDestroy() => p.beforeDestroy() => mixin.destroyed() => p.destroyed()
```

> 若mixin和p的methods中都有方法A,this.A()调用的是p中的。
