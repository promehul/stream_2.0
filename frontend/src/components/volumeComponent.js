import React, {Component} from 'react';


export default class VolumeControl extends Component {
	constructor(props) {
		super(props);
		this.state = {
			volume: '',
		};
        this.fetchVolumeData = this.fetchVolumeData.bind(this);
         this.handleChange = this.handleChange.bind(this);
	}
        
        fetchVolumeData(){
     fetch('http://localhost:8000/api/song/').then(results => {
          return results.json();
}).then(data => {
   this.setState({ volume: data['volume']});
})
}

handleChange = (event) =>{
    var data_format =  {
            'url': "",
            'volume': event.target.value,
            'duration': "",
            'seek': "",
            'play': "",
            'mute': "",
            'message': ""
        }
   this.connection.send(JSON.stringify(data_format));

}

componentDidMount(){
   this.fetchVolumeData();
   this.connection = new WebSocket('ws://localhost:8000/ws/stream/');
  this.connection.onopen = () => {
        console.log('Volume  Socket connected')
  };    

  this.connection.onmessage = (e) => {
       var data = JSON.parse(e.data);
       var volume = data['volume'];
       (volume === "") ? void(0) : this.setState({volume:volume});
   };
}
componentWillUnmount(){
    this.connection.onclose  = (e) =>{
        console.error('Volume Socket Closed Unexpectedly');
    };
}
         
	
         render() {
	   return (
		<div>
                 <label>Volume: <input type="range" min="0" max="100" value={this.state.volume} onChange={this.handleChange} /></label><br/>
                </div>
                    )
              }
}
