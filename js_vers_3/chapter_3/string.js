$(function() {
  addHtml()
})

function addHtml() {
  $('#container').append(getStringItem('hello', '测试传递字符串1'))
  $('#container').append(getParameterItem('hello', '测试传递字符串2'))
  $('#container').append(getParameterItem('1234', '测试传递字符串3'))
  $('#container').append(getParameterItem(1234, '测试传递数字4'))
  var obj = {
    name: 'zhansan',
    age: 20,
    'sex': "男",
    address: {
      work: '34号',
      family: '44号'
    },
    car: ['奔驰', '宝马', '111']
  }
  $('#container').append(getParameterItem(obj, '测试传递对象5'))
}



function getStringItem(strParameter, title) {
  var item = '<p class="" onclick=testClick(\"' + strParameter + '\")>' + title + '</p>'
  return item
}

function getParameterItem(parameter, title) {
  var item = '<p class="" onclick=testClick(' + converHtmlParameter(parameter) + ')>' + title + '</p>'
  return item
}

function testClick(p) {
  console.log('testClick value', p);
  console.log('testClick typeof', typeof p);
}

/**
 * [converHtmlParameter 转义Html中的参数]
 * @param  {[Number,Object,String]} parameter [需要转义的数据]
 * @return {[String]}      [转义后的数据]
 */
function converHtmlParameter(parameter) {
  console.log('converHtmlParameter', parameter, JSON.stringify(parameter));
  return parameter ? JSON.stringify(parameter).replace(/"/g, '&quot;') : ''
}
