import React, { Component } from 'react';
import { Popup } from "react-mapbox-gl";
import { Marker } from "react-mapbox-gl";
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props)
    this.sendGetRequest = this.sendGetRequest.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.showPopup = this.showPopup.bind(this)
    this.postComment = this.postComment.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.state = {
      pins: [],
      comments: [],
      clickedMarker: { isClicked: false }
    }
  }

  componentDidMount() {
    this.sendGetRequest();
  }

  sendGetRequest() {
    let pinsArray = this.state.pins.slice()
    axios.get('/pins')
    .then((response) => {
      console.log(response.data[0])
      response.data.map((pin) => pinsArray.push(
        {lng: pin.longitude, lat: pin.latitude , _id: pin._id, title: pin.title, caption: pin.caption}
      ))
      this.setState({
        pins: pinsArray,
      })
    })
    .catch(function (error) {
      console.log(error)
    })
  }

  postComment(evt){
    evt.preventDefault();
    var caption = document.getElementById('caption').value
    var title = document.getElementById('title').value
    axios.post('/pins/update', {
      title: title,
      caption: caption,
      _id: this.state.clickedMarker._id
    })
    .then(function(response) {
      console.log(response)
    })
    .catch(function(error) {
      console.log(error)
    })
  }

  showPopup(lng, lat, title, caption) {
    return(
      <Popup
      coordinates={[lng, lat]}
      offset={{
        'bottom-left': [12, -38], 'bottom': [0, -38], 'bottom-right': [-12, -38]
      }}
    >
      <form >
        <h2> Title </h2>
        <input id="title" type="text" name="name"></input>
        <h3> Caption </h3>
        <input id="caption" type="text" name="name"></input>
        <button onClick={this.postComment} type="submit">"Click Me"</button>
        <h1> {title} </h1>
        <h2> {caption} </h2>
      </form>
    </Popup>
  )
  }

  handlePopupClick(lng, lat, _id, title, caption) {
    this.setState({
      clickedMarker: {isClicked: true, lng: lng, lat: lat, _id: _id, title: title, caption: caption}
    })
  }

  renderMarker(lng, lat, index, _id, title, caption){
    return (
      <Marker
        key={index}
        id={_id}
        coordinates={[lng, lat]}
        title={title}
        caption={caption}
        onClick={() => this.handlePopupClick(lng, lat, _id, title, caption)}
        anchor="bottom"
      >
        <img src={"1.png"} alt="pin" style={{"width": "60px"}}/>
      </Marker>
    )
  }

  handleClick(map, evt) {
    this.setState({

      clickedMarker: { isClicked: false }
    })
    let pinsArray = this.state.pins.slice()
    pinsArray.push(evt.lngLat)
    this.setState({
      pins: pinsArray
    })
    axios.post('/pins/new', {
      longitude: evt.lngLat.lng,
      latitude: evt.lngLat.lat
    })
    .then(function(response) {
      console.log(response)
    })
    .catch(function(error) {
      console.log(error)
    });
  }

  render() {
    const allPins = this.state.pins.map((pin, index) => {
      return this.renderMarker(pin.lng, pin.lat, index, pin._id, pin.title, pin.caption)
    })
    console.log(allPins)
    return (
      <this.props.MapClass
        style="mapbox://styles/mapbox/streets-v9"
        containerStyle={{
          height: "100vh",
          width: "100vw"
        }}
        onClick={this.handleClick}
      >
      {allPins}
      <this.props.GeocoderClass />
      {this.state.clickedMarker.isClicked ? this.showPopup(this.state.clickedMarker.lng, this.state.clickedMarker.lat, this.state.clickedMarker.title, this.state.clickedMarker.caption) : null}
    </this.props.MapClass>
    )
  }
}

export default App;
