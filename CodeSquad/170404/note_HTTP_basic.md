# HTTP

### 인터넷과 웹

웹 = WWW = World Wide Web

웹의 3요소

> HTTP
>
> HTML
>
> URL (HTML 의 주소)

HTTP = HiperText Transfer Protocol. 

WWW 상에서 정보를 주고 받을 수 있는 프로토콜, 

주로 HTML을 주고받는데 쓰이며 TCP와 UDP 사용, 80 포트 사용, 

application 계층에 속한다.



- 클라이언트: 주로 웹 브라우저로 항상 요청만 한다.
- 프록시 : 클라이언트와 서버 사이에 존재, 무언가 일을 해준다
  - 캐싱, 필터링, 로드 밸런싱, 인증, 로깅 등의 다양한 기능 수행
- 서버 : 클라이언트의 요청에 대해 적당한 문서를 제공해 준다.

-----

### HTTP의 특징

- 간단
- 확장 가능
- 상태가 없다 = stateiess
- 세션은 존재 = 쿠키를 이용해(HTTP가 아닌...)
- HTTP1 —> HTTP/1.1 —> HTTP/2 로 발전


#### 파이썬으로 웹 서버 띄우기

```
python -m SimpleHTTPServer // python version 2
python -m http.server //python version 3
python // version check
```



#### telnet 으로 띄우기

telnet 127.0.0.1 8000

GET / HTTP/1.0

Host: localhost:8000 // 작성 후에는 엔터 두번으로 실행

```
HTTP/1.0 200 OK
Server: SimpleHTTP/0.6 Python/2.7.10
Date: Tue, 04 Apr 2017 01:55:45 GMT
Content-type: text/html
Content-Length: 294
Last-Modified: Tue, 04 Apr 2017 01:50:40 GMT

...html code...
```



-----

### HTTP 동작방식

먼저 사용자가 URL을 입력 브라우저가 해당 URL을 HTTP request라는 것으로 서버로 보냄, 서버가 정보를 토대로 분석하여 클라이언트에게 response를 보냄, 이것 역시 HTTP 프로토콜에 의해서 클라이언트에게 반환됨, 그리고 브라우저는 다시 적절한 모습으로 변환하여 사용자에게 보여줌.

URL을 전달해주나 실제로는 DNS가 개입하여 도메인네임을 ip로 변환해 전달하는 과정이 있다.

#### HTTP Request 메세지의 구조

