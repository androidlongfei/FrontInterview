
# binder通信原理

相关文章

* [Android Binder跨进程通信原理分析](http://blog.csdn.net/xyh269/article/details/53355399)
* [Android Bander设计与实现 - 设计篇](http://blog.csdn.net/universus/article/details/6211589)
* [Binder学习指南](http://weishu.me/2016/01/12/binder-index-for-newer/)
* [Android aidl Binder框架浅析](http://blog.csdn.net/lmj623565791/article/details/38461079)


用户空间访问内核空间的唯一方式就是系统调用。

通过系统调用，用户空间可以访问内核空间，那么如果一个用户空间想与另外一个用户空间进行通信怎么办呢？很自然想到的是让操作系统内核添加支持；传统的Linux通信机制，比如Socket，管道等都是内核支持的；但是Binder并不是Linux内核的一部分，它是怎么做到访问内核空间的呢？`Linux的动态可加载内核模块（Loadable Kernel Module，LKM）`机制解决了这个问题；
模块是具有独立功能的程序，它可以被单独编译，但不能独立运行。它在运行时被链接到内核作为内核的一部分在内核空间运行。
这样，Android系统可以通过添加一个内核模块运行在内核空间，用户进程之间的通过这个模块作为桥梁，就可以完成通信了。

在Android系统中，这个运行在内核空间的，负责各个用户进程通过Binder通信的内核模块叫做`Binder驱动`;

## Binder跨进程通信模型

Binder的通信模型有4个角色：Binder Client、Binder Server、Binder Driver（Binder驱动）、ServiceManager。


可以看到，ServiceManager、Binder Client、Binder Server处于不同的进程，他们三个都在用户空间，而Binder驱动在内核空间。

1.首先是有一个ServiceManager，刚开始为空对象，然后Server进程向ServiceManager注册一个映射关系表

2.之后Client进程想要和Server进程通信，首先向ServiceManager查询地址，ServiceManager收到查询的请求之后，返回查询结果给Client。

**这里不管是Server进程注册，还是Client查询，都是经过Binder驱动的，这也真是Binder驱动的作用所在**

## 跨进程原理

首先，Server进程要向SM注册；告诉自己是谁，自己有什么能力；在这个场景就是Server告诉SM，它叫zhangsan，它有一个object对象，可以执行add 操作；于是SM建立了一张表：zhangsan这个名字对应进程Server;

然后Client向SM查询：我需要联系一个名字叫做zhangsan的进程里面的object对象；这时候关键来了：进程之间通信的数据都会经过运行在内核空间里面的驱动，驱动在数据流过的时候做了一点手脚，它并不会给Client进程返回一个真正的object对象，而是返回一个看起来跟object一模一样的代理对象objectProxy，这个objectProxy也有一个add方法，但是这个add方法没有Server进程里面object对象的add方法那个能力；objectProxy的add只是一个傀儡，它唯一做的事情就是把参数包装然后交给驱动。(这里我们简化了SM的流程，见下文)

但是Client进程并不知道驱动返回给它的对象动过手脚，毕竟伪装的太像了，如假包换。Client开开心心地拿着objectProxy对象然后调用add方法；我们说过，这个add什么也不做，直接把参数做一些包装然后直接转发给Binder驱动。

驱动收到这个消息，发现是这个objectProxy；一查表就明白了：我之前用objectProxy替换了object发送给Client了，它真正应该要访问的是object对象的add方法；于是Binder驱动通知Server进程，调用你的object对象的add方法，然后把结果发给我，Sever进程收到这个消息，照做之后将结果返回驱动，驱动然后把结果返回给Client进程；于是整个过程就完成了。

由于驱动返回的objectProxy与Server进程里面原始的object是如此相似，给人感觉好像是直接把Server进程里面的对象object传递到了Client进程；因此，我们可以说Binder对象是可以进行跨进程传递的对象

但事实上我们知道，Binder跨进程传输并不是真的把一个对象传输到了另外一个进程；传输过程好像是Binder跨进程穿越的时候，它在一个进程留下了一个真身，在另外一个进程幻化出一个影子（这个影子可以很多个）；Client进程的操作其实是对于影子的操作，影子利用Binder驱动最终让真身完成操作。

理解这一点非常重要；务必仔细体会。另外，**Android系统实现这种机制使用的是代理模式**, 对于Binder的访问，如果是在同一个进程（不需要跨进程），那么直接返回原始的Binder实体；如果在不同进程，那么就给他一个代理对象（影子）；我们在系统源码以及AIDL的生成代码里面可以看到很多这种实现。

另外我们为了简化整个流程，隐藏了SM这一部分驱动进行的操作；实际上，由于SM与Server通常不在一个进程，Server进程向SM注册的过程也是跨进程通信，驱动也会对这个过程进行暗箱操作：SM中存在的Server端的对象实际上也是代理对象，后面Client向SM查询的时候，驱动会给Client返回另外一个代理对象。Sever进程的本地对象仅有一个，其他进程所拥有的全部都是它的代理。

一句话总结就是：**Client进程只不过是持有了Server端的代理；代理对象协助驱动完成了跨进程通信。**


## Binder到底是什么
