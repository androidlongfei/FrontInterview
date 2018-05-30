# ajax相关问题

## 一、ajax请求状态突然由POST或者GET变成CANCEL

由以下两种造成

1. 请求超时，导致请求被取消

2. URL变更，导致当前的ajax请求被终止

## 二、ajax请求状态由POST或者GET变成OPTIONS

前台跨域post请求，由于CORS（cross origin resource share）规范的存在，浏览器会首先发送一次options嗅探，同时header带上origin， 判断是否有跨域请求权限，服务器响应access control allow origin的值，供浏览器与origin匹配，如果匹配则正式发送post请求。

如果有服务器程序权限，设置，比如jsp中，设置header access control allow origin等于*，就可以得到跨域访问的目的。

## 三、ajax请求返回状态为200但还是进入error事件

出错原因：前端配置dataType:"json"，而后台返回的数据不符合json规范。所以虽然请求成功，但是还是走的error。
