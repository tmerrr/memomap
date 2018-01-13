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
        {lng: pin.longitude, lat: pin.latitude , _id: pin._id, comment: pin.comment}
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
    var forminput = document.getElementById('comment').value
    axios.post('/pins/update', {
      comment: forminput,
      _id: this.state.clickedMarker._id
    })
    .then(function(response) {
      console.log(response)
    })
    .catch(function(error) {
      console.log(error)
    })
  }

  showPopup(lng, lat, comment) {
    console.log(comment)
    return(
      <Popup
      coordinates={[lng, lat]}
    
      offset={{
        'bottom-left': [12, -38], 'bottom': [0, -38], 'bottom-right': [-12, -38]
      }}
    >
      <form >
        <input id="comment" type="text" name="name"></input>
        <button onClick={this.postComment} type="submit">"Click Me"</button>
        <h1> {comment} </h1>
      </form>
    </Popup>
  )
  }

  handlePopupClick(lng, lat, _id, comment) {
     console.log(comment)
    this.setState({
      clickedMarker: {isClicked: true, lng: lng, lat: lat, _id: _id, comment: comment}
    })
  }

  renderMarker(lng, lat, index, _id, comment){
    console.log(comment)
    return (
      <Marker
        key={index}
        id={_id}
        coordinates={[lng, lat]}
        comment={comment}
        onClick={() => this.handlePopupClick(lng, lat, _id, comment)}
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
      console.log(pin.comment)
      return this.renderMarker(pin.lng, pin.lat, index, pin._id, pin.comment)
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
      {this.state.clickedMarker.isClicked ? this.showPopup(this.state.clickedMarker.lng, this.state.clickedMarker.lat, this.state.clickedMarker.comment) : null}
    </this.props.MapClass>
    )
  }
}

export default App;
