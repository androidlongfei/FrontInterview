# bindService的使用

* [http://blog.csdn.net/iispring/article/details/48169339](http://blog.csdn.net/iispring/article/details/48169339)

## bindService启动服务的特点

相比于用startService启动的Service，bindService启动的服务具有如下特点:

1. bindService启动的服务在调用者和服务之间是典型的client-server的接口，即调用者是客户端，service是服务端，service就一个，但是连接绑定到service上面的客户端client可以是一个或多个。这里特别要说明的是，这里所提到的client指的是组件，比如某个Activity。
2. 客户端client（即调用bindService的一方，比如某个Activity）可以通过IBinder接口获取Service的实例，从而可以实现在client端直接调用Service中的方法以实现灵活的交互，并且可借助IBinder实现跨进程的client-server的交互，这在纯startService启动的Service中是无法实现的。
3. 不同于startService启动的服务默认无限期执行（可以通过Context的stopService或Service的stopSelf方法停止运行），bindService启动的服务的生命周期与其绑定的client息息相关。`当client销毁的时候，client会自动与Service解除绑定，`当然client也可以通过明确调用Context的unbindService方法与Service解除绑定。当没有任何client与Service绑定的时候，Service会自行销毁（通过startService启动的除外）。
4. startService和bindService二者执行的回调方法不同：startService启动的服务会涉及Service的的onStartCommand回调方法，而通过bindService启动的服务会涉及Service的onBind、onUnbind等回调方法。

## client与service通信

**Service需要做以下事情:**

1.在Service的onBind方法中返回IBinder类型的实例。

2.onBind方法返回的IBinder的实例需要能够返回Service实例本身或者通过binder暴露出Service公共方法。通常情况下，最简单明了的做法就是将binder弄成Service的内部类，然后在binder中加入类似于getService之类的方法返回包含binder的Service，这样client可以通过该方法得到Service实例

**client端要做的事情:**

1.创建ServiceConnection类型的实例，并重写其onServiceConnected方法和onServiceDisconnected方法。

2.当Android执行onServiceConnected回调方法时，我们可以通过IBinder实例得到Service的实例对象或直接调用binder的公共方法，这样就实现了client与Service的连接。

3.当Android执行onServiceDisconnected回调方法时，表示client与Service之间断开了连接，我们在此处要写一些断开连接后需要做的处理。


**client执行bindService**

如果Service不存在，Service 执行 onCreate ->

如果没有执行过onBind，Service 执行 onBind ->

client的实例ServiceConnection 执行 onServiceConnected

**client执行unbindService**
client 与 Service 解除绑定连接状态 ->

Service 检测是否还有其他client与其连接，如果没有 ->

Service 执行onUnbind ->

Service 执行onDestroy

## bindService生命周期流程图

文所提到的client指的是组件Component，比如某个Activity。如果在某一个Activity中，多次调用bindService方法连接Service，那么对于Service来说，这个Activity也只是一个client，而不是多个client

bindService启动的Service的生命周期总结为如下的流程图:
