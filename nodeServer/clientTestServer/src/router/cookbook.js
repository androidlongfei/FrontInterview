import fs from 'fs'
module.exports = function (app) {
    app.post('/getCookDetail', function (req, res) {
        console.log('/getCookDetail')
        console.log('post参数', req.body);
        let data = fs.readFileSync('./src/testData/cookbook.json')
        let dataJson = JSON.parse(data);
        console.log('data', dataJson)
        res.json(dataJson)
    });
}
