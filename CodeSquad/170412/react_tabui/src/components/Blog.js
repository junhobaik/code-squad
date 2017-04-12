import React from 'react';

export default class Blog extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            selectedKey: -1,
            postData: [
            {
                title : '1st post title',
                content : '1st post comtent'
            },
            {
                title : '2st post title',
                content : '2st post comtent'
            },
            {
                title : '3st post title',
                content : '3st post comtent'
            },
            {
                title : '4st post title',
                content : '4st post comtent'
            },
            {
                title : '5st post title',
                content : '5st post comtent'
            }
            ],
        }
        this.liClick = this.liClick.bind(this);
    }

    liClick(key){
        this.setState({
            selectedKey: key 
        });
        console.log("key = ", key);
    }
    render(){
        const data = this.state.postData;
        const postLi = data.map((postData, i)=>{
            return (
                <li key={i}onClick={()=>this.liClick(i)}>
                    {postData.title}
                </li>
            );
        });
        const show = this.state.selectedKey+1 + "번째 포스트가 선택 되었습니다.";
        const none = "";
        const postContent = data.map((postData, i)=>{
            return(
                <div>Post 내용 : {postData.content}</div>
            );
        });
        
        return(
            <div>
                <ul>
                    {postLi}
                </ul>
                <br/>
                <div>
                    {this.state.selectedKey != -1 ? show : none} 
                </div>
                <div>
                    <br/>
                    {postContent[this.state.selectedKey]}
                </div>
            </div>
        );
    }
}