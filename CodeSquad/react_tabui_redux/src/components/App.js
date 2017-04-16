import React, { Component, PropTypes } from 'react';
import Counter from './Counter';

class App extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div>
                
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        //undefined: state.reducer.name
    }
}

const mapDispatchToProps = (dispatch) => {
    //return bindActionCreators(actions, dispatch);
    return {
        //handleSetColor: (color) => {dispatch(actions.setColor(color))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);;