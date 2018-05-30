// getPagination(1, 10)
// getPagination(2, 10)
// getPagination(3, 10)
// getPagination(4, 10)
// getPagination(5, 10)
// getPagination(6, 10)
// getPagination(7, 10)
// getPagination(8, 10)
// getPagination(9, 10)
// getPagination(10, 10)

var maxPage = 10
var currentPage = 5

buildPagination(currentPage, maxPage)


function buildPagination(currentPage, maxPage) {
  $('#memberPagination li').remove()
  var pagArr = getPagination(currentPage, maxPage)
  var lastPage = ''
  var contentPage = ''
  var nextPage = ''
  if (currentPage == 1) {
    lastPage = '<li class="am-disabled"><a href="#">&laquo;</a></li>'
  } else {
    lastPage = '<li><a href="#" onclick=paginationClick(' + converHtmlParameter(currentPage - 1) + ')>&laquo;</a></li>'
  }
  // console.log('memberPagination', $('#memberPagination'));
  $('#memberPagination').append(lastPage)
  _.each(pagArr, function(value) {
    contentPage = '<li><a href = "#" onclick=paginationClick(' + converHtmlParameter(value) + ')> ' + value + ' </a></li>'
    if (currentPage == value) {
      // 当前页
      contentPage = '<li class = "am-active" > <a href = "#" onclick=paginationClick(' + converHtmlParameter(value) + ')> ' + value + ' </a></li>'
    }
    $('#memberPagination').append(contentPage)
  })
  if (currentPage == maxPage) {
    nextPage = '<li class="am-disabled"><a href="#">&raquo;</a></li>'
  } else {
    nextPage = '<li><a href="#" onclick=paginationClick(' + converHtmlParameter(currentPage + 1) + ')>&raquo;</a></li>'
  }
  $('#memberPagination').append(nextPage)
}

function paginationClick(page) {
  console.log('paginationClick', page)
  currentPage = page
  buildPagination(currentPage, maxPage)
}

function getPagination(currentPage, countPage) {
  var num = 5
  var segment = (num - 1) / 2
  var pageArr = []
  var minIndex = 1
  var maxIndex = countPage
  if (minIndex <= (currentPage - segment) && (currentPage + segment) <= maxIndex) {
    for (var m = (currentPage - segment); m < currentPage; m++) {
      pageArr.push(m)
    }
    pageArr.push(currentPage)
    for (var n = (currentPage + 1); n <= (currentPage + segment); n++) {
      pageArr.push(n)
    }
  } else if ((currentPage - segment) < minIndex) {
    for (var j = minIndex; j <= maxIndex; j++) {
      if (pageArr.length == num) {
        break;
      }
      pageArr.push(j)
    }
  } else if ((currentPage + segment) > maxIndex) {
    for (var i = maxIndex; i >= minIndex; i--) {
      if (pageArr.length == num) {
        break;
      }
      pageArr.unshift(i)
    }
  }
  console.log('getPagination', pageArr);
  return pageArr
}

/**
 * [converHtmlParameter 转义Html中的参数]
 * @param  {[Number,Object,String]} parameter [需要转义的数据]
 * @return {[String]}      [转义后的数据]
 */
function converHtmlParameter(parameter) {
  // console.log('converHtmlParameter', parameter, JSON.stringify(parameter));
  return parameter ? JSON.stringify(parameter).replace(/"/g, '&quot;') : ''
}
