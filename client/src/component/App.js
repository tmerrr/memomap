import React, { Component } from 'react';
import { Popup } from "react-mapbox-gl";
import { Marker } from "react-mapbox-gl";
import axios from 'axios';

import Form from './form';

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
    this.sendGetRequest()
    // this.setState({
    //   clickedMarker: {comment: forminput}
    // })
    console.log("HERE", this.state)
  }

  showPopup(lng, lat, comment) {
    console.log(this.state.clickedMarker.comment)
    console.log(this.state.clickedMarker._id)
    return(
      <Popup
      coordinates={[lng, lat]}

      offset={{
        'bottom-left': [12, -38], 'bottom': [0, -38], 'bottom-right': [-12, -38]
      }}
    >
      <Form comment={comment} id={this.state.clickedMarker._id}/>
    </Popup>
  )
  }

  handlePopupClick(lng, lat, _id, comment) {
     console.log(comment)
     this.sendGetRequest()
    this.setState({
      clickedMarker: {isClicked: true, lng: lng, lat: lat, _id: _id, comment: comment}
    })
  }

  renderMarker(lng, lat, index, _id, comment){
    console.log("comment", comment)
    console.log("ID", _id)
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
    this.sendGetRequest()
  }

  render() {
    const allPins = this.state.pins.map((pin, index) => {
      return this.renderMarker(pin.lng, pin.lat, index, pin._id, pin.comment)
    })
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
