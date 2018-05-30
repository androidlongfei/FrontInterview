// 测试 module.exports

const myModuleExports = require('./_module_exports')
console.log('myModuleExports', myModuleExports); // { input: [Function: input], count: 14 }

const { input, count } = require('./_module_exports')
input(123)
console.log(count);

// const { myInput } = require('./_exports') // 报错
const myExports = require('./_exports')
console.log('myExports', myExports); // myExports { myInput: [Function], show: [Function] }
myExports.myInput(789)
