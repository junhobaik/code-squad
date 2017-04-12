# 170406



## Algorithm

##### 오늘 할 것들

- 점근 표기법 Asymtopic notation : 평균적인 성능 분석 방법
  - 시간이라는 표기법은 적절하지 않기에 이걸 사용한다
- 빅오, 세타, 오메가

-----

#### loop invariant

알고리즘의 정확도를 검증하는 방법  
반복문 안에서 항상 참이 되는 어떤 조건  

-  Initialization
-  반복문 시작 전에 항상 참
-  Maintenance
-  이전에 참이었다면 루프를 돌고 난 후에도 참
-  Termination
-  루프를 종료한 후에 invariant는 알고리즘의 옮음을 보여주는 유용한 정보를
   주어야 한다.

**Insertion Sort의 Loop Invariant**
n 번째 루프에서 [1...n‑1] 배열은 원본 배열과 같은 원소를 가지고 있고 정렬되어 있다.



**항상 시작, 중간, 끝을 검증하는 습관이 필요**

----------

## 배열, 리스트, 스트링

```java
int a = 3
Integer a = 3
```
int 기본 타입형 3, Integer 오브젝트 타입 형 3 의 차이가 있고
```java
ArrayList <Integer> a = new ArrayList();
```

위와 같이 제네릭과 같은 경우 기본타입은 넣을 수 없기 때문에 이러한 것을 쓴다.



----------



https://www.topcoder.com/

http://tryhelloworld.co.kr/

https://leetcode.com/

https://www.hackerrank.com/