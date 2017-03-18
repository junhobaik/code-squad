상속 (inheritance)
==

객체는 연관된 로직으로 이루어진 작은 프로그램이라고 할 수 있다.  
상속은 객체의 로직을 그대로 물려 받는 또다른 객체를 만들 수 있는 기능을 의미한다. 

그대로 물려 받기도하지만 기존의 로직을 수정하고 변경할 수 있어, 기존의 기능을 물려받으면서도 새로운 기능을 만든 새로운 객체를 만들 수 있다.  

```js
function Person(name){
    this.name = name;
}
Person.prototype.name=null;
Person.prototype.introduce = function(){
    return 'My name is '+this.name; 
}
 
function Programmer(name){
    this.name = name;
}
Programmer.prototype = new Person();
Programmer.prototype.coding = function(){
return "hello world";
}
 
var p1 = new Programmer('egoing');
document.write(p1.introduce()+"<br />");
```

먼저 Person 생성자에 prototype을 이용하여 name과 introduce를 prototype 공간안에 넣는다.

Programmer 생성자에 prototype 값으로 new Person(); 을 주어 새로운 객체를 만든다.

new Person()을 통해 새로운 객체를 만들면 자바스크립트는 prototype이라는 프로퍼티를 가지고 있는지 검사하고 똑같은 prototype 프로퍼티를 가진 객체를 만들게 된다.

var p1 = new Programmer('dev'); 를 하게 되면 p1 또한 prototype 프로퍼티에 introduce라는 메소드를 가지고 있으므로 같은 기능을 수행할 수 있다.

또 Programmer.prototype.coding = function... 을 통해서 Programmer에만 새로운 기능을 추가하여
Programmer는 Person을 상속했지만 Person에는 없는 기능을 사용할 수 있게 된다.

+ 함수를 new 키워드로 호출하면 객체가 반환되는데, 이렇게 사용된 함수를 생성자라고 하는 것이다.
+ 다시 말해 이 생성자를 통해서 동적으로 변경되는 값을 담을 수 있는 객체를 만드는 것이다.
+ 사실 javascript에는 생성자가 있다고 말하기 어렵다.

----------

프로토타입(Prototype)
==

함수는 객체다, 또한 생성자로 사용될 함수도 객체이다.  
객체는 프로퍼티를 가질 수 있는데, prototype은 그 용도가 정해져있는 특수한 프로퍼티라고 할 수 있다.  
prototype에 저장된 속성들은 생성자를 통해서 객체가 만들어질때 그 객체에 연결된다.  

```js
function One(){} //생성자 : 생성자는 기본적으로 함수이다.
One.prototype.number = 1;

function Two(){}
Two.prototype = new One();

function Three(){}
Three.prototype = new Two();

var obj = new Three(); //함수를 호출할때 new를 붙이면 함수는 생성자라 할 수 있다.
console.log(obj.number); // 1
```

Three는 Two를 상속, Two는 One을 상속.
객체 obj에서 number를 찾는다. 없다면 Three의 prototype에서 number를 찾는다, 없다면 Two의....




**- 예제** 
```js
var dataObj = {
showData : function(){ console.log(this.name); } //이름을 출력하는 메소드
}
function Name(name){ // 생성자 함수
this.name = name;
}
Name.prototype = dataObj; //생성자의 prototype 객체에 다른 객체를 연결

var dev = new Name("Dev");
var jhon = new Name("Jhon");

dev.showData(); //Dev출력됨
jhon.showData(); //Jhon 출력됨
```
여기서 생성자를 통해 생성된 객체가 여러개 있지만,
prototype에 연결된 객체 dataObj는 동일안 메모리 공간에서 효율적으로 재사용된다.

```js
var dataObj = {
showData : function(){ console.log(this.name); } //이름을 출력하는 메소드
}
function Name(name){ // 생성자 함수
this.name = name;
}
var dev = Object.create(dataObj);
var jhon = Object.create(dataObj);

dev.showData(); //Dev출력됨
jhon.showData(); //Jhon 출력됨
```

이 코드는 전의 코드와 동일한 코드이다.   
앞서 사용한 new 키워드는 prototype과 밀접하게 연관되어 있는데, (프로토타입안에 있는 객체를 실제 사용할 수 있게 해주기 때문)  
하지만 객체지향 언어에서는 당연하게 new 키워드가 어색하지 않지만  
자바스크립트는 class가 없으므로 new 키워드는 어색한 면이 있다.  
따라서 생성자와 new 키워드 없이 순수하게 javascript다운
객체 생성방법을 고민하여 나온 것이 Object를 생성하자는 Object.create라는 메서드이다. (ES5 표준)

```js
var dataObj = {
showData : function(){ console.log(this.name); }
}
function Name(name){
this.name = name;
}

var dev = new Name("Dev");
var jhon = new Name("Jhon"); //객체를 받고 
Object.setPrototypeOf(dev, dataObj); //prototype 객체에 추가

dev.showData(); //Dev출력됨
jhon.showData(); //Jhon 출력됨
```
이 코드도 동일하게 작동한다, Object.setPrototypeOf()를 이용하여 프로토타입 기반 객체를 만든 방법이다.