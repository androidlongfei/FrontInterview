# Android WebView问题

## 一.解决Android WebView不支持location.href打开新链接

```
var url = 'http://www.baidu.com'

以下代码在android的webView中无效

window.location.href = url
```

解决方法如下:

第一步在html加一个隐藏的a标签

```html
<a id="jumpUrl" style="display: none;"></a>
```

第二步 设置a标签的href属性

```javascript
var url = 'http://www.baidu.com'
let $a = document.getElementById('jumpUrl')
$a.setAttribute('href',url)
```

第三步模拟点击a标签

```javascript
$a.click()
```
