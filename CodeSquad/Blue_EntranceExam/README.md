Blue Exam
===================

README
------

> **Note:**

> - **테스트하시기 편하도록 링크를 준비했습니다.** (바로 하단 File 설명 부분의 File을 클릭)
> - JavaScript로 작성되었고, 아래 html 파일 링크를 열어 개발자도구 console을 이용하시면 됩니다.
> - **문제 1번은 두개를 준비했는데 두번째(Type2)가 더 괜찮고 심플한 코드인 것 같으니 참고해주세요.**
> - README에는 주석이 있는 코드를 기술하였고 주석 제거된 깔끔한 코드를 보고싶으시다면 아래 제출한 파일 안에는 주석이 제거되어 있습니다.


###  File
>   [**- blueExam_Q1_type1(junhobaik).html**][1]  
문제1 Type1, 처음에 만든 비교적 복잡해보이는 프로그램입니다.  

>  [**- blueExam_Q1_type2(junhobaik).html**][2]  
 문제1 Type2, 두번째로 만든 더 심플하게 구현한 프로그램입니다.  

>  [**- blueExam_Q2(junhobaik).html**][3]  
문제2의 프로그램입니다.  

----------

##**문제1 (Type 1)**


###- Javascript code  (주석 포함)
```js
var country = [1, 2, 4, 0];
var country_length = country.length;
country.sort(); //오름차순 정렬
var result = "";
var zeroc = 0; //처음 전달된 값이 0인지 체크하기 위한 값

function to1240(num) {
  if (typeof num !== 'number') { //전달된 값이 숫자가 아니면 에러를 반환.
    return "error : It's not a number type";
  } else if (num != 0) {
    var division = num / country_length;
    var remainder = num % country_length;
    zeroc++; //처음 전달된 값이 0이 아니다, 따라서 증가시킴
    to1240(parseInt(division)); //recursive 재귀
    return result += country[remainder];
    //결과값에 country배열의 나머지 인덱스 번호에 해당하는 숫자가 넣어진다.
    //호출 순서의 반대로 반환하는 재귀 함수의 성질 이용, 
    //앞자리부터 결과값이 넣어지게 된다.
  } else if (zeroc == 0) { //처음 전달된 값이 0일때 처리하는 부분이다.
    return country[0].toString();
  } else { //reset
    zeroc = 0;
    result = "";
  }
}

function toDec(str) {
  if (typeof str !== 'string') {
    return "error : It's not a string type";
  } else {
    var len = str.length;
    var toDec_result = 0;
    for (var i = len; i > 0; i--) {
      var a = country.indexOf(parseInt(str.charAt(i - 1)));
      //문자가 나라에 속하는지 검사하고 해당 문자가 있는 인덱스 위치를 반환
      //인덱스 값을 가지고 진법 계산식을 가지고 결과값을 만들게 된다
      if (a == -1) { //a가 -1이면 country에 존재하지 않는 것이므로
                     //나라 숫자 아닐 경우 에러 반환
        return "error : This is not the number in this country";
      } else {
        var b = a * Math.pow(country_length, Math.abs(len - i));
        toDec_result += b;
        //진법 계산을 통해서 결과값에 값을 추가
      }
    }
    return toDec_result;
  }
}
```

###- description

 1. to1240 함수는 먼저 나라 배열 [0,1,2,4] 의 length 만큼 전달된 num값을 나눠 나눈값과 나머지를 구합니다.
 2. 여기서 나머지는 "나라 배열 [remainder]" 를 통해 나라 숫자로 변경됩니다. (sort되어 있으므로 순서대로 가능)
 3. 나눈값이 length로 계속 나뉜다면 재귀를 통해 함수가 계속 실행되어 위 과정이 반복됩니다.
 4. 과정은 뒷자리 숫자부터 계산하지만 재귀의 원리(호출 순서 반대로 반환)에 따라 앞자리 숫자부터 결과값에 추가되어 쌓이므로 맞는 결과를 반환할 수 있게 됩니다.
 5. toDec 함수는 나라 숫자를 다시 나라 숫자로 변경되기 전 숫자로 바꾸고, 그 숫자를 진법 계산식을 통해서 10진법으로 돌려놓습니다.  

