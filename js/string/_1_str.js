// 1. 将两个或多个字符的文本组合起来，返回一个新的字符串。

var str1 = 'sss'
var str2 = 'aaa'

console.log(str1.concat(str2)); // sssaaa

// 返回字符串中一个子串第一处出现的索引。如果没有匹配项，返回 -1 。

var str3 = 'abcdt'

console.log(str3.indexOf('a')); // 0
console.log(str3.indexOf('cd')); // 2
console.log(str3.indexOf('cdm')); // -1

// 返回指定位置的字符

var str4 = 'abcdt'
console.log(str4.charAt(0)); // a
console.log(str4.charAt(10)); // ''

// 返回字符串中一个子串最后一处出现的索引，如果没有匹配项，返回 -1 。

var str5 = 'abcdtabcf'

console.log(str5.lastIndexOf('ab')); // 5

// 返回从string的startPos位置，长度为length的字符串

var str6 = 'abcdtabcf'

console.log(str6.substr(0, 3)); // abc

// 返回字符串的一个子串。传入参数是起始位置和结束位置。注意：不包括结束位置

var str7 = 'abcdefgh'

console.log(str7.substring(0, 4)); // abcd

// 提取字符串的一部分，并返回一个新字符串。注意：不包括结束位置，并且原数组不会改变

var str8 = 'abcdefgh'

console.log(str8.slice(0, 4)); // abcd

// 用来查找匹配一个正则表达式的字符串，然后使用新字符串代替匹配的字符串

var str9 = 'ab cde fgh'

console.log(str9.replace(/\s*/g, '')); // 匹配空格并用空字符串代替，输出abcdefgh

// search() – 执行一个正则表达式匹配查找。如果查找成功，返回字符串中匹配的索引值。否则返回 -1

var str10 = 'abcdefgh'

console.log(str10.search(/d/g)); // 3

// 通过将字符串划分成子串，将一个字符串做成一个字符串数组。

var str11 = 'ab-cd-ef-gh'

console.log(str11.split('-')); // ['ab','cd','ef','gh']
