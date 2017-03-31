170321
=====

**TODO**
pro git 꼭 보기, 3주차 지나서...


TIL (Today I Learned)
-----  

- 의도적인 TIL
> developed by me  
> 아주 긴 시간을 목표로 잡는다  
> 안 하는 날도 있을 수 있다  
> 못하는 진도를 누적하지 않는다  
> 미션을 주고 달성하도록 노력한다  
----------

<< 여기에 git 구조? 필기 추가





>git clone 경로 //프로젝트 이름으로 생성  

>git clone 경로 이름 //이름으로 생성  

>git config --global --list //글로벌 정보 조회   

>git config --list //로컬 정보 조회, .git config에 들어있다  

>git config --global alias.co commit //comiit이란 명령어를 co로 지정, 줄여서 사용할 수 있다.  
>git log --pretty-oneline --decorate --graph --all  
>git config --global alias.logs "log --pretty=oneline --decorate --graph --all"  

git branch bb [commit] //특정 커밋으로 브랜치를 만드는
git checkout -b bb [commit]

HEAD  
HEAD^1// ^부모, ^1 첫번째 부모... ^^할아버지  
HEAD~1// 첫번째부모, ~1 할아버지, ~2 증조 할아버지  
>git checkout HEAD~3  

<<강의 자료 참고 내용 추가

git rebase master //현재 브랜치의 커밋들을 master에 한줄로 올려 놓는다  
git merge 2nd //마스터 브랜치 상태에서 입력하면 올려놓은 것의 끝(2nd의 위치)으로 간다  
merge하면 부모는 두개, rebase하면 부모는 하나


git cherry-pick commit //어디에 있는 커밋이건 그것만 떼어서 가져온다.  


되돌리기  
git revert C2 //작업 디렉토리가 C2로 바뀐다, C2가 현재 커밋 위에 올라간다, C3를 살리면서 C2를 쓰는 장점.  
git reset --hard HEAD~2 //할아버지로 돌아가라  
git branch -f master bb //현재 브랜치가 마스터가 아닌 곳에서 실행  
git rebase -i HEAD~2 //커밋의 순서를 바꿀 수 있고 선택을 안하면 없앨수도 있다, 커밋을 수정할 수 있다. interactive
>pick문자 수정, commands 설명을 참고하자  



**push**  
원격저장소 지정이 되어있어야 한다.
git remote add origin 주소||경로 //clone시에는 자동으로 되어있다.
git push -u origin aa == git push --set --upstream aa

add 한 파일을 스테이지에서 내리는 명령
git rm --cached 4.txt
git commit --amend //커밋 덮어쓰기, 실제로는 새로 생성되는 것

git에서 특정 파일 히스토리 전체, 존재를 지우려면
> brew install bfg //bfg 설치  
> bfg --delete-files 1.txt //1.txt의 존재, 역사를 모든 커밋에서 지움  
> 엄청 민감하면 리포지토리 새로 만들자...

----------

**기타 노트**  
터미널 : touch file //비어있는 파일 만들기



----------

**- 참고사항**  
> [좋은 커밋 메세지][1]  
> [Pro git book v2][2]  
>  
> 브랜칭 및 Workflow 이해하기     
>> [실습][3]  
>> [워크 플로우 1][4]  
>> [워크 플로우 2][5]  


[1]:https://item4.github.io/2016-11-01/How-to-Write-a-Git-Commit-Message/
[2]:https://git-scm.com/book/ko/v2
[3]:http://learngitbranching.js.org/
[4]:https://ujuc.github.io/2015/12/16/git-flow-github-flow-gitlab-flow/
[5]:https://guides.github.com/introduction/flow/