import React, {Component} from 'react';


export default class SeekControl extends Component {
	constructor(props) {
		super(props);
		this.state = {
			seek: '',
			duration: '',
		};
        this.fetchSeekData = this.fetchSeekData.bind(this);
         this.handleChange = this.handleChange.bind(this);
	}
        
        fetchSeekData(){
     fetch('http://localhost:8000/api/song/').then(results => {
          return results.json();
}).then(data => {
   this.setState({ seek: data['seek'], duration: data['duration']});
})
}

handleChange = (event) =>{
    var data_format =  {
            'url': "",
            'volume':"",
            'duration': "",
            'seek': event.target.value,
            'play': "",
            'mute': "",
            'message': ""
        }
   this.connection.send(JSON.stringify(data_format));

}

componentDidMount(){
   this.fetchSeekData();
   this.connection = new WebSocket('ws://localhost:8000/ws/stream/');
  this.connection.onopen = () => {
        console.log('seek  Socket connected')
  };    

  this.connection.onmessage = (e) => {
       var data = JSON.parse(e.data);
       var seek = data['seek'];
       var duration = data['duration'];
       (seek === "") ? void(0) : this.setState({seek:seek});
       (duration === "") ? void(0) : this.setState({duration:duration});
   };
}

componentWillUnmount(){
    this.connection.onclose  = (e) =>{
        console.error('Duration Socket Closed Unexpectedly');
    };
}
         
	
         render() {
	   return (
		<div>
                 <label>Seek:0 <input type="range"  min="0" max={this.state.duration} value={this.state.seek} onChange={this.handleChange} />{this.state.duration}</label><br/>
                </div>
                    )
              }
}
