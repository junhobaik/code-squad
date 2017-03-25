var express = require('express'); //Express
var app = express(); //Express
var bodyParser = require('body-parser'); //bodyParser
var mysql = require('mysql'); //mysql
var connection = mysql.createConnection({ //mysql connection
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'bjh0324',
  database: 'news'
});
connection.connect(function (err) { //mysql connection
  if (err) {
    console.log("! mysql connection error");
    console.log(err);
    throw err;
  } else {
    console.log("* mysql connection success");
  }
});
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', function (req, res) {
  console.log(".. get '/' > main.html");
  res.sendFile(__dirname + "/public/main.html");
});

app.post('/getData_ajax', function (req, res) {
  console.log(".. post '/getData_ajax'");
  var query = connection.query('select * from newslist', function (err, rows) {
    res.json(rows);
  });
});

app.post('/removeData_ajax', function (req, res) {
  console.log(".. post '/removeData_ajax' req.body.title=",req.body.title);
  res.send(); //반응을 해주지 않으면 계속해서 pendding 상태에 머뭄
  //delete from 테이블명 where 속성='값';
});

app.post('/getSubData_ajax', function (req, res) {
  console.log(".. post '/getSubData_ajax'");
    var query = connection.query('select title from newslist', function (err, rows) {
    res.json(rows);
  });
});

/****************************************************************************************************/

app.listen(3000, function () { // listen은 항상 아래에 두는 것이 좋다
  console.log("\n" + new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds() + " /start server!");
});