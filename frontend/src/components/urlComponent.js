import React, { Component } from "react"

const API_KEY = "AIzaSyCwloS7hx6u8fvT4P2SzX06lizxuMrX828"

export default class SearchBaro extends Component {
    constructor(props) {
        super(props)
        this.state = {
            resultyt: [],
            tityt: [],
            imgyt: [],
            url: "",
        }
        this.fetchUrlData = this.fetchUrlData.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleChange2 = this.handleChange2.bind(this)
        this.handle = this.handle.bind(this)
    }

    fetchUrlData() {
        fetch("http://localhost:8000/api/song/")
            .then(results => {
                return results.json()
            })
            .then(data => {
                this.setState({ url: data["url"] })
            })
    }

    handle = (id, e) => {
        const url = this.state.resultyt[id]
        this.setState({ url: url })

        var data_format = {
            url: url,
            volume: "",
            duration: "",
            seek: "1",
            play: "",
            mute: "",
            message: "",
        }
        this.connection.send(JSON.stringify(data_format))
    }

    handleChange2 = e => {
        const url = document.getElementById("lol2").value
        this.setState({ url: url })

        var data_format = {
            url: url,
            volume: "",
            duration: "",
            seek: "",
            play: "",
            mute: "",
            message: "",
        }
        this.connection.send(JSON.stringify(data_format))
    }

    handleChange = e => {
        e.preventDefault()
        var a = document.getElementById("lol").value
        let URL =
            "https://www.googleapis.com/youtube/v3/search?part=snippet&key=" +
            API_KEY +
            "&maxResults=5&q=" +
            a
        fetch(URL)
            .then(response => response.json())
            .then(responseJson => {
                const resultyt = responseJson.items.map(
                    obj => "https://www.youtube.com/watch?v=" + obj.id.videoId
                )
                const tityt = responseJson.items.map(obj => obj.snippet.title)
                const imgyt = responseJson.items.map(
                    obj => obj.snippet.thumbnails.default.url
                )
                this.setState({
                    resultyt: resultyt,
                    tityt: tityt,
                    imgyt: imgyt,
                })
            })
    }

    componentDidMount() {
        this.fetchUrlData()
        this.connection = new WebSocket("ws://localhost:8000/ws/stream/")
        this.connection.onopen = () => {
            console.log("URL  Socket connected")
        }

        this.connection.onmessage = e => {
            var data = JSON.parse(e.data)
            var url = data["url"]
            url === "" ? void 0 : this.setState({ url: url })
        }
    }

    componentWillUnmount() {
        this.connection.onclose = e => {
            console.error("URL Socket Closed Unexpectedly")
        }
    }

    render() {
        return (
            <div>
                <input type="text" id="lol" />
                <input
                    type="submit"
                    id="myBtn"
                    value="search"
                    onClick={this.handleChange}
                />{" "}
                <br />
                <input type="text" id="lol2" placeholder="Enter URL" />
                <input
                    type="submit"
                    value="Enter"
                    onClick={this.handleChange2}
                />{" "}
                <br />
                <div onClick={e => this.handle(0, e)}>
                    <img src={this.state.imgyt[0]} alt="" />
                    <p id="d0"> {this.state.tityt[0]}</p>
                </div>{" "}
                <br />
                <div onClick={e => this.handle(1, e)}>
                    <img src={this.state.imgyt[1]} alt="" />
                    <p id="d1"> {this.state.tityt[1]}</p>
                </div>{" "}
                <br />
                <div onClick={e => this.handle(2, e)}>
                    <img src={this.state.imgyt[2]} alt="" />
                    <p id="d2"> {this.state.tityt[2]}</p>
                </div>{" "}
                <br />
                <div onClick={e => this.handle(3, e)}>
                    <img src={this.state.imgyt[3]} alt="" />
                    <p id="d3"> {this.state.tityt[3]}</p>
                </div>{" "}
                <br />
                <div onClick={e => this.handle(4, e)}>
                    <img src={this.state.imgyt[4]} alt="" />
                    <p id="d4"> {this.state.tityt[4]}</p>
                </div>{" "}
                <br />
            </div>
        )
    }
}
