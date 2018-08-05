# 文件模块(fs)

- [fs](http://nodejs.cn/api/fs.html)

**fs.createReadStream**

例子，从一个大小为 100 字节的文件中读取最后 10 个字节

```javascript
fs.createReadStream('sample.txt', { start: 90, end: 99 });
```
