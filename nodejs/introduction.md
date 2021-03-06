同样的算法计算斐波那契数列，为什么nodejs比php快那么多？
为什么，因为Node.JS里集成了V8 JIT这个即时编译器，而PHP没有，并且在CLI下也不能开启Opcache。
虽然Node.JS仗着JIT计算优势要比其他比如Perl、PHP、 Python、Ruby这些默认没有JIT的脚本语言快，
但Node.JS在提供Web服务时仍然不适合进行计算密集型操作。虽然Node.JS的网络和 文件I/O是异步的，
但开发者编写的回调函数仍然是阻塞的，如果回调函数里的业务操作涉及到耗时的计算，
那么Node.JS主线程就会被堵住，Node.JS的异步优势就发挥不出来。

什么是单页app
单页面是指只有一个主页面的应用，浏览器一开始要加载所有必须的 html, js, css。
所有的页面内容都包含在这个所谓的主页面中。但在写的时候，还是会分开写（页面片段），然后在交互的时候由路由程序动态载入。

相比之下，传统的多页面应用每个页面（只说动态页面）都是使用服务器端模板编写，然后请求这个页面的时候由服务器渲染成 html 再返回。
两者对比，一个很明显的区别就是，多页面应用的 server 端要干两件事：提供数据+渲染，而单页面应用把渲染拿到浏览器端做了，服务器只提供数据就可以了。可以去找一个 Angular/Vue/React 之类的单页面 demo 看看，更易理解。

单页应用有那些优缺点？
优点：
1、分离前后端关注点，前端负责界面显示，后端负责数据存储和计算，各司其职，不会把前后端的逻辑混杂在一起；
2、减轻服务器压力，服务器只用出数据就可以，不用管展示逻辑和页面合成，吞吐能力会提高几倍；
3、同一套后端程序代码，不用修改就可以用于Web界面、手机、平板等多种客户端；
缺点:
1、SEO问题，现在可以通过Prerender等技术解决一部分；
2、前进、后退、地址栏等，需要程序进行管理；  
初次加载耗时相对增多

注意:
1.高并发不等于高实时性
以网站响应为例，高并发意味着可以同时接受很高数量的页面请求，但从接受每个请求到把最终数据返回给请求者的时间确是响应速度的问题。
这就好像我们很多人同时去饭馆吃饭，如果饭馆接待员反应灵敏,调度得当，她会让我们每个人都能得到一个座位，并且开始点菜，但这不表示我们能在很快时间内吃上可口的菜。

一.nodejs特点

  nodejs能处理高并发，cpu不密集型任务

  如果需要nodejs处理cpu密集型任务，就需要启动子进程

  nodejs处理i/o密集型任务，底层还是通过多线程来执行的（c++模块）

  Node.js 基于很灵活的 JavaScript 语言，使用 V8 引擎，具有可进行 C/C++扩展，支持多进程，非阻塞，事件驱动等特性，让 Node.js 有着不错的性能和表现。虽然暂时还不太适宜大型复杂的 Web 应用开发，但它的这些特性在处理特定问题中，比如秒杀、业务逻辑简单的高并发网站、嵌入式开发等类似的特定应用场景还是相当有竞争力的。

二.服务器种类

1.服务器为每个客户端请求分配一个线程/进程，使用阻塞式I/O。Java就是这种策略，Apache也是，这种策略还是很多交互式应用的首选。因为阻塞，这种策略很难实现高性能，但非常简单，可以实现复杂的交互逻辑。

2.服务器用一个线程处理所有客户端请求，使用非阻塞的I/O及事件机制。node.js采用的就是这种策略。这种策略实现起来比较简单，方便移植，也能提供足够的性能，但无法充分利用多核CPU资源。

3.服务器会分配多个线程来处理请求，但每个线程只处理其中一组客户端的请求，使用非阻塞的I/O及事件机制。这是对第二种策略的简单改进，在多线程并发上容易出现bug。

4.服务器会分配多个线程来处理请求，但每个线程只处理其中一组客户端的请求，使用异步I/O。这种策略在支持异步I/O的操作系统上性能非常高，但实现起来很难，主要用在windows平台上。
