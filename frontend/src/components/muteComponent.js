import React, {Component} from 'react';
export default class MuteControl extends Component {
	constructor(props) {
		super(props);
		this.state = {
			mute: '',
		};
        this.fetchmuteData = this.fetchmuteData.bind(this);
         this.handleChange = this.handleChange.bind(this);
	}
        
        fetchmuteData(){
     fetch('http://localhost:8000/api/song/').then(results => {
          return results.json();
}).then(data => {
   this.setState({ mute: data['mute']});
})
}

handleChange = (event) =>{
    var a = document.getElementById("mu").value;
	   var b = (a==="0"? "1":"0"); 
	
	var data_format =  {
            'url': "",
            'volume': "", 
            'duration': "",
            'seek': "",
            'play': "",
            'mute': b,
            'message': ""
        }
   this.connection.send(JSON.stringify(data_format));

}

componentDidMount(){
   this.fetchmuteData();
   this.connection = new WebSocket('ws://localhost:8000/ws/stream/');
  this.connection.onopen = () => {
        console.log('MUTE  Socket connected')
  };    

  this.connection.onmessage = (e) => {
       var data = JSON.parse(e.data);
       var mute = data['mute'];
       (mute === "") ? void(0) : this.setState({mute:mute});
   };
}
componentWillUnmount(){
    this.connection.onclose  = (e) =>{
        console.error('MUTE Socket Closed Unexpectedly');
    };
}
         
	
         render() {
	   return (
		<div>
                 <label>Mute: <input type="button" id="mu"  value={this.state.mute} onclick={this.handleChange} /></label><br/>
                </div>
                    )
              }
}
