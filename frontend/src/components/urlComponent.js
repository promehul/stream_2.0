import React, {Component} from 'react';
import ReactPlayer from 'react-player';

const API_KEY = 'AIzaSyCwloS7hx6u8fvT4P2SzX06lizxuMrX828';


export default class SearchBaro extends Component {
	constructor(props) {
		super(props);
		this.state = {
		  resultyt: [],
		};
		
	}


 handleChange = (e) => {
	 e.preventDefault();
	 var a = document.getElementById('lol').value;
	 let URL = 'https://www.googleapis.com/youtube/v3/search?part=snippet&key=' + API_KEY + '&maxResults=5&q=' + a;
	 fetch(URL)
	.then(response => response.json())
       .then((responseJson) => {
         //console.log(responseJson);
         const resultyt = responseJson.items.map( obj => "https://www.youtube.com/watch?v=" + obj.id.videoId);
	this.setState({resultyt: resultyt});		 
   })	 
         
 
    
 }

        render() {
	   	return (
        <div>
	<input type='text' id='lol' />
	<input type='submit' value='search' onClick={this.handleChange}/> 
	<ReactPlayer
          url= {this.state.resultyt[0]} 
          className='react-player'
          playing
          width='100%'
          height='100%'
	  controls = {true}
        /> 
      </div>    
      );        
}
}
