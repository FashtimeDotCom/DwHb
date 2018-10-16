var cityObj = [{ "id": "35", "provincecode": "150000", "city": "\u963f\u62c9\u5584\u76df", "code": "152900", "initial": "A" }, { "id": "38", "provincecode": "210000", "city": "\u978d\u5c71\u5e02", "code": "210300", "initial": "A" }]

//城市检索的首字母
var searchLetter = ["A"]

//空白小伙伴的作品.原文地址.http://www.wxapp-union.com/forum.php?mod=viewthread&tid=1644&extra=page%3D1
function searchLetter() {
  return searchLetter;
}

//对城市信息进行分组
function cityList() {

  var tempObj = [];
  for (var i = 0; i < searchLetter.length; i++) {
    var initial = searchLetter[i];
    var cityInfo = [];
    var tempArr = {};
    tempArr.initial = initial;
    for (var j = 0; j < cityObj.length; j++) {
      if (initial == cityObj[j].initial) {
        cityInfo.push(cityObj[j]);
      }
    }
    tempArr.cityInfo = cityInfo;
    tempObj.push(tempArr);
  }
  return tempObj;
}

function pushCity() {

}

module.exports = {
  searchLetter: searchLetter,
  cityList: cityList
}