import React from 'react';
import {connect} from 'react-redux';
import Header from './Header';
import Content from './Content';

const mapStateToProps = (state) => {
  return state;
}

const mapDispatchToProps = (dispatch) => {
  return {
  	addGameToList({target}) {
  		const newGameName = target.previousElementSibling.value;
	  	dispatch({
				type : "ADD_GAME",
				value : newGameName
			})
  	}
  }
}

const ContentContainer = connect(mapStateToProps, mapDispatchToProps)(Content);

const AppUIRoot = () => {
	return (
    <div>
    	<Header />
    	<ContentContainer/>
  	</div>
	)
}

export default AppUIRoot;