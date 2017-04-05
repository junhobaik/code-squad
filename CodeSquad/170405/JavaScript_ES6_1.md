### ES6.
ES6 === ES2015

개선된 JavaScript문법.
ES6  browser compatibility의 훌륭한 지원.
ES6를 기반으로 한 JavaScript 생태계의 확산.

---

### 1. scope enhancements - let

ES6에서는 let 키워드를 사용해서 변수를 선언하면 Block({})단위의 scope를 만들 수 있다.
키워드를 사용하면 됨.

```javascript
var name = 'play ground';
function home() {
  var homeName = 'my house';
  for (let i = 0; i<1000; i++){}
  console.log(i); //i is not defined
}
```
따라서,Block단위로 사용할때는 let을 사용하는 것을 권장.

---
### 2. scope enhancements - const(1/2)
const로 선언된 변수는 값을 재 할당 할 수 없다.

```javascript
function home() {
  const homeName = 'my house';
  homeName = 'your house';
}

home() //TypeError: Assignment to constant variable.
```
---
### 2. scope enhancements - const(2/2)
주의할점은, const를 사용한다고 수정할수 없음을 의미하는 것은 아니다.
const를 사용하더라도 배열과 오브젝트의 값을 변경하는 것은 가능.

```javascript
function home() {
  const list = ['john', 'adele', 'hary'];
  list.push('tiger');
  return list;
}
home() //["john", "adele", "hary", "tiger"]
```

참고 : immutable array를 만드는 방법.
```javascript
const list = ['john', 'adele', 'hary'];
list2 = [].concat(list, "tiger");
list == list2; //false
```

