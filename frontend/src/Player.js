import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Streami from './components/stream';

class App extends Component {
   constructor(props){
    super(props);
    
   }

   	
   render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
		<Streami/>
       
      </div>
    );
  }
}

export default App;

