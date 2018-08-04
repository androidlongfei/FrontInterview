# 使用nodejs搭建静态资源服务器

- [API文档](http://nodejs.cn/api/)
- [参考资料](https://www.cnblogs.com/SheilaSun/p/7271883.html)
- [express.static](http://www.expressjs.com.cn/starter/static-files.html)

## 基本功能

先梳理一下就基本功能而言有哪些步骤

1. 在本地根据指定端口启动一个`http server`，等待着来自客户端的请求
2. 当请求抵达时，根据请求的url，以设置的静态文件目录为base，映射得到文件位置
3. 检查文件是否存在
4. 如果文件不存在，返回404状态码，发送not found页面到客户端
5. 如果文件存在

  - 打开文件待读取
  - 设置response header
  - 发送文件到客户端

6. 等待来自客户端的下一个请求
