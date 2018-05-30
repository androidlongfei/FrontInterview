/**
 * 数组
 */

// 判断是否是数组的两种方法

var arr = [1, 2, 3]

if (arr instanceof Array) {
    console.log('instanceof:', '是数组');
}

if (Array.isArray(arr)) {
    console.log('isArray:', '是数组');
}

var colors = ['red', 'blue', 'green', 'yellow']
// delPositionItemForArray(colors, 1, 1)
replacePositionItemForArray(colors, 1, 1, 'cyan')
insertPositionItemForArray(colors, 2, 'purple')


/**
 * [delPositionItemForArray 删除数组中指定元素,原数组会变]
 * @param  {[Number]} arr      [description]
 * @param  {Number} position [数组下标,从0开始]
 * @param  {Number} num      [删除个数]
 * @return {[Number]}        [被删除的数组]
 */
function delPositionItemForArray(arr, position, num) {
    var newArr = arr.splice(position, num)
    console.log('del array item', newArr)
    console.log('origin array item', arr)
}

/**
 * [delPositionItemForArray 替换数组中指定元素,原数组会变]
 * @param  {[Number]} arr      [description]
 * @param  {Number} position [数组下标,从0开始]
 * @param  {Number} num      [删除个数]
 * @param  {string} newItem      [插入项]
 * @return {[Number]}        [被删除数组元素]
 */
function replacePositionItemForArray(arr, position, num, newItem) {
    console.log('replace array ago', arr)
    var replaceItem = arr.splice(position, num, newItem)
    var log = 'after replace array' + ',posi = ' + position
    console.log(log, arr)
}

/**
 * [delPositionItemForArray 在数组指定位置插入元素,原数组会变]
 * @param  {[Number]} arr      [description]
 * @param  {Number} position [数组下标,从0开始]
 * @param  {string} newItem      [插入项]
 * @return {[Number]}        [新插入的数组元素]
 */
function insertPositionItemForArray(arr, position, newItem) {
    console.log('insert array ago', arr)
    var replaceItem = arr.splice(position, 0, newItem)
    var log = 'after insert replace array' + ',posi = ' + position
    console.log(log, arr)
}


function dd {
    // ass
}
