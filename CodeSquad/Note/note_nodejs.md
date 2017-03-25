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

----------

Post 요청 처리
-----

-html
```html
<form action="/email_post" method="post">
  email : <input type="text" name="email"></br>
  <input type="submit">
</form>
```

POST : HTTP Method , URL에 담겨져 있는 것이 아니다, 때문에 길이 제한이 없고 보안적인 측면이 강하다.  


body parser 설치  
post방식으로 보내고 받으려면 필요함  
```
npm install body-parser --save
```
-js
```js
var express = require('express'); //express에 관련된 파일을 가져온다.
var app = express(); //함수 실행, 반환값 또는 함수 정보를 app 변수에 담는다.
var bodyParser = require('body-parser');

app.listen(3000, function(){ 
  console.log("start! express server on port 3000");
});

app.use(express.static('public')); //public 디렉토리를 static 으로

//bodyparser를 쓰겠다고 express에게 알려주는...
app.use(bodyParser.json()); //json으로 올때
app.use(bodyParser.urlencoded({extended:true})); //json이 아닌 포스트로 올때
//아스키형식으로 받는데, 인코딩을 해줘서 받아오는...

app.get('/', function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.post('/email_post', function(req, res){
  // get : req.param('email'); //get 방식 받아오는 방법.
  res.send("welcome "+req.body.email);
});
```

----------
.  
.  

view engine을 활용한 응답처리
-----

express와 결합해서 사용할 템플릿 ejs 설치
ejs는 <%= email %> 과 같은 방식을 사용한다.
```
npm install ejs --save 
```

js
```js
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.listen(3000, function(){ 
  console.log("start! express server on port 3000");
});

app.use(express.static('public'));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended:true})); 


app.set('view engine', 'ejs');
/*^^^^^^^^^^^^^^^^^^^^^^^^^^^*/

app.get('/', function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.post('/email_post', function(req, res){
  //res.send("welcome "+req.body.email);
  res.render('email.ejs', {'email' : req.body.email});
  /*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*/
});
```

-ejs
```html
<body>
  <h1>Welcome !! <%= email %> </h1>
</body>
```

----------
.  
.  

JSON 활용한 AJAX처리
-----

-js
```js
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.listen(3000, function () {
  console.log("start! express server on port 3000");
});

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post('/email_post', function (req, res) {
  res.render('email.ejs', {
    'email': req.body.email
  });
});

app.post('/ajax_send_email', function (req, res) {
  console.log(req.body.email)
  var responseData = {'result' : ok, 'email' : req.body.email}
  res.json(responseData)
})
```

-html
```html
<body>
  <form action="/email_post" method="post">
    email : <input type="text" name="email"></br>
    <input type="submit">
  </form>
  <button class="ajaxsend">ajaxsend</button>
  <div class="result"></div>

  <script>
    document.querySelector('.ajaxsend').addEventListener('click', function () {
      var inputdata = document.forms[0].elements[0].value;
      sendAjax('/ajax_send_email', inputdata)
    });

    function sendAjax(url, data) {
      var data = {
        'email' : data
      };
      data = JSON.stringify(data);
      //오브젝트는 서버로 넘길 수 없으니 문자열 형태로 서버로 넘겨야 한다.
      var xhr = new XMLHttpRequest();
      xhr.open('POST', url);
      xhr.setRequestHeader('Content-Type', "application/json");
      //서버로 JSON형태의 데이터를 보낼때는 이것을 써주는게 좋다
      xhr.send(data);

      xhr.addEventListener('load', function () {
        var result = JSON.parse(xhr.responseText);
        if (result.result === "ok") return;
        document.querySelector(".result").innerHTML = result.email;
      })
    }
  </script>
</body>
```

----------
.  
.  
mysql 
-----

mysql -u root -p
use jaman;
insert into user (email, name, pw) values ('crong@naver,com','crong','asdf');
select * from user;
npm install mysql --save //express에서 사용할 수 있게 된다

-html
```html
<html>

<head>
  <meta charset="utf-8">
</head>

<body>
  <form action="/email_post" method="post">
    email : <input type="text" name="email"></br>
    <input type="submit">
  </form>
  <button class="ajaxsend">ajaxsend</button>
  <div class="result"></div>

  <script>
    document.querySelector('.ajaxsend').addEventListener('click', function () {
      var inputdata = document.forms[0].elements[0].value;
      sendAjax('/ajax_send_email', inputdata)
    });

    function sendAjax(url, data) {
      var data = {
        'email' : data
      };
      data = JSON.stringify(data);
      //오브젝트는 서버로 넘길 수 없으니 문자열 형태로 서버로 넘겨야 한다.
      var xhr = new XMLHttpRequest();
      xhr.open('POST', url);
      xhr.setRequestHeader('Content-Type', "application/json");
      //서버로 JSON형태의 데이터를 보낼때는 이것을 써주는게 좋다
      xhr.send(data);

      xhr.addEventListener('load', function () {
        /*--------------------------------------------------------*/
        var result = JSON.parse(xhr.responseText);
        var resultDiv = document.querySelector(".result");
        if (result.result === "ok") resultDiv.innerHTML = "your email is not found";
        else resultDiv.innerHTML = result.name;
        /*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*/
      })
    }
  </script>
</body>

</html>
```

