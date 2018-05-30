// module 实际上不是全局的，而是每个模块本地的。
// 模块导出的时候，真正导出的执行是module.exports，而不是exports


const input = (val) => {
    console.log(val);
}

const count = 14

module.exports = {
    input,
    count
}

// module.exports 导出默认的模块对象
