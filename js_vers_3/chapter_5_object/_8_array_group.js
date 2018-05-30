//  对数组中的对象按属性分组

var array = [{
    time: '2015-06-11 20:09',
    title: '收缩压'
}, {
    time: '2015-06-12 20:09',
    title: '收缩压'
}, {
    time: '2015-06-11 20:09',
    title: '舒张压'
}, {
    time: '2015-06-12 20:09',
    title: '舒张压'
}, {
    time: '2016-06-11 20:09',
    title: '收缩压'
}, {
    time: '2017-06-11 20:09',
    title: '收缩压'
}, {
    time: '2016-06-11 20:09',
    title: '舒张压'
}, {
    time: '2017-06-11 20:09',
    title: '舒张压'
}, {
    time: '2018-06-11 20:09',
    title: '舒张压'
}]

var groupArray = []

for (var i = 0; i < array.length; i++) {
    var itemOne = array[i]
    for (var j = i + 1; j < array.length; j++) {
        var itemTwo = array[j]
        console.log('group', i, j);
        if (itemOne.time == itemTwo.time) {
            var itemArray = []
            itemArray.push(itemOne)
            itemArray.push(itemTwo)
            groupArray.push(itemArray)
        }
    }
}
console.log('groupArray', groupArray)