###- Point
> "**10진수 숫자**를 1240 나라에서 쓰는 숫자로 변환하여 반환해 주는 함수 (**리턴 타입은 문자열**)"
> 반대 변환 함수 - 1240 나라 **문자열**을 입력받아 **10진수로** 변환해 주는 함수
> >10진수 숫자, 문자열을 전달받으므로 아래 코드 형식을 이용하여 전달받은 형식이 맞지 않으면 에러 반환. (아래는 숫자가 아닐 경우)
>> ```
 if (typeof num !== 'number') {
    return "error : It's not a number type";
  }
>> ```
>> to1240의 결과값은 문자열, toDec의 결과값은 10진수 숫자.
>>```
to1240(4)
"10"
toDec("4")
3
>>```

_

>에러가 발생하는 경우
- toDec 함수에 나라에 속하지 않는 숫자를 전달했을때
- 각 함수에 맞지 않는 형을 전달하였을때



###- Result
>\> to1240("1")  
>"error : It's not a number type"  
>\> to1240(4)  
>"10"  
>\> toDec("402")  
>50  
>\> toDec(4)  
>"error : It's not a string type"  
>\> toDec("3")  
>"error : This is not the number in this country"  


----------

##**문제1 (Type 2)**


###- Javascript code (주석 포함)
```js
country = [1, 2, 4, 0];
country.sort(); //정렬

function to1240(num) {
  if (typeof num !== 'number') { //전달된 값이 숫자가 아니면 에러를 반환.
    return "error : It's not a number type";
  } else {
    var numStr = num.toString(country.length);
    // num값을 toString(배열길이)로 배열길이 진법화
    for (var key in country) {
      if (key != country[key]) { // 같은 문자로 변경은 무시
        numStr = numStr.split(key).join(country[key]);
        //key값에 해당하는 문자로 split함으로 해당하는 문자를 잘라내고 쪼갠다,
        //해당 문자가 잘라진 위치에 join이용 배열에서 key값(index)에 해당하는 숫자를 넣는다.
      }
    }
    return numStr;
  }
}

function toDec(str) { //to1240과 똑같은 원리
  if (typeof str !== 'string') {
    return "error : It's not a string type";
  } else {
    for (var i in str) { //나라 숫자에 존재하는지 검사 추가
      if (country.indexOf(parseInt(str[i])) == -1) {
        //나라에 존재하지 않는 숫자면 에러 메세지 반환
        return "error : This is not the number in this country";
      }
    }
    for (var key in country) {
      if (key != country[key]) {
        str = str.split(country[key]).join(key);
      }
    }
    return parseInt(str, country.length);
  }
}
```

###- description

to1240 함수는
num.toString(country.length) 를 통해 4(나라 배열 크기)진법화를 합니다.  
진법화 된 숫자는 0,1,2,3 을 가지고 있고 나라는 0,1,2,4 를 가지고 있으므로  
진법화 된 숫자와 나라 숫자중 다른 문자를 나라 숫자로 바꿔야합니다.  
따라서 진법화 된 숫자가 나라 숫자가 아닐 경우,  
그 숫자를 기준으로 split을 하여 잘라내고 그 자리에 join을 통해 나라 숫자를 넣습니다.  

> ex) to1240(50), 50을 진법화 => 302   
> 3이 나라 숫자가 아니므로 3을 기준으로 잘라냄 => "","02"  
> 잘라낸 자리에 나라 숫자를 해당 인덱스의 나라 숫자를 넣는다 "402"

toDec 함수는 to1240 함수의 반대로 유사한 원리로 작동합니다. 다만 나라 숫자가 아닌 것이 전달되었을 경우 에러 메세지를 반환합니다.

