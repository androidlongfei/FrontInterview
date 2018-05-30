# Vue组件的生命周期

相关文档

- [官方解释](https://cn.vuejs.org/v2/guide/instance.html#实例生命周期)
- [官方解释](https://cn.vuejs.org/v2/api/#beforeCreate)
- [第三方解释](https://segmentfault.com/a/1190000008010666)
- [第三方解释](https://segmentfault.com/a/1190000009677699)

demo

- [_1_life](./_1_life.html)

## 组件生命周期钩子函数调用

1.beforeCreate

```
刚创建组件对象,此时,组件属性没有初始化，$el和data都为undefined
```

2.created

```
组件创建完成,data属性被初始化了,而$el没有
```

3.beforeMount

```
组件挂在之前,$el和data都初始化了,已经生成虚拟dom
```

4.mounted

```
组件挂载完成了,将虚拟dom转化为真实dom,并插入
```

5.beforeUpdate

```
更新dom之前调用
```

6.updated

```
当data中的数据改变时，会调用此方法更新data对应的dom
```

7.beforeDestroy

```
销毁组件之前调用
```

8.destroyed

```
执行完destroy操作后,data里的数据没有变化,但是Dom结构还存在,也就是Vue实例不再受控制了,完成了解耦.
当你再更新data中的数据时，对应的dom不会有任何变化.
```

## 总结

生命周期钩子函数使用

```
beforecreate : 可以在这加个loading事件

created ：在这结束loading，还做一些初始化，实现函数自执行

mounted ： 在这发起后端请求，拿回数据，配合路由钩子做一些事情

beforeDestory： 你确认删除XX吗？

destoryed ：当前组件已被删除，清空相关内容
```
