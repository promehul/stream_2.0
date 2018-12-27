import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Streami from './components/stream';
import SearchBaro from './components/urlComponent';
import PlayControl from './components/playComponent';
import MuteControl from './components/muteComponent';
import VolumeControl from './components/volumeComponent';
import SeekControl from './components/seekComponent';
class App extends Component {
   constructor(props){
    super(props);
    this.logout = this.logout.bind(this);
   }

   logout(e){
	   e.preventDefault();
	   localStorage.removeItem("persist:polls");
	   window.location.reload();
   }
   
	
	
   render() {
    return (
      <div className="App">
        <center>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
	<SearchBaro/>

       <VolumeControl/>
	<SeekControl/>
       <PlayControl/>
       <MuteControl/>
       <a href="/player">Click here</a>
	<button onClick={this.logout}>LogOut</button>
      </center>
      </div>
    );
  }
}

export default App;
