import React, {Component} from 'react';
export default class PlayControl extends Component {
	constructor(props) {
		super(props);
		this.state = {
			play: true,
		};
        this.fetchplayData = this.fetchplayData.bind(this);
         this.handleClick = this.handleClick.bind(this);
	}
        
        fetchplayData(){
     fetch('http://localhost:8000/api/song/').then(results => {
          return results.json();
}).then(data => {
   this.setState({ play: data['play']});
})
}

handleClick = () =>{
  var a = !this.state.play;
  var data_format =  {
      'url': "",
      'volume': "",
      'duration': "",
      'seek': "",
      'play': a,
      'mute': "",
      'message': ""
}
this.connection.send(JSON.stringify(data_format)); 
}

componentDidMount(){
   this.fetchplayData();
   this.connection = new WebSocket('ws://localhost:8000/ws/stream/');
   this.connection.onopen = () => {
        console.log('PLAY  Socket connected')
  };    

  this.connection.onmessage = (e) => {
       var data = JSON.parse(e.data);
       var play = data['play'];
       (play === "") ? void(0) : this.setState({play:play});
   };
}
componentWillUnmount(){
    this.connection.onclose  = (e) =>{
        console.error('PLAY Socket Closed Unexpectedly');
    };
}
         
	
         render() {
	   return (
		<div  id="mu" > 
                <button onClick={this.handleClick}> {this.state.play ? "pause" : "play" } </button>  <br/>
                </div>
                    );
              }
}
