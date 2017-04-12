import React from 'react';
import Blog from './Blog';

export default class App extends React.Component{
    render(){
        return (
            <div>
                <h1>Wellcome my blog...</h1>
                <Blog/>
            </div>
        );
    }
}