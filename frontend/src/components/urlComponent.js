import React, {Component} from 'react';
import ReactPlayer from 'react-player';

const API_KEY = 'AIzaSyCwloS7hx6u8fvT4P2SzX06lizxuMrX828';


export default class SearchBaro extends Component {
	constructor(props) {
		super(props);
		this.state = {
		  resultyt: [],
		  tityt: [],
		  imgyt: [],
		  pa: '',
		};
		
	}

handle = (id,e) =>{
   const pa = this.state.resultyt[id];
   this.setState({ pa: pa,
   });
}


handleChange = (e) => {
	 e.preventDefault();
	 var a = document.getElementById('lol').value;
	 let URL = 'https://www.googleapis.com/youtube/v3/search?part=snippet&key=' + API_KEY + '&maxResults=5&q=' + a;
	 fetch(URL)
	.then(response => response.json())
       .then((responseJson) => {
         const resultyt = responseJson.items.map( obj => "https://www.youtube.com/watch?v=" + obj.id.videoId);
	 const tityt = responseJson.items.map( obj => obj.snippet.title);
	 const imgyt = responseJson.items.map( obj => obj.snippet.thumbnails.default.url);
	this.setState({resultyt: resultyt ,
	               tityt: tityt ,
		       imgyt: imgyt,       
	});
   })
 }


        render() {
	   	return (
        <div>
	<input type='text' id='lol' />
	<input type='submit' value='search' onClick={this.handleChange}/> <br />
	
	<div onClick={(e) => this.handle(0,e)}><img src={this.state.imgyt[0]} alt="" /><p id="d0"> {this.state.tityt[0]}</p></div> <br />
        <div onClick={(e) => this.handle(1,e)}><img src={this.state.imgyt[1]} alt="" /><p id="d1"> {this.state.tityt[1]}</p></div> <br />
	<div onClick={(e) => this.handle(2,e)}><img src={this.state.imgyt[2]} alt="" /><p id="d2"> {this.state.tityt[2]}</p></div> <br />
	<div onClick={(e) => this.handle(3,e)}><img src={this.state.imgyt[3]} alt="" /><p id="d3"> {this.state.tityt[3]}</p></div> <br />
	<div onClick={(e) => this.handle(4,e)}><img src={this.state.imgyt[4]} alt="" /><p id="d4"> {this.state.tityt[4]}</p></div> <br />

	<ReactPlayer
          url= {this.state.pa} 
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
