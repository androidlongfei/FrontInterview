// 1.定时器

/**
 *   关于定时器需要记住的最重要的事情是，指定的时间间隔表示何时将定时器的代码添加到队列，而不是何时执行代码
 */

setTimeout(function () {
    console.log('2秒后将代码加入到任务队列，而不是执行代码')
}, 2000)

// 2.重复的定时器setInter

/**
 * 当使用setInterval()时, 仅当没有该定时器的任何其他代码实例时，才将定时器代码添加到队列中。
 * 这确保了定时器代码加入到队列中的最小时间间隔为指定间隔。
 */

function test() {
    console.log('this', this) // this指向定时器对象本身
    console.log('setInterval1')
}

global.setInterval(test, 1000)

setInterval(function () {
    console.log('setInterval2')
}, 500)
