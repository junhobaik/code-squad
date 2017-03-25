var ns = {}; //name space

ns.util = {
  modelAjax: function (url, fn) { //DB에 있는 값들을 json으로 가져오자
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();

    xhr.addEventListener('load', function () {
      var data = JSON.parse(xhr.responseText); //서버를 통해 받은 데이터, json object로 변환
      console.log(".. util > sendAjax", data); //데이터가 잘 넘어왔는지 확인
      fn(data); //데이터를 함수의 인자로 전달
    });
  },
  removeAjax: function (url) {
    var title = document.querySelector(".newsName").innerText;
    var data = {
      'title': title
    };
    data = JSON.stringify(data);

    var xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(data);
  }
  /** AJAX
   * 이벤트를 통해 ajax함수가 호출된다.
   * 먼저 AJAX 통신을 위한 XMLHttpRequest 객체를 만든다.
   * xhr 객체는 서버와 통신하며 서버에서는 DB와 통신을 해서 데이터를 받아 응답한다.
   * xhr 객체는 응답을 받아 콜백 메소드를 통해서 데이터를 넘기거나 기능을 수행한다.
   */
}; //AJAX 관련 함수 모음 객체

/**************************************************************/

ns.dispatcher = {
  register: function (fnlist) {
    this.fnlist = fnlist;
  },
  emit: function (o, data) {
    this.fnlist[o.type].apply(null, data);
  }
}; //디스패쳐
/*note
  DISPATCHER
  변화가 발생시 미리 가지고 있는 정보를 토대로, 필요할 일을 실행시킴
  일종의 Observer pattern을 사용해보자
*/

/**************************************************************/

ns.model = {
  newsList: [],
  getNewsList: function () {
    console.log(".. model > getNewsList");
    return this.newsList;
  },
  setNewsList: function (data) { // == saveAllNewsList
    console.log(".. model > setNewsList ^ dispatcher.emit changeNewsList [", data, "]");
    this.newsList = data;
    ns.dispatcher.emit({
      "type": "changeNewsList"
    }, [data]);
  },
  removeCurrentNewsData: function (title) {
    console.log(".. model > removeCurrentNewsData ^ changeNewsList [", this.newsList, "]");
    var current = 0;
    var currentTitle = "";
    for (var i = 0; i < this.newsList.length; i++) {
      if (this.newsList[i].title == title) {
        current = i;
        currentTitle = this.newsList[i].title;
        break;
      }
    }
    this.newsList.splice(current, 1);
    ns.dispatcher.emit({
      "type": "changeNewsList"
    }, [this.newsList]);

    ns.dispatcher.emit({
      "type": "removeDB"
    }, []);
  }
}; //모델 객체, 데이터 관련 함수들을 모음

/**************************************************************/

ns.view = {}; //뷰 객체, 빈객체로 두고 기능은 아래 header, list, content에서 구현
ns.view.header = {}; //header에 관련된 기능들을 모은다
ns.view.list = {
  selectedTitle: 0,
  init: function () {
    console.log(".. view.list > init ^ selectList");
    this.selectList();
  },
  selectList: function () {
    console.log(".. view.list > selectList");
    document.querySelector(".mainArea ul").addEventListener("click", function (e) {
      var li_list = e.target.parentNode.children;
      var selectedTitleIndex = Array.prototype.indexOf.call(li_list, e.target);
      console.log(".. view.list > selectList > E:click", selectedTitleIndex);
      this.selectedTitle = selectedTitleIndex;
      console.log(this.selectedTitle);
      var li_list_length = li_list.length;
      for (var i = 0; i < li_list_length; i++) {
        if (i != this.selectedTitle) {
          li_list[i].className = "";
        } else {
          li_list[i].className = "selected";
        }
      }
      ns.dispatcher.emit({
        "type": "select_func"
      }, [this.selectedTitle]);
    });
  },
  renderView: function (data) {
    console.log(".. view.list > renderView / data=", data);
    var li_html = "";
    var data_length = data.length;
    for (var i = 0; i < data_length; i++) {
      li_html += "<li>" + data[i].title + "</li>";
    }
    this.listParent.innerHTML = li_html;
    //this.listParent는 listView객체를 만들때 object.assign을 통해 객체로 복사된 프로퍼티
  }
}; //list에 관련된 기능들을 모은다

