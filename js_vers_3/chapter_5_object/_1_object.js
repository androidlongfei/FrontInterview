function addTen() {
    var item = 0

    function getItem() {
        item += 10
        return item
    }
    return getItem
}

var add = addTen()

for (var i = 1; i <= 10; i++) {
    console.log(i, add())
}


var test = {
    '-': 10,
    '+': 20
}

var key = '-'
console.log('test', test[key])
test['-'] = 100
console.log('test', test[key])
