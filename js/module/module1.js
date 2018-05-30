var myModule = (function (mod) {
    console.log('mod', mod)
    mod._count = 100

    mod.setCount = function (count) {
        mod._count = count
    }

    mod.getCount = function () {
        return mod._count
    }

    console.log('mod', mod);
    return mod
})(myModule || {})

console.log('myModule', myModule)
myModule._count = 200
console.log('myModule', myModule._count)


var myObj = (function () {
    var count = 1
    return {
        setCount: function (localCount) {
            count = localCount
        },
        getCount: function () {
            return count
        },
        autoAddCount: function () {
            count++
        }
    }
})()

console.log('myObj', typeof myObj)

console.log('myObj count', myObj.count);
console.log('myObj getCount', myObj.getCount());
myObj.setCount(100)
console.log('myObj getCount', myObj.getCount());
myObj.autoAddCount()
console.log('myObj getCount', myObj.getCount());
