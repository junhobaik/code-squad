/*
Model은 데이터를 가진다. 기능을 가진다면 데이터를 직접 조작하는 기능을 가져야 한다.
View는 HTML을 조작하는 기능만을 모은다.
controller는 어떤 이벤트가 일어나면 모델의 데이터를 이용, 뷰의 어떠한 기능을 이용하여 화면에 뿌릴지 정의한 것을 모은다.
/*

/******************************************************************/

function Model(json) {
  this.model = json;
}
var modelFuc = {
  getTitles: function () {
    var titleList = [];
    var model_length = this.model.length;
    for (var i = 0; i < model_length; i++) {
      titleList[i] = this.model[i].title;
    }
    return titleList;
  }, //타이들값들을 가져옴
  getContent: function () {
    var news = [];
    var model_length = this.model.length;
    for (var i = 0; i < model_length; i++) {
      var imgurl = this.model[i].imgurl;
      var newslist = this.model[i].newslist;
      news[i].push({
        imgurl,
        newslist
      });
    }
    return news;
  } //뉴스이미지, 뉴스리스트들을 가져옴
}
Model.prototype = modelFuc;

/******************************************************************/

function View() {
  this.leftSide = document.querySelector("section.mainArea > nav > ul"); //왼쪽 타이틀 리스트
  this.rightSide = document.querySelector(".content");; //오른쪽 컨텐트
  this.template = document.querySelector('#newsTemplate'); //템플릿
}
var viewFunc = {
  firstLoad: function () {
    console.log(document.querySelector("section.mainArea > nav > ul > li"));
    myView.renderLeft();
    if (document.querySelector("section.mainArea > nav > ul > li") != null) {
      document.querySelector("section.mainArea > nav > ul > li").className = "selected";
    }
  },
  renderLeft: function () {

    var titleList = myModel.getTitles();
    var titleList_length = titleList.length;

    myView.leftSide.innerHTML = "";
    
    for (var i = 0; i < titleList_length; i++) {
      if (i != titleList.indexOf(event.target.innerText)) {
        myView.leftSide.innerHTML += "<li>" + titleList[i] + "</li>";
      } else {
        myView.leftSide.innerHTML += "<li class=\"selected\">" + titleList[i] + "</li>";
      }
    }
  }, //왼쪽 타이틀 리스트를 뿌려줌
  renderRight: function () {
    if (document.querySelector(".selected") != null) {
      var selectedTitleName = document.querySelector(".selected").innerText;
      var myModel_titleList = myModel.getTitles();
      var dataIndex = myModel_titleList.indexOf(selectedTitleName);

      var templateHtml = document.querySelector("#newsTemplate").innerHTML;
      templateHtml = templateHtml.replace(/{title}/, myModel.model[dataIndex].title);
      templateHtml = templateHtml.replace(/{imgurl}/, myModel.model[dataIndex].imgurl);
      var newsList = "";
      var newslist_length = myModel.model[dataIndex].newslist.length;
      for (var i = 0; i < newslist_length; i++) {
        newsList += "<li>" + myModel.model[dataIndex].newslist[i] + "</li>";
      }
      templateHtml = templateHtml.replace(/{newsList}/, newsList);
      var contentArea = document.querySelector(".content");
      contentArea.innerHTML = templateHtml;
    }
  } //오른쪽 컨텐트를 뿌려줌
}
View.prototype = viewFunc;

/******************************************************************/

function controller(json) {
  this.myModel = new Model(json);
  this.myView = new View();

  if (arguments[1] == "firstLoad") {
    this.myView.firstLoad();
  } else {
    this.myView.leftSide.addEventListener("click", this.myView.renderLeft);
    this.myView.leftSide.addEventListener("DOMSubtreeModified", this.myView.renderRight);
  }
}

/******************************************************************/
/******************************************************************/

document.addEventListener("DOMContentLoaded", function () {
  (function () {
    var oReq = new XMLHttpRequest();
    oReq.addEventListener("load", function (evt) {
      var tempData = evt.target.responseText;
      var parseData = JSON.parse(tempData);
      controller(parseData, "firstLoad");
      controller(parseData);
    });
    oReq.open("GET", "data/newslist.json");
    oReq.send();
  })();
});