Closure
=======


클로저는 내부함수가 외부함수의 맥락제 접근할 수 있는 것을 가리킨다.  
클로저는 자바스크립트를 이용한 고난이도의 테크닉을 구사하는데 필수적인 개념으로 활용된다.


----------


**- 내부함수, 외부함수**

함수 안에서 또 다른 함수를 선언.  

```js
function outter(){  
function inner(){  
var test = "TEST";  
console.log(test);  
} //var inner = function(){console.log("TEST");} 와 같다.  
inner();  
}  
outter(); //TEST 출력
```

```js
function outter(){
var test = "TEST"
function inner(){
console.log(test);
} //var inner = function(){console.log("TEST");} 와 같다.
inner();
}
outter(); //TEST 출력
```
내부 함수 inner 는 외부함수 outter 의 test 변수에 접근 할 수 있어 TEST가 정상적으로 출력된다.
내부 함수는 외부 함수의 지역변수에 접근 할 수 있기 때문이다.


----------


**- Closure ?**

클로저는 내부함수와 밀접한 관계를 가지고 있는 주제,  
내부함수는 외부함수의 지역변수에 접근 할 수 있는데,  
외부함수의 실행이 끝나서 외부함수가 소멸된 이후에도 내부함수가 외부함수의 변수에 접근 할 수 있다.  
이러한 매커니즘을 클로저라고 한다.


```js
function outter(){
var title = "TEST";
return function(){
console.log(title);
}
}
```
inner = outter(); //outter의 함수 호출, 즉 호출되고 함수 소멸  
inner(); //외부함수인 outter는 위에서 호출되고 소멸되었음에도 외부함수 title의 값을 출력하고 있다.  


```js
function titleFunc(title){
return {
get_title : function() {
return title;
},
set_title : function(_title) {
title = _title
}
}
}
```


titleFunc 함수는 객체를 반환하고 있다.  
그 객체 안에는 두개의 메소드 프로퍼티가 존재한다.  

titleFunc는 외부함수, 객체 안의 메소드들은 내부함수라고 할 수 있다.  
즉 여기서는 객체 안의 내부함수들은 외부함수 titleFunc로 전달된 title(지역변수)에 접근 할 수 있다.  
get_title은 지역변수를 리턴  
set_title은 지역변수를 받아와 지역변수의 값을 변경한다.  

```js
one = titleFunc('title one');
two = titleFunc('title two');

one.get_title(); // title one
two.get_title(); // title two

one.set_title('title one change');
one.get_title(); //title one change
tow.get_title(); //title two
```

titleFunc를 통해 두개의 객체(one, two)를 만들었고,  
그 두개의 객체는 각각 자신이 실행된 그 시점에서의 외부함수의 지역변수에 접근 할 수 있었고,  
그 지역변수는 유지되고 있기 때문에,  
생성된 객체(one)의 함수를 통해 접근하면 그 객체(one)가 접근 할 수 있는 지역변수(title one)의 값만을 제어한다.  

이렇게 하면 one객체를 통해서만 one의 get_title, set_title이란 함수를 통해서만 title값을 제어하기 떄문에  
아무곳에서나 title의 값을 제어할 수 없도록 할 수 있는 장점이 있다.  

<br><br><br>
다른 경우를 살펴보자

아래 코드의 기대하는 실행 결과는 0 1 2 3 4 였으나,
실행 결과는 5 5 5 5 5
```js
var arr = []
for(var i = 0; i < 5; i++){ //이 i의 값은 아래 정의한 함수의 외부 함수의 변수가 아니기 때문이다.
    arr[i] = function(){
        return i;
    }
}
for(var index in arr) {
    console.log(arr[index]());
}
```

```js
var arr = []
for(var i = 0; i < 5; i++){
    arr[i] = function(id){ //1. 외부함수 정의, 외부함수는 내부함수를 리턴한다.
return function(){ //3. 내부함수에서 외부함수의 지역변수 i(외부함수 호출시에 전달된 i값)에 접근하여 리턴
                return id;
         }      
}(i); //2.외부 함수에 i 값 전달
}
for(var index in arr) {
    console.log(arr[index]());
}
```


let 을 사용하여 개선할 수도 있다.
```js
var arr = []
for(let i = 0; i < 5; i++){
    arr[i] = function(){
        return i;
    }
}
for(var index in arr) {
    console.log(arr[index]());
}
```