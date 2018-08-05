# Http缓存

- [http缓存](https://blog.csdn.net/Mr_YanYan/article/details/80940336)
- [浏览器缓存](https://www.jianshu.com/p/0c31b58dbccb)
- [缓存](https://www.cnblogs.com/slly/p/6732749.html)

## Cache-Control

Cache-Control 除了可以设置 max-age 相对过期时间以外，还可以设置成如下几种值：

- public，资源允许被中间服务器缓存。

  > 浏览器请求服务器时，如果缓存的时间没到，中间服务器直接返回给浏览器内容，而不必请求资源服务器

- private，资源不允许被中间代理服务器缓。

  > 浏览器请求服务器时，中间服务器都要把浏览器的请求头传给服务器。

- no-cache，浏览器不做缓存检查

  > 每次访问资源，浏览器都要向服务器询问，如果文件没变化，服务器只告诉继续使用缓存（304）。

- no-store，浏览器不缓存资源

  > 每次访问资源，浏览器都要请求服务器，并且，服务器不去检查文件是否变化，而是直接返回完整的资源。

Cahe-Control对缓存的控制粒度更细，包括缓存代理服务器的缓存控制。

## Last-Modified与ETag

你可能会觉得使用Last-Modified已经足以让浏览器知道本地的缓存副本是否足够新，为什么还需要Etag（实体标识）呢？HTTP1.1中Etag的出现主要是为了解决几个Last-Modified比较难解决的问题：

1. Last-Modified标注的最后修改只能精确到秒级，如果某些文件在1秒钟以内，被修改多次的话，它将不能准确标注文件的新鲜度
2. 如果某些文件会被定期生成，当有时内容并没有任何变化，但Last-Modified却改变了，导致文件没法使用缓存
3. 有可能存在服务器没有准确获取文件修改时间，或者与代理服务器时间不一致等情形

> Etag是服务器自动生成或者由开发者生成的对应资源在服务器端的唯一标识符，能够更加准确的控制缓存，但是需要注意的是分布式系统里多台机器间文件的last-modified必须保持一致，以免负载均衡到不同机器导致比对失败，Yahoo建议分布式系统尽量关闭掉Etag(每台机器生成的etag都会不一样，因为除了 last-modified、inode 也很难保持一致)。

> Last-Modified/If-Modified-Since要配合Cache-Control使用，Etag/If-None-Match也要配合Cache-Control使用。
