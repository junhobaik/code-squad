linux 설치
-----

1. Virture Box 설치
2. Virture Box 환경설정 - 호스트 전용 네트워크 생성
3. lubuntu 다운로드
4. 새로 만들기 - linux ubuntu 64bit - 그외 기본 설정
5. 설정 (새로 만든 리눅스의 설정) - 네트워크 - 어댑터2 - 호스트 전용 어댑터
6. 시작하기 - 설치
7. 루분투 로그인, 터미널에서 sudo apt update, sudo apt upgrade
8. 재부팅 sudo reboot
9. sudo apt install build-essential
10. Virture Box VM - device - insert ... CD image
11. 해당 경로 복사, 터미널 cd "해당 경로"
12. sudo ./VboxLi ... .run
13. ifconfig | grep inet
14. 아이피주소 기억
15. sudo apt install openssh-server
16. 맥의 터미널에서 ssh "linuxID"@"IP ADDRESS"

MySQL 설치
-----
0. 루분투 스냅샷 생성
1. 맥 터미널 리눅스 접속 상태
2. sudo apt install mysql-server
3. 설치 중 패스워드 반드시 입력
4. sudo service mysql start
5. sudo update-rc.d mysql defaults
6. mysql -u root -p , exit
7. sudo apt install tree
8. junhobaik@junhobaik-VirtualBox:/etc/mysql$ sudo vi mysql.conf.d/mysqld.cnf  맨 아래 아래 글 추가 wq
```
# client 부분밑에 추가
[client]
default-character-set = utf8
 
# mysqld 부분밑에 추가
[mysqld]
init_connect = SET collation_connection = utf8_general_ci
init_connect = SET NAMES utf8
character-set-server = utf8
collation-server = utf8_general_ci
 
# mysqldump 부분밑에 추가
[mysqldump]
default-character-set = utf8
 
# mysql 부분밑에 추가
[mysql]
default-character-set = utf8
```
9. sudo service mysql restart
10. grep -r "bind" 명령으로 하위 디렉토리의 파일 중에 bind라는 내용을 포함한 파일을 찾습니다.
11. sudo vi mysql.conf.d/mysqld.cnf 안의 bind 부분 주석 처리(#)


----------

MySQL
-----

create database junhodb;  
create user 'junho'@'%' identified by 'bjh0324';  
grant all on junhodb.* to 'junho'@'%';
flush privileges;
Sequel Pro 설치

----------

CAP  
ACID  
원자성  
Transaction  
확장성  

SQL, NoSQL  

Documnet DB  
MongoDB  
json 기반 레코드 저장  
아무거나 막 저장  
비교적 빠르고 사용이 간단  
단점 : 조인에 부적합, 이전 버전의 경우 쓰기 성능에 문제가 있음  

Redis,Mem.cached : Key-value DB

Cloud DB : amazon dynamoDB, google Firebase, realm

ETC : hadoop, cassandra, elastic search  

---------

warnings 시  
show warnings; 로 경고 볼 수 있음

