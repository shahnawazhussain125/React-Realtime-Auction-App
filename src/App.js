import React, { Component } from 'react';
import Header from './components/Header';
import Route from './routes';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="justify-content-center" >
        <Header/>
        <Route/>
      </div>
    );
  }
}

export default App;
