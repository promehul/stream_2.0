import React, { Component } from "react"
import ReactPlayer from "react-player"

export default class Streami extends Component {
    constructor(props) {
        super(props)
        this.state = {
            url: "https://www.youtube.com/watch?v=aJOTlE1K90k",
            volume: "",
            seek: "",
            duration: "",
            mute: "",
            play: "",
        }

        this.fetchData = this.fetchData.bind(this)
        this.handlePause = this.handlePause.bind(this)
        this.handlePlay = this.handlePlay.bind(this)
        this.onDuration = this.onDuration.bind(this)
        this.onProgress = this.onProgress.bind(this)
        //this.onSeek = this.onSeek.bind(this);
    }

    fetchData() {
        fetch("http://localhost:8000/api/song/")
            .then(results => {
                return results.json()
            })
            .then(data => {
                var volume = data["volume"]
                this.player.seekTo(parseFloat(data["seek"]))
                this.setState({
                    volume: volume,
                    url: data["url"],
                    seek: data["seek"],
                    mute: data["mute"],
                    play: data["play"],
                    duration: data["duration"],
                })
            })
    }

    handlePause = () => {
        var data_format = {
            url: "",
            volume: "",
            duration: "",
            seek: "",
            play: false,
            mute: "",
            message: "",
        }
        this.connection.send(JSON.stringify(data_format))
    }
    handlePlay = () => {
        var data_format = {
            url: "",
            volume: "",
            duration: "",
            seek: "",
            play: true,
            mute: "",
            message: "",
        }
        this.connection.send(JSON.stringify(data_format))
    }

    onDuration = () => {
        var a = this.player.getDuration()
        this.setState({ duration: a })
        var data_format = {
            url: "",
            volume: "",
            duration: a,
            seek: "",
            play: "",
            mute: "",
            message: "",
        }
        this.connection.send(JSON.stringify(data_format))
    }
    onProgress = () => {
        var a = this.player.getCurrentTime()
        console.log(a)
        this.setState({ seek: a })
        // var data_format =  {
        //             'url': "",
        //             'volume': "",
        //             'duration': "",
        //             'seek': a,
        //             'play': "",
        //             'mute': "",
        //             'message': ""
        //         }
        // this.connection.send(JSON.stringify(data_format));
    }

    componentDidMount() {
        this.fetchData()
        this.connection = new WebSocket("ws://localhost:8000/ws/stream/")
        this.connection.onopen = () => {
            console.log("Main Stream Player connected")
        }
        this.connection.onmessage = e => {
            var data = JSON.parse(e.data)
            var url = data["url"]
            var volume = data["volume"]
            var seek = data["seek"]
            var duration = data["duration"]
            var mute = data["mute"]
            var play = data["play"]
            if (url !== "") this.setState({ url: url })

            if (volume !== "") this.setState({ volume: volume })

            if (seek !== "") {
                console.log(this.state.seek)
                var seek2 = parseFloat(seek)
                this.setState({ seek: seek })
                this.player.seekTo(seek2)
            }
            if (duration !== "") this.setState({ duration: duration })

            if (mute !== "") this.setState({ mute: mute })

            if (play !== "") this.setState({ play: play })
        }
    }
    ref = player => {
        this.player = player
    }

    render() {
        return (
            <div>
                <ReactPlayer
                    ref={this.ref}
                    url={this.state.url}
                    className="react-player"
                    playing={this.state.play}
                    width="200%"
                    height="200%"
                    controls={false}
                    muted={this.state.mute}
                    onPause={this.handlePause}
                    onPlay={this.handlePlay}
                    volume={this.state.volume / 100}
                    onDuration={this.onDuration}
                    onProgress={this.onProgress}
                    //onSeek={this.onSeek}
                />
                {this.state.seek}
            </div>
        )
    }
}
