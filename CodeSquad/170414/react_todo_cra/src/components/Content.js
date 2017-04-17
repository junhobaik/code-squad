import React, { Component } from 'react';

class Content extends Component {
    render() {
        let gamelist = this.props.data.gamelist;
        let gamelistJSX = gamelist.map((value, i) => {
            return <li key={i}>{value}</li>
        });

        return (
            <div>
              <input type="text"/>
              <button onClick={this.props.addGamelist}>ADD</button>
              <br/><br/>
              <hr/>
              {gamelistJSX}
            </div>
        );
    }
}

export default Content;