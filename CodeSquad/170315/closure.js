//(function () {
//  var list = document.querySelectorAll('li');
//  var show = document.querySelector('.show');
//  for (var i = 0; i < list.length; i++) {
//    (function (j) { //j또한 클로저지만 변하지 않게 한 것
//      list[i].addEventListener('click', function () {
//        show.innerText = j + 1 + '번째 과일이 선택됐습니다';
//        debugger;
//      });
//    })(i);
//  }
//})();
(function () {
  var list = document.querySelectorAll('li');
  var show = document.querySelector('.show');
  for (let i = 0; i < list.length; i++) {
    list[i].addEventListener('click', function () {
      console.log(i);
      show.innerText = i + 1 + '번째 과일이 선택됐습니다';
      //debugger;
    })
  }
})();