###- Point
> "**10진수 숫자**를 1240 나라에서 쓰는 숫자로 변환하여 반환해 주는 함수 (**리턴 타입은 문자열**)"
> 반대 변환 함수 - 1240 나라 **문자열**을 입력받아 **10진수로** 변환해 주는 함수
> >10진수 숫자, 문자열을 전달받으므로 아래 코드 형식을 이용하여 전달받은 형식이 맞지 않으면 에러 반환. (아래는 숫자가 아닐 경우)
>> ```
 if (typeof num !== 'number') {
    return "error : It's not a number type";
  }
>> ```
>> to1240의 결과값은 문자열, toDec의 결과값은 10진수 숫자.
>>```
to1240(4)
"10"
toDec("4")
3
>>```

_

>에러가 발생하는 경우
- toDec 함수에 나라에 속하지 않는 숫자를 전달했을때
- 각 함수에 맞지 않는 형을 전달하였을때



###- Result
>\> to1240("1")  
>"error : It's not a number type"  
>\> to1240(4)  
>"10"  
>\> toDec("402")  
>50  
>\> toDec(4)  
>"error : It's not a string type"  
>\> toDec("3")  
>"error : This is not the number in this country"  

----------

##**문제2**


###- Javascript code (주석 포함)
```js
function parseData(map_string) {
  var mapSplit = map_string.split("\n"); //map 문자열을 줄바꿈을 기준으로 쪼개며 줄바꿈 잘라내기
  var wh = mapSplit[0].split(","); //mapSplit에서 첫번째 요소인 width,height 값을 ,를 기준으로 쪼개어 배열에 저장
  mapSplit.splice(0, 1); //mapSplit에서 width,height값 제거하기 위한 동작
  var json = {
    width: wh[0],
    height: wh[1],
    data: mapSplit.join('').replace(/-/gi, ' ')
    //-를 전역에서(g) 대소문자 구별없이(i) 공백으로 replace
  };

  return json;
  // json 문자열 형태로 리턴하려면
  // return JSON.stringify(json);
}

function drawMap(json) {
  if (typeof json === 'string') {
    //문자열 형태로 들어왔을때 객체형으로 바꾸기 위해
    json = JSON.parse(json);
  }
  //width 길이 만큼 출력을 height 횟수 반복
  for (var i = 0; i < json.height; i++) {
    console.log(json.data.substr(i * json.width, json.width));
  }
}

var map_data = "10,5\n++++++++++\n+-P------+\n+--------+\n+-----o--+\n++++++++++\n";
var json = parseData(map_data);
drawMap(json);
```

###- description

  1. map 문자열을 줄바꿈을 기준으로 쪼개며 줄바꿈을 잘라냅니다.  
  mapSplit=["10,5", "++++++++++", "+-P------+", "+--------+", "+-----o--+", "++++++++++", ""]  
  2. width와 height 값을 따로 배열에 저장합니다.  
  wh=[10, 5], mapSplit=["10,5", "++++++++++", "+-P------+", "+--------+", "+-----o--+", "++++++++++", ""]  
  3. 기존 배열에서 width, height 값을 제거합니다.  
  wh=[10, 5], mapSplit=["++++++++++", "+-P------+", "+--------+", "+-----o--+", "++++++++++", ""]  
  4. json 형식으로 저장, 반환합니다, 이때 -를 공백으로 바꿉니다. (여기까지가 parseData 함수)  
  5. width 길이 만큼 출력을 height 횟수 반복합니다. (drawMap 함수)  



###- Result
```
> var map_data = "10,5\n++++++++++\n+-P------+\n+--------+\n+-----o--+\n++++++++++\n"  
> var json = parseData(map_data)  
> drawMap(json)
//위 3줄은 테스트하기 편하시도록 코드 내에 포함시켜두었습니다.
++++++++++
+ P      +
+        +
+     o  +
++++++++++
```

----------

  [1]: ./blueExam_Q1_type1(junhobaik).html
  [2]: ./blueExam_Q1_type2(junhobaik).html
  [3]: ./blueExam_Q2(junhobaik).html
