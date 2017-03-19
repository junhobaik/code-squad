/*
  newsIndex 오류 수정 완료
  content의 title부분을 클릭해도 사라지는 문제 해결 필요
  코드 리뷰에서 개선사항 나온 것들 개선 필요
*/

(function () {
  var oReq = new XMLHttpRequest();
  oReq.addEventListener("load", function () {
    var oReqText = oReq.responseText; //string
    var jsonObj = JSON.parse(oReqText); //array
    firstLoad(jsonObj);
    runEvents(jsonObj);
  });
  oReq.open("GET", "data/newslist.json");
  oReq.send();

  function firstLoad(jsonObj) {
    var mainAreaUl = document.querySelector("section.mainArea > nav > ul");
    mainAreaUl.innerHTML = "";
    if (jsonObj[0] != undefined) {
      for (var i = 0; i < jsonObj.length; i++) {
        mainAreaUl.innerHTML += "<li>" + jsonObj[i].title + "</li>";
      }
      mainAreaUl.firstElementChild.classList.add("select"); //
      replaceHTML(0, jsonObj);
    }else{
      document.querySelector(".content").innerHTML = "";
    }
  }

  function runEvents(jsonObj) {
    var newsIndex = 0;
    //nav event
    var navUl = document.querySelector("section.mainArea > nav > ul");
    navUl.addEventListener("click", function (e) {
      toggle(e.target, "select");
      for (var i = 0; i < jsonObj.length; i++) {
        if (e.path[0].innerText == jsonObj[i].title) {
          replaceHTML(i, jsonObj);
          newsIndex = i;
        }
      }
    });
    //section event
    var btnEle = document.querySelector(".btn");
    btnEle.addEventListener("click", function (e) {
      var target = e.target;
      if (target.closest(".left")) {
        newsIndex--;
        if (newsIndex === -1) {
          newsIndex = jsonObj.length - 1;
        }
        setClass(newsIndex, "select");
        replaceHTML(newsIndex, jsonObj);
      }
      else {
        newsIndex++;
        if (newsIndex === jsonObj.length) {
          newsIndex = 0;
        }
        setClass(newsIndex, "select");
        replaceHTML(newsIndex, jsonObj);
      }
    });
    //x event
    var btnX = document.querySelector(".content");
    btnX.addEventListener("click", function (e) {
      //e.target.parentNode를 로컬 변수로 지정하여 사용
      //a.length를 반복문에 담으면 매번 length가 작동하므로 로컬 변수로 지정하여 사용
      //for문 안에 중첩된 것을 개선 보기 쉽게 바꿔보자
      //===를 사용하도록 습관을 들이자 ==는 타입을 확인하지 암묵적인 형변환을 할 수도 있다.
      if (e.target.parentNode.className == "title" || e.target.parentNode.parentNode.className == "title") {
        var title = document.querySelector(".newsName").innerText;
        for (var i = 0; i < jsonObj.length; i++) {
          if (title == jsonObj[i].title) {
            var newJsonStr = JSON.stringify([]);
            var newJsonObj = JSON.parse(newJsonStr); // var a = []; 와 다를게 없다...
            for (var j = 0; j < jsonObj.length; j++) {
              var cnt = 0;
              if (j != i) {
                newJsonObj.push(jsonObj[j]);
              }
            }
            jsonObj = newJsonObj;
            newsIndex--;
            firstLoad(jsonObj);
            break;
          }
        }
      }
    });
  }

  function replaceHTML(i, jsonObj) {
    var tpl = document.querySelector('#newsTemplate');
    var tplHTML = tpl.innerHTML;
    var newsList = "";
    tplHTML = tplHTML.replace(/{title}/, jsonObj[i].title);
    tplHTML = tplHTML.replace(/{imgurl}/, jsonObj[i].imgurl);
    for (var j = 0; j < jsonObj[i].newslist.length; j++) {
      newsList += "<li>" + jsonObj[i].newslist[j] + "</li>";
    }
    tplHTML = tplHTML.replace(/{newsList}/, newsList);
    var contentArea = document.querySelector('.content');
    contentArea.innerHTML = tplHTML;
  }

  function toggle(ele, className) {
    var ulEle = ele.parentElement;
    var liList = ulEle.children;
    for (var i = 0; i < liList.length; i++) {
      liList[i].classList.remove(className);
    }
    ele.classList.add(className);
  }

  function setClass(index, className) {
    var ulEle = document.querySelector("section.mainArea > nav > ul");
    var liList = ulEle.children;
    for (var i = 0; i < liList.length; i++) {
      liList[i].classList.remove(className);
    }
    liList[index].classList.add(className);
  }
})();