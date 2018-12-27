import React, {Component} from 'react';
export default class MuteControl extends Component {
	constructor(props) {
		super(props);
		this.state = {
			mute: false,
		};
        this.fetchplayData = this.fetchplayData.bind(this);
         this.handleClick = this.handleClick.bind(this);
	}
        
        fetchplayData(){
     fetch('http://localhost:8000/api/song/').then(results => {
          return results.json();
}).then(data => {
   this.setState({ mute: data['mute']});
})
}

handleClick = () =>{
        var a = !this.state.mute;
        var data_format =  {
            'url': "",
            'volume': "",
            'duration': "",
            'seek': "",
            'play': "",
            'mute': a,
            'message': ""
        }
this.connection.send(JSON.stringify(data_format)); 
}

componentDidMount(){
   this.fetchplayData();
   this.connection = new WebSocket('ws://localhost:8000/ws/stream/');
   this.connection.onopen = () => {
        console.log('mute  Socket connected')
  };    

  this.connection.onmessage = (e) => {
      // console.log(this.state.mute) ;     
       var data = JSON.parse(e.data);
       var mute = data['mute'];
       (mute === "") ? void(0) : this.setState({mute:mute});
      // console.log(this.state.mute);
   };
}
componentWillUnmount(){
    this.connection.onclose  = (e) =>{
        console.error('mute Socket Closed Unexpectedly');
    };
}
         
	
         render() {
	   return (
		<div  id="mu" > 
                <button onClick={this.handleClick}> {this.state.mute ? "unmute" : "mute" } </button>  <br/>
                </div>
                    );
              }
}
