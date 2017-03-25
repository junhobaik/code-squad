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
    //console.log(rows);
    res.json(rows);
  });

});

app.post('/test_ajax', function (req, res) {
  var jsonObj = [];
  var req_length = req.body.length;

  var query_str = "";
  for (var i = 0; i < req_length; i++) {
    if (i === 0) {
      query_str += "select * from newslist where title in('" + req.body[i].title + "'";
    } else query_str += ",'" + req.body[i].title + "'";
  }
  query_str += ")";
  console.log(".. post '/test_ajax' query=",query_str);
  var query = connection.query(query_str, function (err, rows) {
    res.json(rows);
  });

});

/****************************************************************************************************/

app.listen(3000, function () { // listen은 항상 아래에 두는 것이 좋다
  console.log("\n" + new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds() + " /start server!");
});

/*
첫 구독 화면에서 DB에 있는 언론사를 노출한다
구독 선택을 기준으로 다시 화면에 뿌려준다.
구독을 헤제(엑스누름)을 하면 기준으로 다시 뿌려준다.
구독 화면에서 삭제 버튼을 누르면 DB자체를 삭제한다?
*/