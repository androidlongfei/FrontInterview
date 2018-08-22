// 请用js去除字符串空格？

// 方法一：使用replace正则匹配的方法


// 去除所有空格: str = str.replace(/\s*/g,"");

var str = " 23 23 ";
var str2 = str.replace(/\s*/g, ""); // \s 匹配空格,空字符
var str3 = str.replace(/^\s*|\s*$/g, ""); // ^开头  $结尾
var str4 = str.replace(/^\s*/, ""); // ^开头
var str5 = str.replace(/\s*$/, ""); // ^开头

console.log('去除所有空格', str2); // 2323

console.log('去除两头空格', str3); // 23 23

console.log('去除左空格', str4); // 23 23

console.log('去除右空格', str5); // 23 23
