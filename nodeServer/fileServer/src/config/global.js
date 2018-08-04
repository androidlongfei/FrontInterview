import path from 'path'

module.exports = {
    port: process.env.PORT || 9200,
    host: process.env.IP || 'http://127.0.0.1',
    root: './public',
    indexPage: "index.html"
}
