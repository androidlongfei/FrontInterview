// js中所有全局定义的方法和属性都是global对象的属性.如isNaN(),parseInt()


// 1. encodeURI 和 encodeURIComponent

var http = 'http://www.baidu.com/au/?name=李四&&eName=li si&&age=18'

var encodeHttp = encodeURI(http)
var encodeURIHttp = encodeURIComponent(http)

console.log('encodeURI', encodeHttp);
console.log('encodeURIComponent', encodeURIHttp)

var decodeHttp = decodeURI(encodeHttp) // 解码url, decodeURI与encodeURI对应
var decodeURIHttp = decodeURIComponent(encodeURIHttp) // 解码url, encodeURIComponent与decodeURIComponent对应

console.log('decodeHttp', decodeHttp);
console.log('decodeURIHttp', decodeURIHttp)

// encodeURI : 编码后的结果是除了空格之外的其他字符串都原封不动
// encodeURIComponent: 使用对应的编码替换所有非字母数字字符

//备注:URI(encodeURI和encodeURIComponent)方法能编码所有的Unicode字符，而escape只能编码ASCII字符.所以escape方法在es3中被URI方法替代.

/**
 * Unicode（统一码、万国码、单一码）是计算机科学领域里的一项业界标准,包括字符集、编码方案等.
 * 它为每种语言中的每个字符设定了统一并且唯一的二进制编码，以满足跨语言、跨平台进行文本转换、处理的要求。1990年开始研发，1994年正式公布。
 */

/**
 * ASCII（American Standard Code for Information Interchange，美国信息交换标准代码）是基于拉丁字母的一套电脑编码系统，主要用于显示现代英语和其他西欧语言.
 * ASCII 使用7位二进制数（剩下的1位二进制为0）来表示所有的大写和小写字母，数字0 到9、标点符号,以及在美式英语中使用的特殊控制字符如LF（换行）、CR（回车)等。
 * ASCII码表是无法表示中文字符的，需要用到Unicode码表。
 */
