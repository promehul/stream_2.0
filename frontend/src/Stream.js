import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Streami from './components/stream';

class App2 extends Component {
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
    
        //<a href="">react_player</a> 
	<button onClick={this.logout}>LogOut</button>
      </div>
    );
  }
}

export default App2;
