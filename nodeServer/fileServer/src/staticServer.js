import path from 'path'
import http from 'http'
import fs from 'fs'
import url from 'url'
import config from './config/global.js'
import cache from './config/cache.js'
import { lookup } from './mime.js'
import moment from 'moment'
import zlib from 'zlib'
import testRouter from './router/test.js'

class StaticServer {
    constructor() {
        this.port = config.port;
        this.host = config.host;
        if (config.useAbsoluteRoot) {
            // 使用绝对路径
            this.root = config.absoluteRoot
        } else {
            // 相对路径
            this.root = path.join(__dirname, config.root);
        }
        this.indexPage = config.indexPage;
        this.zipMatch = config.zipMatch

        this.enableCacheControl = cache.cacheControl
        this.enableExpires = cache.expires
        this.enableETag = cache.etag
        this.enableLastModified = cache.lastModified
        this.maxAge = cache.maxAge
        this.expiresTime = cache.expiresTime
    }

    // 处理文件不存在
    respondNotFound(req, res) {
        res.writeHead(404, {
            'Content-Type': 'text/html'
        });
        res.end(`<h1>Not Found</h1><p>The requested URL ${req.url} was not found on this server.</p>`);
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

    // 处理文件
    responseFile(stat, pathName, req, res) {
        let readStream;
        res.setHeader('Content-Type', lookup(pathName));
        //  告知浏览器支持断点续传
        res.setHeader('Accept-Ranges', 'bytes');
        console.log('range----->', req.headers['range']);
        if (req.headers['range']) {
            // 浏览器已经传递start,end
            readStream = this.rangeHandler(pathName, req.headers['range'], stat.size, res);
            if (!readStream) return;
        } else {
            readStream = fs.createReadStream(pathName);
        }
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
                this.responseFile(stat, pathName, req, res);
            }
        });
    }

    formatTime(time) {
        return moment(time).format('YYYY-MM-DD hh:mm:ss')
    }

    // 设置缓存相关的响应头
    setFreshHeaders(stat, req, res) {
        console.log('---------------------setFreshHeaders-----------------------------------');
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

    // 文件的唯一标识，主要用来判断内容是否修改过，根据文件的修改时间和文件size
    generateETag(stat) {
        // console.log('generateETag', stat);
        const mtime = stat.mtime.getTime().toString(16);
        const size = stat.size.toString(16);
        return `W/"${size}-${mtime}"`;
    }

    // 让浏览器取缓存
    responseNotModified(res) {
        res.statusCode = 304;
        res.end();
    }

    // 读取文件错误
    respondError(err, res) {
        res.writeHead(500);
        return res.end(err);
    }

    // 处理ajax请求
    xhrHandler(req, res) {
        console.log('ajax', req.url);
        if (req.url.startsWith('/api/test')) {
            testRouter.doReq(req, res)
            return
        }
        let result = {
            status: 'ok',
            data: {
                name: 'zhangsan'
            }
        }
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        res.end(JSON.stringify(result))
    }

    /**
     * 路由处理
     */
    routeHandler(pathName, req, res) {
        console.log('req.method', req.method);
        console.log('req.url', req.url);
        if (req.url && req.url.startsWith('/api')) {
            // xhr 请求
            this.xhrHandler(req, res)
            return
        }
        // 处理静态资源
        console.log('pathName', pathName);
        fs.stat(pathName, (err, stat) => {
            if (!err) {
                console.log(`${pathName} 存在`);
                if (pathName.endsWith('/') && stat.isDirectory()) {
                    // 目录且以/结尾
                    this.respondDirectory(stat, pathName, req, res);
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
    respondDirectory(stat, pathName, req, res) {
        console.log('是目录');
        const indexPagePath = path.join(pathName, this.indexPage);
        if (fs.existsSync(indexPagePath)) {
            // 处理目录下入口文件,默认为 index.html
            this.responseFile(stat, indexPagePath, req, res);
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

    /**
     * 启动服务
     */
    start() {
        http.createServer((req, res) => {
            let url = path.normalize(req.url)
            const pathName = path.join(this.root, url);
            this.routeHandler(pathName, req, res);
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
