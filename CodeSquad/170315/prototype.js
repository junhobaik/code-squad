// //var healthObj = {
// //  name: "달리기"
// //  , lastTime: "PM10:12"
// //  , showHealth: function () {
// //    console.log("오늘은 " + this.lastTime + "까지 " + this.name + " 운동을 하셨네요");
// //  }
// //}
// //healthObj.showHealth();
// //console.log('healthObj', healthObj);
// /***/
// var healthObj = {
//   showHealth: function () {
//     console.log("오늘은 " + this.lastTime + "까지 " + this.name + " 운동을 하셨네요");
//   }
// }

// function Health(name, lastTime) { //대문자 명사로 생성자 이름 지정
//   this.name = name;
//   this.lastTime = lastTime;
// }
// //var h1 = new Health("이름","시간"); //new는 생성자와 함께.. new는 빈객체를 만든다..
// Health.prototype = healthObj;
// //Health.prototype.showHealth = function(){~}; 위와 같은 코드
// var myHealth = new Health("달리기", "20:00");
// console.log('myHealth', myHealth);
// myHealth.showHealth();
// var myHealth2 = new Health("자전거", "12:34");
// myHealth2.showHealth();
// var myHealth3 = new Health("수영", "13:57"); //아무리 많이 만들어도 showHealth는 하나를 공유하는 성능 향상의 효과
// myHealth3.showHealth();
// //myhelath. 어떤 것들 접근 가능한지 확인해보기
// //__의 의미는 내부에서 사용되는 것으로 함부로 사용을 금하는 것을 뜻함
// //myHealth.showHealth는 myHealth.__proto__.showHealth 에서 proto가 생략되어있는 것 그러나 proto가 포함된 것은 실행을 막아놓음.
// console.log('myHealth.showHealth === myHealth2.showHealth', myHealth.showHealth === myHealth2.showHealth);
// console.log('myHealth.__proto__ === myHealth2.__proto__', myHealth.__proto__ === myHealth2.__proto__);
// console.log('myHealth2.__proto__ === myHealth3.__proto__ ', myHealth2.__proto__ === myHealth3.__proto__);
// console.log('myHealth2.__proto__.constructor === myHealth3.__proto__.constructor', myHealth2.__proto__.constructor === myHealth3.__proto__.constructor);
// console.log('myHealth.__proto__.showHealth === Health.prototype.showHealth', myHealth.__proto__.showHealth === Health.prototype.showHealth);
// //prototype을 통한 모듈화

/***/
class Health { //실체는 프로토타입이다.
constructor(name, lastTime) {
this.name = name;
this.lastTime = lastTime;
}
showHealth() {
console.log("오늘은 " + this.lastTime + "까지 " + this.name + "를 함");
}
}
var myHealth = new Health("달리기", "23:11");
myHealth.showHealth();
  //var healthObj = {
  //  showHealth: function () {
  //    console.log("오늘은 " + this.lastTime + "까지 " + this.name + "운동을 하셨네요");
  //  }
  //}
  //
  //function Health(name, lastTime) {
  //  return {
  //    name: name
  //    , lastTime: lastTime
  //  }
  //}
  //var myHealth = Health("달리기", "23:10"); //객체를 받고,
  //Object.setPrototypeOf(myHealth, healthObj); //prototype객체에 추
  //myHealth.showHealth();