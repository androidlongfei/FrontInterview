
//2.结果缓存 (闭包)

//我们开发中会碰到很多情况，设想我们有一个处理过程很耗时的函数对象，每次调用都会花费很长时间，
//那么我们就需要将计算出来的值存储起来，当调用这个函数的时候，首先在缓存中查找，如果找不到，则进行计算，然后更新缓存并返回值，
//如果找到了，直接返回查找到的值即可。闭包正是可以做到这一点，因为它不会释放外部的引用，从而函数内部的值可以得以保留。

var CachedSearchBox = (function(){
    var cache = {};
    var count = [];
    console.log('自动执行一次',cache,count)
    return {
       attachSearchBox : function(dsid){
           console.log('attachSearchBox',dsid,cache,count)
           if(dsid in cache){//如果结果在缓存中
              console.log('从缓存中获取')
              return cache[dsid];//直接返回缓存中的对象
           }
           var fsb = dsid;//新建
           cache[dsid] = fsb;//更新缓存
           count.push(fsb)
           if(count.length > 5){//保正缓存的大小<=100
              delete cache[count.shift()];
           }
           return fsb;
       },

       clearSearchBox : function(dsid){
           if(dsid in cache){
              cache[dsid].clearSelection();
           }
       }
    };
})();

console.log(CachedSearchBox.attachSearchBox("input"))
console.log(CachedSearchBox.attachSearchBox("input1"))
console.log(CachedSearchBox.attachSearchBox("input2"))
console.log(CachedSearchBox.attachSearchBox("input"))
console.log(CachedSearchBox.attachSearchBox("input4"))
console.log(CachedSearchBox.attachSearchBox("input5"))
console.log(CachedSearchBox.attachSearchBox("input6"))
console.log(CachedSearchBox.attachSearchBox("input7"))
