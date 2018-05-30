

## Service和Thread的关系

明确一点Service和Thread之间没有任何关系

之所以有不少人会把它们联系起来，主要就是因为Service的后台概念。Thread我们大家都知道，是用于开启一个子线程，在这里去执行一些耗时操作就不会阻塞主线程的运行。而Service我们最初理解的时候，总会觉得它是用来处理一些后台任务的，一些比较耗时的操作也可以放在这里运行，这就会让人产生混淆了。但是`Service其实是运行在主线程里的`.

不要把后台和子线程联系在一起，这是两个完全不同的概念。Android的后台就是指，`它的运行是完全不依赖UI的`。即使Activity被销毁，或者程序被关闭，只要进程还在，Service就可以继续运行。比如说一些应用程序，始终需要与服务器之间始终保持着心跳连接，就可以使用Service来实现。当然我们也可以在Service中创建一个子线程，处理耗时的逻辑操作。

既然在Service里也要创建一个子线程，那为什么不直接在Activity里创建呢？这是因为Activity很难对Thread进行控制，当Activity被销毁之后，就没有任何其它的办法可以再重新获取到之前创建的子线程的实例。而且在一个Activity中创建的子线程，另一个Activity无法对其进行操作。但是Service就不同了，所有的Activity都可以与Service进行关联，然后可以很方便地操作其中的方法，即使Activity被销毁了，之后只要重新与Service建立关联，就又能够获取到原有的Service中Binder的实例。因此，使用Service来处理后台任务，Activity就可以放心地finish，完全不需要担心无法对后台任务进行控制的情况。

比如文件下载,也可以在Activiy中启一个子线程去下载,但是如果Activiy关掉,就无法再操作这个线程了,你不能让用户一直停在当前界面吧.Service就可以很好的解决这类问题.

## 创建前台Service

Service几乎都是在后台运行的，一直以来它都是默默地做着辛苦的工作。但是Service的系统优先级还是比较低的，当系统出现内存不足情况时，就有可能会回收掉正在后台运行的Service。如果你希望Service可以一直保持运行状态，而不会由于系统内存不足的原因导致被回收，就可以考虑使用前台Service。`前台Service和普通Service最大的区别就在于，它会一直有一个正在运行的图标在系统的状态栏显示`，下拉状态栏后可以看到更加详细的信息，非常类似于通知的效果。当然有时候你也可能不仅仅是为了防止Service被回收才使用前台Service，有些项目由于特殊的需求会要求必须使用前台Service，比如说墨迹天气，它的Service在后台更新天气数据的同时，还会在系统状态栏一直显示当前天气的信息


```java
public class MyService extends Service {  
    public static final String TAG = "MyService";  

    private MyBinder mBinder = new MyBinder();  

    @Override  
    public void onCreate() {  
        super.onCreate();  
        Notification notification = new Notification(R.drawable.ic_launcher,  
                "有通知到来", System.currentTimeMillis());  
        Intent notificationIntent = new Intent(this, MainActivity.class);  
        PendingIntent pendingIntent = PendingIntent.getActivity(this, 0,  
                notificationIntent, 0);  
        notification.setLatestEventInfo(this, "这是通知的标题", "这是通知的内容",  
                pendingIntent);  
        startForeground(1, notification);  
        Log.d(TAG, "onCreate() executed");  
    }    
}  
```

## Activity与Service是否处于同一进程

 一般来说：同一个包内的activity和service，如果service没有设定属性`Android:process=":remote"`的话，service会和activity跑在同一个进程中，由于一个进程只有一个UI线程，所以，service和acitivity就是在同一个线程里面的。

 `android:process=":remote"`值得注意他的用法！！！如果Activity想访问service中的对象或方法，如果service设定属性`android:process=":remote"`，那么就是跨进程访问，跨进程访问容易出现意想不到的问题，还是慎重给service设定属性`android:process=":remote"`
