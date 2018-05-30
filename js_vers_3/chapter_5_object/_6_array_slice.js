var arrays = [1, 2, 3, 4, 5, 6, 7]

console.log('0~2', arrays.slice(0, 2));
console.log('0~2', arrays.slice(1, 2));
console.log('0~2', arrays.slice(0, arrays.length));

console.log('1页', pagingArray(arrays, 1, 2));
console.log('2页', pagingArray(arrays, 2, 2));
console.log('3页', pagingArray(arrays, 3, 2));
console.log('4页', pagingArray(arrays, 4, 2));

// var str = 'http://192.168.1.0'
var str = '192.168.1.0'
console.log();
if (str.indexOf('http://') != -1) {
    console.log('有');
} else {
    console.log('没有');
}
/**
 * [pagingArray 分页获取数据]
 * @param  {[type]} array     [description]
 * @param  {[type]} pageIndex [description]
 * @param  {[type]} pageNum   [description]
 * @return {[type]}           [description]
 */
function pagingArray(array, pageIndex, pageNum) {
    var startPosition, endPosition
    startPosition = pageIndex * pageNum - pageNum
    endPosition = pageIndex * pageNum
    if (startPosition < 0) {
        startPosition == 0
    }
    if (endPosition > array.length) {
        endPosition = array.length
    }
    console.log('s-e', startPosition, endPosition)
    return array.slice(startPosition, endPosition)
}
