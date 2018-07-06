# 锋利的jQuery第二版

基于jQuery1.7.1

## 网页加载js脚本

- 同步加载
- 异步加载

### 同步加载

我们平时使用的最多的一种方式。

```javascript
<script src="http://yourdomain.com/script.js"></script>
```

同步模式，又称阻塞模式，会阻止浏览器的后续处理，停止后续的解析，只有当当前加载完成，才能进行下一步操作。所以默认同步执行才是安全的。但这样如果js中有输出document内容、修改dom、重定向等行为，就会造成页面堵塞。所以一般建议把 `<script>`标签放在`<body>`结尾处，这样尽可能减少页面阻塞。

## jQuery中:first和:first-child的区别

[:first与:first-child](https://blog.csdn.net/kusedexingfu/article/details/51945284)