- [concat mathod][https://msdn.microsoft.com/ko-kr/library/2e06zxh0(v=vs.94).aspx]

---
### 3. String enhancements

[startsWith()][https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith]

endsWith()

includes()

---
### 3. Array enhancements - for/of

```javascript
var arr = [1,2,3,undefined, null, ""];
Array.prototype.getIndex = function() {};

for ( let value of arr) {
  console.log(value);
}

//function까지 노출된다.
for ( let value in arr) {
  console.log(arr[value]);
}
```



결과

```
1
2
3
undefined
null

1
2
3
undefined
null

function () {}
```



for in은 자기 자신이 가지지 않은 것, 추가한 프로토타입까지도 검색을 하기 때문에 느리다, 왠만해서 사용하지 않는 것을 권장한다.



---
### #참고,for/of는 string에서도 사용 가능 

```javascript
var arr = "hello, world";

for ( let value of arr) {
  console.log(value);
}
```

---
### 4. Array enhancements - spread operator (1/2)

**"…"** 새로운 배열로 쉽게 복사할 수 있다.
```javascript
let previousData = ["apple", "orange", 100, 200];
let newData = [...previousData]; 
//newData = ["apple", "orange", 100, 200];

console.log(newData === previousData);  
//false
```

배열 합치기가 쉽다.
```javascript
let previousData = ["apple", "orange", 100, 200];
let newData = [1,2,3,...previousData];

console.log(newData);
//[1, 2, 3, "apple", "orange", 100, 200]
```

만약 …이 없다면 [1,2,3, ["apple", "orange", 100, 200]]

---
### 4. Array enhancements - spread operator (2/2)
배열을 function에 개별 파라미터로 전달하기가 쉽다.
```Javascript
function sum(a,b) { return a+b}
const arr = [4423,42];

//sum.apply(null, arr);
sum(...arr);
```

그냥 배열에서 [] 가 없어진다고 생각하면 편할 듯

---
### 4. Array enhancements - methods

[from 메서드][https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from]를 통해서 가짜 배열을 진짜 배열로 취급하기 쉽게 됐다(?)
[find 메서드][https://www.w3schools.com/jsref/jsref_find.asp]라는 것도 생겼음.

---
### 5. Object enhancements 
객체를 쉽게생성
메서드에 function 키워드도 생략가능.
```javascript
const name = "nayoun";
const age = 9;
const others = {
   address : "kwang myeung city",
   tel : null,
   height: 130
}

const data = {
   name,
   age,
   others,
   getName() {
      return this.name;
   }
}
console.log(data.getName());  //nayoun
```

----
### 6. Destructuring
Array Destructuring
```javascript
let previousData = ["apple", "orange", 100, 200];
let [,,applecount, orangecount] = previousData;
```

**","** 하나의 배열을 건너 뛴다.



Object Destructuring

```javascript
let obj = {
  name : "crong", 
  address : "pororo house",
  age : 12
}

let {name, age} = obj;
console.log(name,age);

//변수 이름을 변경해서 받을 수도 있음.
let {name:myName, age:myAge} = obj;
console.log(myName, myAge);
```

---
### 7. Destructuring practice (1/2)

https://gist.github.com/nigayo/787180f0c9756d198df45c2de4fb20db

```javascript
//make title and imgurl array of mbc
var [,mbc] = news;
var {title,imgurl} = mbc;
console.log(title,imgurl);

//또는 이렇게도 가능.
//make title and imgurl array of mbc
var [,{title,imgurl}] = news;
console.log(title,imgurl);
```

---
### 7. Destructuring practice (2/2)

https://gist.github.com/nigayo/787180f0c9756d198df45c2de4fb20db
```js
//destructuring in function parameters
function getNewslist({newslist}) {
  console.log(newslist);
}
getNewslist(mbc);

//make imgurl array.
var urls = news.map(({imgurl}) => imgurl);
console.log(urls); 
```

---

### 8. set
중복없이 유일한 값만 저장됨. 어떤 값이 이미 존재하는지 체크할 때 유용함.

```javascript
let mySet = new Set();

undefined
mySet.add("eagles");
mySet.add("tigers");

Set(2) {"eagles", "tigers"}
mySet.has("eagles");
true
mySet.delete("eagles");
true
mySet.has("eagles");
false
```

---

### 9. weakSet
참조를 가지고 있는 객체형태만 저장 가능하다. 
저장된 객체가 더이상의 참조를 가지지 않을때는 가비지컬렉션의 대상이 된다.
```javascript
let el = document.querySelector("#area");
let arr = [1,2,3];

let ws = new WeakSet();
ws.add(el);
ws.add(arr);
console.log(ws.has(el), ws.has(arr));

document.querySelector("button").addEventListener("click", (evt) => {
  el.parentNode.removeChild(el);
  arr = null;
  console.log(ws.has(el), ws.has(arr));
});
```

---

### 10. map and weakmap
set과 달리 키/값 구조로 저장이 된다. 
weakMap의경우의 키값은 weakSet과 같이 객체만 가능하다.

```Js
let wm = new WeakMap();
let fun = function() {};
wm.set(fun,0);

let count = 0;

for(let i=0;i<10;i++){
  count = wm.get(fun);
  count++;
  wm.set(fun,count);
}

console.log(wm.get(fun)); //10

fun = null;
console.log(wm.has(fun)); //false
```

일단 set에 대한 필요성을 느끼고 사용해 보는 것을 통해 그 아래들을 느껴보도록 하자

---

### 11. WeakMap을 이용한 클래스 생성.

private 변수 만들기. 객체가 필요없어질때는 역시 가비지컬렉션 대상이 됨.

```javascript
const wm = new WeakMap();

class Rectangle {
  constructor(height, width) {
    wm.set(this, {height,width});
    // this.height = height; 를 쓸때와 달리
    // o.height 로 접근하지 못하게 되는 점이 있다.
    // class를 private하게...
  }  
  get area() {
    return this.calcArea();
  }
  calcArea() {
    const {height, width, size} = wm.get(this);
    return height * width;
  }
}

const square = new Rectangle(10, 10);
const square2 = new Rectangle(10, 20);
console.log(square.area, square2.area);
```

\# 클래스 참고 : https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes

---

### 12. template enhancements
```javascript
const data = {
   hour : new Date().getHours(),
   name : "codesquad"
} 

const template = `<div><span>hello! ${data.name}</span></div>`;
console.log(template); //<div><span>hello! codesquad</span></div>
```

"**`**"

---

### 13. Tagged template literals
tagged template은 template 문자열의 파싱이 필요한 경우에 사용할 수 있다.

```javascript
function fn(val, name, hour) {
    var ampm = (hour > 11) ? "pm" : "am";
	console.log(val[0], name, val[1], hour, ampm, val[2]);
}

var data = {
   hour : new Date().getHours(),
   name : "solvin"
} 

const template = fn`<div><span>hello! ${data.name},
	current time is ${data.hour}</span></div>`;
```

---
### 14. function enhancements - arrow (1/2)
```javascript
setTimeout(() => {console.log("hello")}, 1000);
setTimeout(() => console.log("hello"), 1000);
```

```javascript
var newArr = [1,2,3].map((v) => {
  return v*2;
});
console.log(newArr);

var newArr = [1,2,3].map((v) => (v*2));
var newArr = [1,2,3].map((v) => v*2);
var newArr = [1,2,3].map(v => v*2);
```
{}를 안쓰면 자동 리턴

---
### 14. function enhancements - arrow (2/2)
this가 가리키는 부분이 콜백이 실행되는 시점이 아닌 함수가 정의된 시점의 컨택스트를 기준으로 함.
```javascript
var obj = {
  run() { 
  	setTimeout(function() {
       console.log(this);
	}, 1000);
  }
}
obj.run(); //window

var obj = { 
  run() { 
  	setTimeout(() => {
       console.log(this);
	}, 1000);
  }
} // .bind(this)가 숨겨져있는 의미...
obj.run(); //obj
```

---
### 15. function enhancements - default parameters

```javascript
function sum(value, count=10, size=20) {
   return value * size;
}

sum(3,10);
```
이걸 사용 안하면...

```js
function sum(value, count, size){
	count = count || 10;
	size = size || 20;
	return value * size;
}
```



---
### 16. function enhancements - rest parameters
rest operator 를 활용해 임의의 인자를 배열형태로 받을 수 있다.
rest parameter는 진짜 배열임으로 arguments를 사용해야 하는 상황에서는 더 좋다.
```javascript
function checkNumber(...arg) {
  const result = arg.every((v) => typeof v === "number");
  console.log(result);
}

checkNumber(1,2,3,NaN,4,5,null);
```

---
###  ES6 Class

```javascript
class Health {
  constructor(name, lastTime) {
    this.name = name;
    this.lastTime = lastTime;
  }
 
  showHealth() {
    console.log("오늘은 " + this.lastTime + "까지 " + this.name + " 운동을 하셨네요");
  }
}

var myHealth = new Health("달리기", "23:11");
myHealth.showHealth();
	
```

---
### prototype 객체 - setPrototypeOf
Object.create 말고도 prototype객체에 넣는 방법이 ES6에 추가됨.

```javascript
var healthObj = {
  showHealth : function() {
    console.log("오늘은 " + this.lastTime + "까지 " 
                + this.name + " 운동을 하셨네요");
  }
}

var myHealth = {
  name : "달리기",
  lastTime : "23:10"
}

Object.setPrototypeOf(myHealth, healthObj);

console.log(myHealth);

```

---
### prototype 객체 - Object.assign()
```javascript
var healthObj = {
  showHealth : function() {
    console.log("오늘은 " + this.lastTime + "까지 " 
                + this.name + " 운동을 하셨네요");
  }
}

var myHealth = Object.assign(Object.create(healthObj), {
     name : "달리기",
     lastTime : "23:10"
});
```

---
### Comimg soon..
Async & Moduld loader
