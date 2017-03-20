Node.js
=====
인프런, Node.js 웹개발로 알아보는 백엔드 자바스크립트의 이해  

.  
.  
.  

NPM PROJECT 시작하기
-----

**사용하기 위한 기본 설정**  
1. cd .. 디렉토리 이동  
2. npm init 을 통해 이름, 설명 등 작성
3. pakage.json 이라는 파일이 생성됨, 여기에는 Node.js 사용을 위한 기본 설정이 들어있다.

-----
.  
.  


express 기반 웹서버 구동
-----
**express 설치**
1. npm install express --save   
//--save 설치된 정보를 pakage.json에 넣어둬서 나중에 이 프로젝트를 사용할 사람도 이것이 설치되도록하는 것, 의존 사항을 기술해두는 것.
2. 프로젝트 폴더에 설치한 express에 해당하는 파일(폴더)가 추가, pakage.json 수정됨

**app.js**
```js
var express = require('express'); //express에 관련된 파일을 가져온다.
var app = express(); //함수 실행, 반환값 또는 함수 정보를 app 변수에 담는다.
app.listen(3000, function(){ //listen은 3000 포트넘버를 기준으로 함수 실행한다
  console.log("start! express server on port 3000");
})
```
3. console에서 node app.js 명령어를 치면 start~3000이 출력된다.  

+ localhost == 127.0.0.1

-----

```js
var express = require('express'); //express에 관련된 파일을 가져온다.
var app = express(); //함수 실행, 반환값 또는 함수 정보를 app 변수에 담는다.
app.listen(3000, function(){ //listen은 3000 포트넘버를 기준으로 함수 실행한다
  console.log("start! express server on port 3000");
})
console.log("end of server code...");
```
node app.js 명령을 통한 출력
```
end of server code...
start! express server on port 3000
```

Node는 비동기로 동작, 서버가 동작될떄까지 기다리는게 아닌 밖이 실행되고 안이 나중에 실행된다.  
즉 동기적인 코드가 실행되고 마지막에 비동기 코드가 실행된다.

-----

**nodemon**  
npm install nodemon -g  
//-g 내 PC의 어느 곳에서든 사용할 수 있도록 설치 global  
//권한 문제시 sudo 명령어 추가

>node app.js 대신 nodemon app.js 를 하면
>수정사항이 저장되면 반영하여 자동으로 서버를 다시 시작해줌

-----

.  
.  

Url Routing 처리
-----
```js
var express = require('express'); //express에 관련된 파일을 가져온다.
var app = express(); //함수 실행, 반환값 또는 함수 정보를 app 변수에 담는다.
app.listen(3000, function(){ //listen은 3000 포트넘버를 기준으로 함수 실행한다
  console.log("start! express server on port 3000");
})

app.get('/', function(req, res){ // / 로 get요청이 왔을때, 함수 실행
  //res.send("<h1>hi friend</h1>");
  res.sendFile(__dirname + "/public/main.html");
  //__dirname : 최상위 디렉토리를 나타내는 노드의 변수
}); //get요청, 콜백함수
```

-----

.  
.  

static 디렉토리 설정
-----
지금까지는 main.html을 서버로 보냈는데, main.html 안에 main.js 파일이 스크립트로 추가가 되어있다고한다면 노드는 main.js를 못불러온다.   
main.js 또한 경로 설정을 해줘야 할텐데 자바스크립트,이미지 같은 파일을 정적인 파일, 스태틱파일이라고 한다.  
이런것들은 서버에서 바로바로 요청받는데로 처리하는 것이 좋다.  
그래서 스태틱파일을 지정, 어떠한 요청이 오면 바로 처리하게 하도록 하는 것을 어떻게 하는지 보자.
```js
var express = require('express');
var app = express(); 
app.listen(3000, function(){ 
  console.log("start! express server on port 3000");
})

app.use(express.static('public')); //public 디렉토리를 static 으로
app.use(express.static('images'));

app.get('/', function(req, res){
  res.sendFile(__dirname + "/public/main.html");
});

// /뿐만 아니라 /main으로도 main.html에 접근 가능
app.get('/main', function(req, res){ 
  res.sendFile(__dirname + "/public/main.html");
});
```