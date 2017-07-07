import React, { Component } from 'react';
import reducers from './store/reducers';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import Editor from './components/Editor';
import SideBar from './components/SideBar';
import MenuBar from './components/MenuBar';
import EntryList from './components/EntryList';
import './App.css';
import './utils/FileSystem';

let store = createStore(reducers);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div id="app">        
          <div id="content">
            <SideBar> 
              <MenuBar/>    
              <EntryList/>     
            </SideBar>
            <Editor />
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
