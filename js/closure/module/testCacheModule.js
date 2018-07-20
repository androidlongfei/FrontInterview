let cache = require('./cacheDataModule')

console.log('cache', typeof cache, cache);

cache.put(1)
cache.put('张三')
cache.put({
    love: 'sport'
})

console.log('cache', cache.getAll());

let cache1 = require('./cacheDataModule');

console.log('cache1', cache1.getAll());

// require 可见require只加载一次代码到内存中
