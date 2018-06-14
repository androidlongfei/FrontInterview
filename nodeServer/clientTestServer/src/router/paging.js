/**
 * [测试分页查询]
 * @param  {[type]} app [description]
 * @return {[type]}     [description]
 */
import _ from 'lodash';
import pingData from '../testData/paging.js'

module.exports = function (app) {
    app.post('/paging', function (req, res) {
        console.log('paging body data', req.body);
        let start = parseInt(req.body.start)
        let count = parseInt(req.body.count)
        let end = start + count
        console.log(start, end);
        let reust = _.slice(pingData.paging, start, end)
        setTimeout(function () {
            res.json({
                testData: reust,
                total: pingData.paging.length
            })
        }, 2000)
    })

    app.post('/paging/count', function (req, res) {
        console.log('paging body data', req.body);
        let start = parseInt(req.body.data.pageIndex)
        let count = parseInt(req.body.data.pageSize)
        console.log('页码', start);
        let totalPage = Math.ceil(pingData.paging.length / count)
        let list = pagingArray(pingData.paging, start, count)
        setTimeout(function () {
            let code = '10000'
            if (start === 3) {
                code = '10001'
            }
            res.json({
                code: code,
                data: {
                    questionnaire: {
                        title: '体质问卷',
                        code: 7
                    },
                    itemList: list,
                    currentPageIndex: start,
                    totalPageCount: totalPage
                }
            })
        }, 1000)
    })
}

/**
 * [pagingArray 分页加载]
 * @param  {[type]} mArray    [description]
 * @param  {[type]} pageIndex [description]
 * @param  {[type]} mPageNum  [description]
 * @return {[type]}           [description]
 */
function pagingArray(mArray, pageIndex, mPageNum) {
    let array = mArray
    let pageNum = mPageNum
    let startPosition, endPosition
    startPosition = pageIndex * pageNum - pageNum
    endPosition = pageIndex * pageNum
    if (startPosition < 0) {
        startPosition = 0
    }
    if (endPosition > array.length) {
        endPosition = array.length
    }
    return array.slice(startPosition, endPosition)
}
