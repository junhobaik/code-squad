import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import Content from './Content';
import {connect} from 'react-redux';
import * as actions from '../actions'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header data={this.props.content.title}/>
        <Content data={this.props.content} addGamelist={this.props.handleAddGame}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('mapStateToProps state is ',state);
  return state;
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleAddGame: ({target}) => { 
      console.log('{target} is ',{target});
      console.log('target.previousElementSibling.value is ',target.previousElementSibling.value);
      
      dispatch(actions.addGame(target.previousElementSibling.value));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);


