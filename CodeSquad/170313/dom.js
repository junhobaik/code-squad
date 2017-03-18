/**
웹페이지 HTML의 class 중 - _ 가 들어가 있는 클래스를 지우는 코드
 */

function count(tagName, del) {
  if (typeof tagName !== 'string') {
    return "error : string type Only";
  }
  else {
    var tagEles = document.getElementsByTagName(tagName);
    var cnt = 0;
    var cn = "";
    for (var i = 0; i < tagEles.length; i++) {
      cn = tagEles[i].className;
      if (/\-/.test(cn) || /\_/.test(cn)) {
        tagEles = del(tagEles, i);
        cnt++;
      }
    }
    return cnt;
  }
}

function del(tagEles, i) {
  tagEles[i].removeAttribute('class');
  //클래스가 여러개 정의되었을때를 고려못한 틀린 코드...
  //classList를 활용하여 개선해보자.
  //다음에는 classList를 활용하지 않고 정규표현식과 replace만을 이용하여 개선해보자.
  return tagEles;
}
count('div', del);