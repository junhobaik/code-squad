import React, { Component } from 'react';
import AppUIRoot from './AppUIRoot';

import contentReducer from '../reducers/contentReducer';
import {Provider} from 'react-redux';
import { createStore } from 'redux';

const store = createStore(contentReducer);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppUIRoot />
      </Provider>
    );
  }
}

export default App;