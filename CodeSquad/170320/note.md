170320
=====



----------

MVC 개선시키기
-----

**VIEW**  
VIEW 자신의 변화에 집중.  
다른 VIEW나 MODEL에 직접 접근을 자제  

**MODEL**  
데이터의 getter, setter 역할로 끝  
VIEW에 직접적인 접근을 자제  

**CONTROLLER**  
VIEW나 MODEL의 변화에따라 해야할 일을 등록  
어떠한 경우에 어떤 것이 실행되는지, 뷰의 변화가 있을때 모델의 변화가 있을 것으로 가정,  
모델에 변화를 주고...  

**DISPATCHER**  
변화가 발생시 미리 가지고 있는 정보를 토대로, 필요할 일을 실행시킴.  
>일종의 Observer pattern을 사용해보자.  

----------

**예제.**  
view에 어떠한 이벤트가 발생했을 때 그것을 알림.  
```js
ns.dispatcher.emit(
{'type' : "afterMoveButton"}, [direction]
);
```
dispatcher는 'afterMoveButton'이라는 행위에 해당하는, 이미 등록된 콜백
함수를 실행.  

아래는 dispatcher에 이미 등록된 콜백함수.
```js
"afterMoveButton" : function(direction) {
const nextOrder = this._getNextOrder(direction);
this.model.changeCurrentNews(nextOrder);
}.bind(this)
``` 
changeCurrentNews를 호출하면서 model에 변경이 발생.  
model의 changeCurrentNews의 실행으로 데이터에 변경이 발생하고,  
model역시 emit을 통해 변경을 알림.  

```js
changeCurrentNews : function(order) {
this.currentNewsOrder = order;
ns.dispatcher.emit(
{"type" : "changeCurrentPanel"},
[order, this.newsList[order]]
);
},
```

model역시 dispatcher를 통해 액션을 전달하고 등록된 콜백함수가 실행.  
아래는 dispatcher에 이미 등록된 콜백함수.

```js
"changeCurrentPanel" : function (nextOrder, newsObj) {
this.listView.setHighLightTitle(nextOrder);
this.contentView.renderView(newsObj);
}.bind(this)
```
이후에 view에 필요한 변화가 발생.


Simple Dispatcher
와우 !

```js
ns.dispatcher = {
register : function(fnlist) {
this.fnlist = fnlist;
},
emit : function(o,data) {
this.fnlist[o.type].apply(null, data);
}
}
```

Controller  
model과 view를 컨트롤해주고 연결해주는 역할만 수행.  

```js
join : function() {
ns.dispatcher.register({
//View Event
"initView" : function(result) {
this.model.saveAllNewsList(result);
}.bind(this),
"afterMoveButton" : function(direction) {
const nextOrder = this._getNextOrder(direction);
this.model.changeCurrentNews(nextOrder);
}.bind(this),
"changeCurrentNews" : function(order) {
this.model.changeCurrentNews(order);
}.bind(this),
"changeNewsList" : function(result) {
this.listView.renderView(result);
this.contentView.renderView(result[0]);
}.bind(this),
....
```

namespace

```js
ns.dispatcher
ns.model
ns.controller
ns.view.header
ns.view.list
ns.view.content
```

private 변수나 함수를 만들기.
Module pattern.
```js
var myModel = (function() {
const _join = function(name) {return _data + name};
const _data = "hello, ";
const modelObj = {
getPrivateData : function() {return _data},
getName : function() {return this.name},
setName : function(name) {
this.name = _join(name);
}
};
const model = Object.assign(Object.create(modelObj))
return model;
})();
```

예제 전체 소스를 살펴보자  
Domcontentloaded가 두번 사용됨,  
디스패쳐를 잘 살펴보자.  