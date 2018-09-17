# mac翻墙设置代理

- [利用搬瓦工搭建SS](http://blog.sina.com.cn/s/blog_168ff2dd20102x9hl.html)

## 使用搬瓦工设置代理

- 购买搬瓦工
- 下载ShadowsocksX-NG
- 设置浏览器代理
- 设置终端代理

### 1.购买搬瓦工

### 2.下载ShadowsocksX-NG

1. 下载

  [下载地址](https://github.com/shadowsocks/ShadowsocksX-NG/releases/)

2. 安装

### 3.设置浏览器代理

1. 启动ShadowsocksX-NG

2. 设置

  ```
  地址:--.--.124.186
  端口:443
  加密方式:aes-256-cfb
  密码:
  ```

3. 测试

  打开浏览器输入:<https://www.google.com.hk/>

### 设置终端代理

打开ss偏好设置（Preferences）查看ss终端代理端口：

```
http proxy listen address : 127.0.0.1
http proxy listen address : 1087
```

配置终端环境变量

```shell
vim ~/.bash_profile
```

输入以下内容:

```shell
function proxy(){

    export http_proxy=http://127.0.0.1:1087;

    export https_proxy=http://127.0.0.1:1087;

    echo -e "芝麻开门了"

}

function unproxy(){

    unset http_proxy

    unset https_proxy

    echo -e "芝麻发霉了"

}
```

1. 使配置文件立即生效

```shell
source ~/.bash_profile
```

1. 测试

打开代理:

```shell
proxy
```

> 输出芝麻开门

测试打开代理

```shell
curl ip.cn
```

> 当前 IP：--.--.124.186 来自：美国。表示终端代理成功

关闭代理

```shell
unproxy
```

> 输出芝麻发霉了

测试关闭代理

```shell
curl ip.cn
```

> 当前 IP：--.--.219.222 来自：湖北省武汉市 电信。表示关闭代理

### 设置Android Studio代理

```
Manual proxy:HTTP
Host name: 127.0.0.1
Port number: 1087
```
