# 使用nodejs搭建静态资源服务器

- [API文档](http://nodejs.cn/api/)
- [参考资料](https://www.cnblogs.com/SheilaSun/p/7271883.html)
- [express.static](http://www.expressjs.com.cn/starter/static-files.html)
- [使用Node.js搭建简易Http服务器](http://coderlt.coding.me/2016/03/16/http-server-nodejs/)
- [Node.js静态文件服务器实战](http://www.infoq.com/cn/news/2011/11/tyq-nodejs-static-file-server)
- [http压缩](http://san-yun.iteye.com/blog/2065700)

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

### 代码结构

**staticServer.js**

```javascript
import path from 'path'
import http from 'http'
import config from './config/global.js'

class StaticServer {
    constructor() {
        this.port = config.port;
        this.host = config.host;
        this.root = path.join(__dirname, config.root);
        this.indexPage = config.indexPage;
    }

    start() {
        http.createServer((req, res) => {
            let url = path.normalize(req.url)
            const pathName = path.join(this.root, url);
            res.writeHead(200);
            res.end(`Requeste path: ${pathName}`);
        }).listen(this.port, err => {
            if (err) {
                console.error(err);
                console.info('Failed to start server');
            } else {
                console.info(`Server started on port ${this.host}:${this.port}`);
            }
        });
    }
}

module.exports = StaticServer;
```

**index.js**

```javascript
import StaticServer from './StaticServer'

new StaticServer().start()
```

### 路由处理

之前我们对任何请求都只是向客户端返回文件位置而已，现在我们将其替换成返回真正的文件：

```javascript
/**
 * 路由处理
 */
routeHandler(pathName, req, res) {
    console.log('pathName', pathName);
    res.writeHead(200);
    res.end(`Requeste path: ${pathName}`);
}

/**
 * 启动服务
 */
start() {
    http.createServer((req, res) => {
        let url = path.normalize(req.url)
        const pathName = path.join(this.root, url);
        this.routeHandler(pathName, req, res);
    }).listen(this.port, err => {
        ...
    });
}
```

### 读取静态文件

读取文件之前，用fs.stat检测文件是否存在，如果文件不存在，回调函数会接收到错误，发送404响应。

```javascript
// 处理文件不存在
respondNotFound(req, res) {
    res.writeHead(404, {
        'Content-Type': 'text/html'
    });
    res.end(`<h1>Not Found</h1><p>The requested URL ${req.url} was not found on this server.</p>`);
}

// 处理文件
respondFile(pathName, req, res) {
    const readStream = fs.createReadStream(pathName);
    readStream.pipe(res);
}

/**
 * 路由处理
 */
routeHandler(pathName, req, res) {
    console.log('pathName', pathName);
    fs.stat(pathName, (err, stat) => {
        if (!err) {
            // 文件不存在
            this.respondFile(pathName, req, res);
        } else {
            // 文件存在
            this.respondNotFound(req, res);
        }
    });
}
```

读取文件，这里用的是流的形式`createReadStream`而不是`readFile`，是因为后者会在得到完整文件内容之前将其先读到内存里。这样万一文件很大，再遇上多个请求同时访问，readFile就承受不来了。使用文件可读流，服务端不用等到数据完全加载到内存再发回给客户端，而是一边读一边发送分块响应。这时响应里会包含如下响应头：

```text
Transfer-Encoding:chunked
```

`.pipe()`方法监听fs.createReadStream()的`data` 和`end`事件,这样就不需要缓存整个文件，当客户端连接完成之后马上可以发送一个数据块到客户端。使用`.pipe()`另一个好处是可以解决当客户 端延迟非常大时导致的读写不平衡问题。

### MIME支持

现在给客户端返回文件时，我们并没有指定`Content-Type`头，虽然你可能发现访问文本或图片浏览器都可以正确显示出文字或图片，但这并不符合规范。任何包含实体主体（entity body）的响应都应在头部指明文件类型，否则浏览器无从得知类型时，就会自行猜测（从文件内容以及url中寻找可能的扩展名）。

响应如指定了错误的类型也会导致内容的错乱显示，如明明返回的是一张jpeg图片，却错误指定了header,如`'Content-Type': 'text/html'`，会收到一堆乱码。

**mime.js**

```javascript
/**
 * 获取文件扩展名
 */

import path from 'path'

const mimeTypes = {
    "css": "text/css",
    "gif": "image/gif",
    "html": "text/html",
    "ico": "image/x-icon",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "txt": 'text/html'
};

const lookup = (pathName) => {
    let ext = path.extname(pathName);
    ext = ext.split('.').pop();
    return mimeTypes[ext] || mimeTypes['txt'];
}

module.exports = {
    lookup
};
```

使用`mime.js`模块

```javascript
import { lookup } from './mime.js'

// 处理文件
respondFile(pathName, req, res) {
    const readStream = fs.createReadStream(pathName);
    res.setHeader('Content-Type', lookup(pathName));
    // res.setHeader('Content-Type', 'text/html');
    readStream.pipe(res);
}
```

需要注意的是，Content-Type说明的应是原始实体主体的文件类型。即使实体经过内容编码（如gzip，后面会提到)，该字段说明的仍应是编码前的实体主体的类型。

### 读取文件目录

现阶段，用url: `http://127.0.0.1:9200/images`去访问一个指定root文件夹下真实存在的images的文件夹，服务端会报错：

```text
Error: EISDIR: illegal operation on a directory, read
```

要增添对目录访问的支持，我们重新整理下响应的步骤：

1. 请求抵达时，首先判断url是否有尾部斜杠
2. 如果有尾部斜杠，认为用户请求的是目录

  - 如果目录存在

    - 如果目录下存在默认页（如index.html),发送默认页
    - 如果不存在默认页，发送目录下内容列表

  - 如果目录不存在，返回404

3. 如果没有尾部斜杠，认为用户请求的是文件

  - 如果文件存在，发送文件
  - 如果文件不存在，判断同名的目录是否存在

    - 如果存在该目录，返回301，并在原url上添加上`/`作为要转到的location
    - 如果不存在该目录，返回404

**判断目录代码片段**

```javascript
routeHandler(pathName, req, res) {
    console.log('pathName', pathName);
    fs.stat(pathName, (err, stat) => {
        if (!err) {
            console.log(`${pathName} 存在`);
            if (pathName.endsWith('/') && stat.isDirectory()) {
                // 目录且以/结尾
                this.respondDirectory(pathName, req, res);
            } else if (stat.isDirectory()) {
                // 目录
                this.respondRedirect(req, res);
            } else {
                // 文件
                this.respondFile(pathName, req, res);
            }
        } else {
            this.respondNotFound(req, res);
        }
    });
}
```

**处理目录代码片段**

```javascript
// 处理目录，不带尾斜杠
respondRedirect(req, res) {
    const location = req.url + '/';
    res.writeHead(301, {
        'Location': location,
        'Content-Type': 'text/html'
    });
    res.end(`Redirecting to <a href='${location}'>${location}</a>`);
}

// 处理目录,且带尾斜杠
respondDirectory(pathName, req, res) {
    console.log('是目录');
    const indexPagePath = path.join(pathName, this.indexPage);
    if (fs.existsSync(indexPagePath)) {
        // 处理目录下入口文件,默认为 index.html
        this.respondFile(indexPagePath, req, res);
    } else {
        fs.readdir(pathName, (err, files) => {
            if (err) {
                res.writeHead(500);
                return res.end(err);
            }
            const requestPath = url.parse(req.url).pathname;
            let content = `<h1>Index of ${requestPath}</h1>`;
            files.forEach(file => {
                let itemLink = path.join(requestPath, file);
                const stat = fs.statSync(path.join(pathName, file));
                if (stat && stat.isDirectory()) {
                    itemLink = path.join(itemLink, '/');
                }
                content += `<p><a href='${itemLink}'>${file}</a></p>`;
            });
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.end(content);
        });
    }
}
```

浏览器收到301响应时，会根据头部指定的location字段值，向服务器发出一个新的请求。

在浏览器中测试一下，输入`localhost:9200/images`，指定的root目录下并没有名为images的文件，却存在同名目录，因此第一次会收到重定向响应，并发起一个对目录的新请求。

### 缓存支持

为了减少数据传输，减少请求数，继续添加缓存支持。首先梳理一下缓存的处理流程：

1. 如果是第一次访问，请求报文首部不会包含相关字段，服务端在发送文件前做如下处理：

  - 如服务器支持ETag，设置ETag头
  - 如服务器支持Last-Modified，设置Last-Modified头
  - 设置Expires头
  - 设置Cache-Control头（设置其max-age值）

  浏览器收到响应后会存下这些标记，并在下次请求时带上与ETag对应的请求首部If-None-Match或与Last-Modified对应的请求首部If-Modified-Since。

2. 如果是重复的请求(第二次)：

  - 浏览器判断缓存是否过期（通过Cache-Control和Expires确定）

    - 如果未过期，直接使用缓存内容，也就是强缓存命中，并不会产生新的请求
    - 如果已过期，会发起新的请求，并且请求会带上If-None-Match或If-Modified-Since，或者兼具两者
    - 服务器收到请求，进行缓存的新鲜度再验证：

      - 首先检查请求是否有If-None-Match首部，没有则继续下一步，有则将其值与文档的最新ETag匹配，失败则认为缓存不新鲜，成功则继续下一步
      - 接着检查请求是否有If-Modified-Since首部，没有则保留上一步验证结果，有则将其值与文档最新修改时间比较验证，失败则认为缓存不新鲜，成功则认为缓存新鲜

      当两个首部皆不存在或者验证结果是不新鲜时，发送200及最新文件，并在首部更新新鲜度。

      当验证结果是缓存仍然新鲜时（也就是弱缓存命中），不需发送文件，仅发送304，并在首部更新新鲜度

为了能启用或关闭某种验证机制，我们在配置文件里增添如下配置项：

**cache.js**

```javascript
module.exports = {
    cacheControl: true, // 控制相对过期时间
    expires: true, // 控制绝对过期时间
    etag: true, // 控制文件内容的唯一标识符
    lastModified: true, // 控制文件的上次修改时间
    maxAge: 10, // 相对过期时间 10秒
    expiresTime: 1 * 60 * 1000 // 绝对过期时间 1分钟
}
```

这里为了能测试到缓存过期，将过期时间设成了非常小的10秒。

```javascript
import cache from './config/cache.js'
constructor() {
    this.port = config.port;
    this.host = config.host;
    this.root = path.join(__dirname, config.root);
    this.indexPage = config.indexPage;

    this.enableCacheControl = cache.cacheControl
    this.enableExpires = cache.expires
    this.enableETag = cache.etag
    this.enableLastModified = cache.lastModified
    this.maxAge = cache.maxAge
    this.expiresTime = cache.expiresTime
}
```

现在，我们要在原来的respondFile前设置响应头，增加是要返回304还是200的逻辑。

```javascript
routeHandler(pathName, req, res) {
    fs.stat(pathName, (err, stat) => {
        if (!err) {
            console.log(`${pathName} 存在`);
            if (pathName.endsWith('/') && stat.isDirectory()) {
                // 目录且以/结尾
                this.respondDirectory(pathName, req, res);
            } else if (stat.isDirectory()) {
                // 目录
                this.respondRedirect(req, res);
            } else {
                // 文件
                this.respond(pathName, req, res)
            }
        } else {
            this.respondNotFound(req, res);
        }
    });
}

// 处理静态文件资源
respond(pathName, req, res) {
    fs.stat(pathName, (err, stat) => {
        if (err) {
            return this.respondError(err, res);
        }
        this.setFreshHeaders(stat, req, res);
        if (this.isUseCache(req.headers, res._headers)) {
            this.responseNotModified(res);
        } else {
            this.responseFile(pathName, req, res);
        }
    });
}

// 读取文件错误
respondError(err, res) {
    res.writeHead(500);
    return res.end(err);
}

// 设置缓存相关的响应头
setFreshHeaders(stat, req, res) {
    if (this.enableExpires) {
        let expire = (Date.now() + this.expiresTime)
        let expireTime = new Date(expire).toUTCString()
        console.log('绝对时间expireTime ---->', expireTime);
        res.setHeader('Expires', expireTime);
    }
    if (this.enableCacheControl) {
        console.log('相对时间Cache-Control', this.maxAge);
        res.setHeader('Cache-Control', `public, max-age=${this.maxAge}`);
    }
    if (this.enableLastModified) {
        const lastModified = stat.mtime.toUTCString();
        console.log('上次修改时间LastModified', lastModified, this.formatTime(lastModified));
        res.setHeader('Last-Modified', lastModified);
    }
    console.log('this.enableETag', this.enableETag);
    if (this.enableETag) {
        console.log('文件内容标识符ETag', this.generateETag(stat));
        res.setHeader('ETag', this.generateETag(stat));
    }
}

// 文件的唯一标识，主要用来判断内容是否修改过，根据文件的修改时间和文件size
generateETag(stat) {
    // console.log('generateETag', stat);
    const mtime = stat.mtime.getTime().toString(16);
    const size = stat.size.toString(16);
    return `W/"${size}-${mtime}"`;
}

// 判断是否使用缓存
isUseCache(reqHeaders, resHeaders) {
    const noneMatch = reqHeaders['if-none-match']; // 浏览器存的etag
    const lastModified = reqHeaders['if-modified-since']; // 浏览器存的上次修改时间
    if (!(noneMatch || lastModified)) {
        // 表示第一次请求，没有文件内容的唯一标识和文件的上次修改时间
        return false;
    }
    console.log('etag ---->', noneMatch === resHeaders['etag']);
    if (noneMatch && (noneMatch !== resHeaders['etag'])) {
        // 浏览器缓存的文件内容标识与服务器不一致，表示文件内容已经改变
        return false;
    }
    console.log('lastModified ---->', lastModified === resHeaders['last-modified']);
    if (lastModified && lastModified !== resHeaders['last-modified']) {
        // 浏览器缓存的文件上次修改时间与服务器不一致，表示文件已改变
        return false;
    }
    return true;
}

// 让浏览器取缓存
responseNotModified(res) {
    res.statusCode = 304;
    res.end();
}
```

需要注意的是，上面使用了ETag弱验证器，并不能保证缓存文件与服务器上的文件是完全一样的。关于强验证器如何实现，可以参考etag包的源码。

http首部字段名是不区分大小写的（但http method应该大写），所以平常在浏览器中会看到大写或小写的首部字段。

**缓存优先级**

浏览器端

```text
Cache-Control > Expires
```

> 浏览器会先取Cache-Control的值，如果值存在就以它的值为过期时间，若不存在再取Expires的值。

> 取了Cache-Control的值之后，就不会再取Expires的值，过期后会重新请求服务器，而不管Expires有没有过期

服务端

```text
eTag > lastModified
```

> 若设置了eTag就以它为准，没有则以lastModified为准

总体

```text
Cache-Control > Expires > eTag > lastModified
```

### 内容编码(压缩文件)

服务器在发送很大的文档之前，对其进行压缩，可以节省传输用时。其过程是：

1. 浏览器在访问网站时，默认会携带`Accept-Encoding`头
2. 服务器在收到请求后，如果发现存在`Accept-Encoding`请求头，并且支持该文件类型的压缩，压缩响应的实体主体（并不压缩头部），并附上`Content-Encoding`首部
3. 浏览器收到响应，如果发现有`Content-Encoding`首部，按其值指定的格式解压报文

对于图片这类已经经过高度压缩的文件，无需再额外压缩。因此，我们需要配置一个字段，指明需要针对哪些类型的文件进行压缩。

```javascript
module.exports = {
    ...
    indexPage: "index.html",
    zipMatch: '^\\.(css|js|html)$'
}
```

用zlib模块来实现流压缩：

```javascript
import zlib from 'zlib'

constructor() {
    ...
    this.zipMatch = config.zipMatch
}

// 处理文件
responseFile(stat, pathName, req, res) {
    let readStream;
    res.setHeader('Content-Type', lookup(pathName));
    readStream = fs.createReadStream(pathName);
    if (this.shouldCompress(pathName)) {
        readStream = this.compressHandler(readStream, req, res);
    }
    readStream.pipe(res);
}

// 判断是否压缩文件,js,html,css
shouldCompress(pathName) {
    return path.extname(pathName).match(this.zipMatch);
}

// 压缩文件
compressHandler(readStream, req, res) {
    const acceptEncoding = req.headers['accept-encoding'];
    console.log('acceptEncoding---->', acceptEncoding); // gzip, deflate, br
    if (!acceptEncoding || !acceptEncoding.match(/\b(gzip|deflate)\b/)) {
        return readStream;
    } else if (acceptEncoding.match(/\bgzip\b/)) {
        res.setHeader('Content-Encoding', 'gzip');
        console.log('使用gzip压缩');
        return readStream.pipe(zlib.createGzip());
    } else if (acceptEncoding.match(/\bdeflate\b/)) {
        res.setHeader('Content-Encoding', 'deflate');
        return readStream.pipe(zlib.createDeflate());
    }
}
```

因为配置了图片不需压缩，在浏览器中测试会发现图片请求的响应中没有Content-Encoding头。

### 范围请求(断点续传)

使服务器支持范围请求，允许客户端只请求文档的一部分。其流程是：

1. 客户端向服务端发起请求
2. 服务端响应，附上`Accept-Ranges`头（值表示表示范围的单位，通常是"bytes"），告诉客户端其接受范围请求
3. 客户端发送新的请求，附上Ranges头，告诉服务端请求的是一个范围
4. 服务端收到范围请求，分情况响应：

  - 范围有效，服务端返回206 Partial Content，发送指定范围内内容，并在Content-Range头中指定该范围
  - 范围无效，服务端返回416 Requested Range Not Satisfiable，并在Content-Range中指明可接受范围

请求中的Ranges头格式为（这里不考虑多范围请求了）：

```text
Ranges: bytes=[start]-[end]
```

其中 start 和 end 并不是必须同时具有：

1. 如果 end 省略，服务器应返回从 start 位置开始之后的所有字节
2. 如果 start 省略，end 值指的就是服务器该返回最后多少个字节
3. 如果均未省略，则服务器返回 start 和 end 之间的字节

响应中的Content-Range头有两种格式：

1. 当范围有效返回 206 时

  ```text
  Content-Range: bytes (start)-(end)/(total)
  ```

2. 当范围无效返回 416 时：

  ```text
  Content-Range: bytes */(total)
  ```

断点续传逻辑:

```javascript
// 处理文件
responseFile(stat, pathName, req, res) {
    let readStream;
    res.setHeader('Content-Type', lookup(pathName));
    //  告知浏览器支持断点续传
    res.setHeader('Accept-Ranges', 'bytes');
    console.log('range----->', req.headers['range']);
    if (req.headers['range']) {
        // 浏览器已经传递start,end,需要断点续传
        readStream = this.rangeHandler(pathName, req.headers['range'], stat.size, res);
        if (!readStream) return;
    } else {
        // 无需断点续传
        readStream = fs.createReadStream(pathName);
    }
    if (this.shouldCompress(pathName)) {
        readStream = this.compressHandler(readStream, req, res);
    }
    readStream.pipe(res);
}

// 处理断点续传
rangeHandler(pathName, rangeText, totalSize, res) {
    const range = this.getRange(rangeText, totalSize);
    console.log('rangeHandler --->', range);
    if (range.start > totalSize || range.end > totalSize || range.start > range.end) {
        res.statusCode = 416;
        res.setHeader('Content-Range', `bytes */${totalSize}`);
        res.end();
        return null;
    } else {
        res.statusCode = 206;
        res.setHeader('Content-Range', `bytes ${range.start}-${range.end}/${totalSize}`);
        return fs.createReadStream(pathName, { start: range.start, end: range.end });
    }
}

// 续传范围
getRange(rangeText, totalSize) {
    const matchResults = rangeText.match(/bytes=([0-9]*)-([0-9]*)/);
    console.log('getRange---->', rangeText, matchResults);
    let start = parseInt(matchResults[1]);
    let end = parseInt(matchResults[2]);
    if (isNaN(start) && !isNaN(end)) {
        start = totalSize - end;
        end = totalSize - 1;
    } else if (!isNaN(start) && isNaN(end)) {
        end = totalSize - 1;
    }
    return {
        start,
        end
    }
}
```

**测试**

测试获取部分文件

```shell
curl --header "Range:bytes=0-100" -i http://127.0.0.1:9200/index.html
```

输出如下:

```text
HTTP/1.1 206 Partial Content
Expires: Sun, 05 Aug 2018 13:08:11 GMT
Cache-Control: public, max-age=10
Last-Modified: Sun, 05 Aug 2018 12:56:14 GMT
ETag: W/"1d3-1650a28d9b0"
Content-Type: text/html
Accept-Ranges: bytes
Content-Range: bytes 0-100/467
Date: Sun, 05 Aug 2018 13:07:11 GMT
Connection: keep-alive
Transfer-Encoding: chunked

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content%
```

测试获取整体文件

```shell
curl --header "Range:bytes=0-467" -i http://127.0.0.1:9200/index.html
```

输出如下:

```text
HTTP/1.1 206 Partial Content
Expires: Sun, 05 Aug 2018 13:25:48 GMT
Cache-Control: public, max-age=10
Last-Modified: Sun, 05 Aug 2018 12:56:14 GMT
ETag: W/"1d3-1650a28d9b0"
Content-Type: text/html
Accept-Ranges: bytes
Content-Range: bytes 0-467/467
Date: Sun, 05 Aug 2018 13:24:48 GMT
Connection: keep-alive
Transfer-Encoding: chunked

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="css/index.css">
    <style media="screen">


    </style>
    <title>测试页面</title>
    <script src="js/index.js" charset="utf-8"></script>
</head>

<body>
    <div>
        这是一个测试界面
    </div>
</body>

</html>
```

### Ajax设置缓存头

在Ajax中，Get请求能被设置缓存头，Ajax第一请求成功后，服务端设置`Expires`和`Cache-Control`,第二次请求时，浏览器会 根据这两个字段判断是否从缓存中取数据。

```javascript
// 处理ajax Get请求
['GET /api/test'](req, res, params) {
    let expire = (Date.now() + 1 * 60 * 1000) // 1分钟
    let expireTime = new Date(expire).toUTCString()
    console.log('绝对时间expireTime ---->', expireTime);
    res.setHeader('Expires', expireTime)
    res.setHeader('Cache-Control', `public, max-age=${30}`); // 30秒
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    res.end(JSON.stringify({ success: 'ok1' }))
}
```

> POST请求计算设置的了，也无效

当然客户端也可以通过请求头`Cache-Control`控制不缓存

```javascript
...
xhr.open('GET', 'http://127.0.0.1:9200/api/test?id=100&name=zhangsan', true)
xhr.setRequestHeader('Cache-Control', 'no-cache');
xhr.send(null)
```