-js
```js
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');
/*/////////////////////////////////////////*/
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'database',
  port: 3306
})

connection.connect()
/*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*/

app.listen(3000, function () {
  console.log("start! express server on port 3000");
});

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post('/email_post', function (req, res) {
  res.render('email.ejs', {
    'email': req.body.email
  });
});

app.post('/ajax_send_email', function (req, res) {
  //var responseData = {'result' : ok, 'email' : req.body.email}
  var email = req.body.email;
  var resonseData = {};

  var query = connection.query('select name from user where email="' + email + '"', function (err, rows) {
    if (err) throw err;
    if (rows[0]) {
      responseData.result = "ok";
      responseData.name = row[0].name;
    } else {
      responseData.result = "none";
      responseData.name = "";
    }
  })
  res.json(responseData);
})
```

----------
.  
.

routing 모듈화
-----

url 처리 부분 따로 빼기.

-새로운 js 파일
```js
var express = require('express');
var app = express();
var router = app.Router();
var path = require('path');

router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + "../index.html"); //상대경로 사용
});

module.exports = router; //이 파일을 다른 곳에서 쓸 수 있다
```

-기존 js 파일
```js
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');

var main = require('.router/main'); //새로운 js 파일 경로
/*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*/

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'database',
  port: 3306
})

connection.connect()


app.listen(3000, function () {
  console.log("start! express server on port 3000");
});

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/main', main); //main으로 들어오면 main.js를 사용하라
/*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*/

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post('/email_post', function (req, res) {
  res.render('email.ejs', {
    'email': req.body.email
  });
});

app.post('/ajax_send_email', function (req, res) {
  //var responseData = {'result' : ok, 'email' : req.body.email}
  var email = req.body.email;
  var resonseData = {};

  var query = connection.query('select name from user where email="' + email + '"', function (err, rows) {
    if (err) throw err;
    if (rows[0]) {
      responseData.result = "ok";
      responseData.name = row[0].name;
    } else {
      responseData.result = "none";
      responseData.name = "";
    }
  })
  res.json(responseData);
})
```

----------
.  
.  

Routing 모듈화 2 (DB연결부분)
-----

라우팅(컨트롤러)처리 코드를 nodeJS 모듈화를 통해 분리하는 방법을 안다.

라우터 폴더에 새로운 js파일 추가(email.js)
```js
var express = require('express');
var app = express();
var router = app.Router();
var path = require('path');

var mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'database',
  port: 3306
})
/*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*/

router.post('/form', function (req, res) {
  res.render('email.ejs', {
    'email': req.body.email
  });
});

router.post('/ajax', function (req, res) {
  //var responseData = {'result' : ok, 'email' : req.body.email}
  var email = req.body.email;
  var resonseData = {};

  var query = connection.query('select name from user where email="' + email + '"', function (err, rows) {
    if (err) throw err;
    if (rows[0]) {
      responseData.result = "ok";
      responseData.name = row[0].name;
    } else {
      responseData.result = "none";
      responseData.name = "";
    }
  })
  res.json(responseData);
})

module.exports = router; //이 파일을 다른 곳에서 쓸 수 있다
```


-기존 js파일
```js
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var main = require('./router/main');
var email = require('./router/email'); //새로운 js 파일 경로



connection.connect()


app.listen(3000, function () {
  console.log("start! express server on port 3000");
});

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/main', main); //main으로 들어오면 main.js를 사용하라
app.use('/email',email)

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
```

-html
```html
<body>
  <form action="/email_post" method="post">
    email : <input type="text" name="email"></br>
    <input type="submit">
  </form>
  <button class="ajaxsend">ajaxsend</button>
  <div class="result"></div>

  <script>
    document.querySelector('.ajaxsend').addEventListener('click', function () {
      var inputdata = document.forms[0].elements[0].value;
      sendAjax('/email/ajax', inputdata)
      /*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*/
    });

    function sendAjax(url, data) {
      var data = {
        'email' : data
      };
      data = JSON.stringify(data);
      //오브젝트는 서버로 넘길 수 없으니 문자열 형태로 서버로 넘겨야 한다.
      var xhr = new XMLHttpRequest();
      xhr.open('POST', url);
      xhr.setRequestHeader('Content-Type', "application/json");
      //서버로 JSON형태의 데이터를 보낼때는 이것을 써주는게 좋다
      xhr.send(data);

      xhr.addEventListener('load', function () {
        var result = JSON.parse(xhr.responseText);
        var resultDiv = document.querySelector(".result");
        if (result.result === "ok") resultDiv.innerHTML = "your email is not found";
        else resultDiv.innerHTML = result.name;
      })
    }
  </script>
</body>
```

----------
.  
.  

Routing 리팩토링
-----

모듈화된 라이팅 코드를 통합하는 컨트롤러를 만들 수 있다.

-기존 js
```js
var express = require('express');
var app = express();
var bodyParser = require('body-parser');


var router = require('./router/index');
/*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*/
connection.connect()

app.listen(3000, function () {
  console.log("start! express server on port 3000");
});

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(router);
/*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*/

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
```


라우터 하위에 새로 js파일 추가(index.js)
```js
var express = require('express');
var app = express();

var router = express.Router();
var path = require('path');

var main = require('./main');
var email = require('./email');
/*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*/
router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + "../index.html");
});

router.use('/main', main)
router.use('/email',email)

module.exports = router;
```

views라는 폴더는 express 에서 정해져있는 역활의 폴더.  