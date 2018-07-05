import React, {Component} from 'react';
import ReactPlayer from 'react-player';

export default class streami extends Component {
constructor(props) {
		super(props);
		this.state = {
			url: '',
                        volume: '',
                        seek: '',
                        duration: '',
                        mute: '',
                        play: '',
              };
   
 this.fetchData = this.fetchData.bind(this);
}

fetchData(){
     fetch('http://localhost:8000/api/song/').then(results => {
          return results.json();
}).then(data => {
   this.setState({ volume: data['volume'],
                   url: data['url'],
                   seek: data['seek'],
                   mute: data['mute'],
                   play: data['play'],
                   duration: data['duration'],
});
})
}
componentDidMount(){
    this.fetchData();
    this.connection = new WebSocket('ws://localhost:8000/ws/stream/');
    this.connection.onopen = () => {
    console.log("Main Stream Player connected")
 }
this.connection.onmessage = (e) => {
    var data = JSON.parse(e.data);
    var url = data['url'];
    var volume = data['volume'];
    var seek = data['seek'];
    var duration = data['duration'];
    var mute = data['mute'];
    var play = data['play'];
    
    if(url!== '')
       this.setState({url:url});

    if(volume!== '')
       this.setState({volume:volume});

    if(url!== '')
       this.setState({seek:seek});

    if(url!== '')
       this.setState({duration:duration});

    if(url!== '')
       this.setState({mute:mute});

    if(url!== '')
       this.setState({play:play});
}
}
     render() {
        return(
	<div>
         <ReactPlayer
          url= {this.state.url} 
          className='react-player'
          playing
          width='100%'
          height='100%'
	  controls = {true}
        /> 

	</div>
    )
  }
}
