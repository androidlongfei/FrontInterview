module.exports = {
    port: process.env.PORT || 9200,
    host: process.env.IP || 'http://127.0.0.1',
    root: './public',
    absoluteRoot: '/Users/helongfei/xinao_git/Questionnaire/dist',
    useAbsoluteRoot: false, // 是否使用绝对路径
    indexPage: "index.html",
    zipMatch: '^\\.(css|js|html)$'
}