![](https://www.ntu.edu.sg/home/ehchua/programming/webprogramming/images/HTTP_RequestMessageExample.png)

Request headers 확인은 브라우저 개발자도구 네트워크에서 확인해볼 수 있다.

크게 request header, message body로 나뉜다.

Input, image 등 서버에 전달해줘야하는 것들은 message body에 담긴다.



#### HTTP Response 메세지의 구조

![](https://www.ntu.edu.sg/home/ehchua/programming/webprogramming/images/HTTP_ResponseMessageExample.png)

받을때는 status line. 



#### 브라우저의 동작

- 최초에는 html을 가져옴
- html에서 css, js, image에 대한 링크 정보를 추출
- 추출한 정보의 url을 이용 새로운 요청을 보냄
- 모든 웹 자원을 받아와서 렌더링 시작
- 1.1은 파이프라인, 2.0은 병렬처리로 성능 개선

![](https://kemptechnologies.com/files/solutions/loadmaster-http/2/loadmasterhttp2multiplexing.png)



#### URL : Uniform Resource Locator

URI = URL + URN

리소스를 식별하는 주소

> 스킴:사용자이름:비번@호스트:포트/경로;패러미터?쿼리#프래그먼트

```
https://junho:pw123@github.com:443/junho/MMT?file=sum.py#30
```

https=스킴, 사용자이름과 비번은 optional이라 잘 사용하지 않는다, http 80, https 443이 기본 포트, 프래그먼트는 클라이언트만 사용하는 것.



-----

#### 포맷

[MIME(Multipurpose internet Mail Extensions) 타입][1]으로 포맷을 분류, 원래는 전자 우편을 위한 표준이었다.

```
Content-Type:
text/plain
text/html
text/css
image/jpeg
image/png
audio/mpeg
audio/ogg
audio/*
video/mp4
application/octet-stream
multipart/mixed
```



form에서 대용량 파일을 전송할 때는 multipart/fome-data 라는 걸 사용한다.**



#### HTTP 4계층 모델

![](https://www.maketecheasier.com/assets/uploads/2013/11/internetprotocol-https.png)

Network == Hardwere



#### TCP의 3-way Handshake

![](http://pds25.egloos.com/pds/201406/05/72/d0000972_5390555ad4d58.png)



TCP를 사용해서 처음 연결(connection)을 생성할 때 3-way handshake를 합니다.

보낸다, 받는다-잘받았다, 잘받았다는 사실을 보낸다(3way) 그리고 연결을 끊는다.

계속해서 이러한 과정을 반복해야하므로 좋지 않다, 최근에는 

http 1.1 부터 keep-alive를 지원하는데 HTTP request에 keep-alive를 요청하면 서버는 데이터 전송을 완료한 후에도 일정시간 연결을 끊지 않고 대기한다.



- Http1.0  / http1.0+ keep alive _[출처][2]

```
HTTP/1.0
브라우저가 매 요청마다 웹 서버와 TCP Session(Socket Connection 3-Way Handshake)을 생성한다.
요청한 작업을 수행하고 TCP Session(Socket Connection Close)을 종료한다.
아주 작은 단위나 반복되는 작업마다 TCP Session을 연결하고 닫는 작업을 해야하기 때문에 비효율적이다.

HTTP/1.0+ - Keep-Alive
브라우저가 요청을 하면 웹 서버와 TCP Session(Socket 연결)을 생성한다.
서버와 클라이언트 모두 헤더(Http Header)에 Connection : Keep-Alive를 포함시켜 연결을 지속적으로 유지한다.
Keep-Alive가 없는 경우에 연결을 종료시킨다.
Keep-Alive가 매번 헤더(Http Header)에 포함되어야 하는 단점이 있다.
```



#### HTTP method

GET, HEAD, PUT, POST … 등이 있다. GET과 POST를 주로 많이 사용한다.

##### GET vs POST

- GET
  - GET을 사용하면 URL 뒤에 쿼리스트링으로 패러미터를 전달
  - 구글 주소창에서 검색을 하면?
- POST
  - POST는 요청 바디에 숨겨져 보내짐
  - form을 이용한 대용량 파일 전송



#### HTTP status codes

![](https://s-media-cache-ak0.pinimg.com/originals/60/26/cd/6026cdc3ee1c4fbbab9bd3ddc549f2b2.gif)



-----

#### 로그인 상태란 어떤 상태일까?

HTTP는 stateless이다.

그래서 쿠키와 같은 방법을 사용한다.

#### 사용자 식별 - 인증을 위한 방법

- IP 추적
- HTTP Authentication
- URL에 식별자 포함
- Cookie // 가장 많이 사용하는 방법

#### 쿠키

![](https://docs.microsoft.com/en-us/aspnet/web-api/overview/advanced/http-cookies/_static/image1.png)

- 쿠키의 용도
  - 세션관리
  - 개인화 (예 : 장바구니)
  - 트래킹

브라우저가 처음에 주소창에 무엇을 요청하면 서버가 사용자 식별할 필요가 있다면 set cookie라는 명령을 내려 너는 session-id-123 이다 라고 전달하여 그리하면 클라이언트는 쿠키를 세팅하게 되고 그 다음부터 요청을 보낼때는 쿠키값을 담아서 보내게 된다. 그리하면 서버는 그것을 통하여 식별하고 거기에 맞는 정보를 보내주면 된다.

로그인 전에는 request header에 아무런 정보가 없다가 로그인을 하게되면 set-cookie가 생기는 것을 볼 수 있다.

쿠키값으로 세션을 관리 할 수 있게 된다.



#### Session

![](http://cscie12.dce.harvard.edu/lecture_notes/2007-08/20080423/images/http_session_cookie_illustration.png)

1. HTTP client에서 POST 요청으로 로그인 정보를 보낸다.
2. HTTP server에서 DB를 통해 확인하고 session id를 생성 cookie에 저장, DB에 세션 정보 저장, HTTP Client로 전달
3. HTTP client는 세션 아이디를 쿠키에 저장
4. 연결 끊김
5. 클라이언트에서 요청을 보낼때 쿠키값을 전달
6. 서버에서는 데이터베이스를 뒤져 세션 정보를 기준으로 확인하여 응답을 보낸다.


-----

[1]: https://developer.mozilla.org/ko/docs/Web/HTTP/Basics_of_HTTP/MIME_types
[2]: https://nesoy.github.io/articles/2017-03/Session-Cookie