ns.view.content = {
  init: function () {
    this.xEvnet();
  },
  renderView: function (data) {
    if (toString.call(data) == "[object Array]") data = data[0];
    console.log(".. view.content > renderView / data=", data);
    var data_newsList = [data.news1, data.news2, data.news3, data.news4, data.news5];
    var template = document.querySelector("#newsTemplate").innerHTML;
    var result = template.replace(/{title}/, data.title).replace(/{imgurl}/, data.imgurl);

    var newsList = data_newsList.reduce(function (prev, next) {
      return prev + "<li>" + next + "</li>"
    }, "");

    result = result.replace(/{newsList}/, newsList);
    this.contentArea.innerHTML = result;

  },
  xEvnet: function () {
    console.log(".. view.content > xEvnet");
    var content = this.contentArea;
    content.addEventListener("click", function (e) {
      if (e.path[1].className == "title" && e.path[0].nodeName == "BUTTON") {
        console.log(".. view.content > xEvnet > E:click ", e.path[1].className);
        ns.dispatcher.emit({
          "type": "removeData"
        }, [content.querySelector(".newsName").innerHTML]);
      }
    }.bind(this));
  }
};

ns.view.sub = {
  titleList: [],
  init: function (titlelist) {
    console.log(".. view.sub > init / titlelist=", titlelist);
    this.titleList = titlelist;
    this.renderView();
  },
  renderView: function () {
    console.log(".. view.sub > renderView");
    var title = [];
    var titleList_length = this.titleList.length;
    for (var i = 0; i < titleList_length; i++) {
      title[i] = this.titleList[i].title;
    }
    var result = title.reduce(function (prev, next) {
      return prev + "<li>" + next + "<input type=\"checkbox\"></li>"
    }, "");
    document.querySelector(".sub ul").innerHTML = result;
  }
}
//어떠한 행동일때 어떤 일을 할지 모은다. 디스패쳐 register를 통해 디스패쳐를 통해 실행할 수 있도록 한다.

/**************************************************************/

ns.controller = {
  join: function () {
    /*
      register: function (fnlist) {
        this.fnlist = fnlist;
      },
    */
    ns.dispatcher.register({
      "removeData": function (title) {
        console.log(".. controller > join > removeData");
        this.model.removeCurrentNewsData(title);
      }.bind(this),
      //View
      "initView": function (data) {
        console.log(".. controller > join > initView ^ this.model.setNewsList(", data, ")");
        this.model.setNewsList(data);
      }.bind(this),

      "select_func": function (selectedTitle) {
        console.log(".. controller > join > select_func");
        var newsData = this.model.getNewsList();
        this.contentView.renderView(newsData[selectedTitle]);
      }.bind(this),

      //Model
      "changeNewsList": function (data) {
        console.log(".. controller > join > changeNewsList ^ this.listView.renderView(", data, ")");
        this.listView.renderView(data);
        console.log(".. controller > join > changeNewsList ^ this.contentView.renderView(", data, ")");
        this.contentView.renderView(data);
      }.bind(this),

      "removeDB": function () {
        ns.util.removeAjax("http://localhost:3000/removeData_ajax");
      },

      "initSubView": function (titlelist) {
        console.log(".. controller > join > initSubView / titlelist=", titlelist);
        this.subView.init(titlelist);
      }.bind(this)
    });
  }
};

/**************************************************************/

document.addEventListener("DOMContentLoaded", function () {
  console.log("1nd DOMContentLoaded");

  /** Object.assign?
    Object.assign(target, ...sources)
    열거할 수 있는 하나 이상의 소스 오브젝트로 부터 타켓 오브젝트로 프로퍼티들을 복사하는데 사용
  */
  var model = Object.assign(Object.create(ns.model), {});
  var headerView = Object.assign(Object.create(ns.view.header), {});
  var listView = Object.assign(Object.create(ns.view.list), {
    listParent: document.querySelector(".mainArea nav ul")
  });
  var contentView = Object.assign(Object.create(ns.view.content), {
    contentArea: document.querySelector(".content")
  });

  var subView = Object.assign(Object.create(ns.view.sub), {});

  var controller = Object.assign(Object.create(ns.controller), {
    model: model,
    headerView: headerView,
    listView: listView,
    contentView: contentView,
    subView: subView
  });
  console.log(".. 1nd DOMContentLoaded > create object : model,headerView,listView,contentView,controller");

  //headerView.init();
  listView.init();
  contentView.init();
  controller.join();
  console.log(".. 1nd DOMContentLoaded > controller.join()");
});

document.addEventListener("DOMContentLoaded", function () {
  console.log("2nd DOMContentLoaded");
  //
  ns.util.modelAjax("http://localhost:3000/getSubData_ajax", function (titlelist) {
    ns.dispatcher.emit({
      "type": "initSubView"
    }, [titlelist]);
  });
  //
  ns.util.modelAjax("http://localhost:3000/getData_ajax", function (result) {
    ns.dispatcher.emit({
      "type": "initView"
    }, [result]);
  });
});

document.querySelector(".show").addEventListener("click", function(e){
  if(e.target.className == "showSub"){
    document.querySelector(".mainArea").style.display = "none";
    document.querySelector(".sub").style.display = "block";
  }else if(e.target.className == "showNews"){
    document.querySelector(".mainArea").style.display = "block";
    document.querySelector(".sub").style.display = "none";
  }
});