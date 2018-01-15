import React, { Component } from 'react';
import { Popup } from "react-mapbox-gl";
import { Marker } from "react-mapbox-gl";
import axios from 'axios';

import Form from './form';
import Sidebar from './Sidebar'
import Hamburger from './Hamburger'
import PinToggle from './PinToggle'

class App extends Component {
  constructor(props) {
    super(props)
    this.sendGetRequest = this.sendGetRequest.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.showPopup = this.showPopup.bind(this)
    this.postComment = this.postComment.bind(this)
    this.toggleDropPin = this.toggleDropPin.bind(this)
    this.clickHamburger = this.clickHamburger.bind(this)

    this.state = {
      pins: [],
      clickedMarker: { isClicked: false },
      isDropPin: { on: false },
      sidebar: false,
      hamburger: true,
      toggleBG: 'red'
    }
  }

  componentWillMount() {
    this.sendGetRequest();
  }

  sendGetRequest() {
    axios.get('/pins')
    .then((response) => {
      console.log(response.data)
      let pinsArray = response.data.map(pin => pin)
      this.setState({
        pins: pinsArray,
        numberOfMemories: pinsArray.length
      })
      console.log(this.state.pins)
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
  }

  showPopup(pin) {
    console.log(pin)
    return(
      <Popup
      coordinates={[pin.longitude, pin.latitude]}
      offset={{
        'bottom-left': [12, -38], 'bottom': [0, -38], 'bottom-right': [-12, -38]
      }}
    >
      <Form pin={pin} />
    </Popup>
  )
  }

  handlePopupClick(pin) {
    console.log(pin)
    this.sendGetRequest()
    this.setState({
      clickedMarker: {isClicked: true, pin: pin}
    })
  }

  renderMarker(pin,index){
    console.log(pin)
    return (
      <Marker
        key={index}
        id={pin._id}
        coordinates={[pin.longitude, pin.latitude]}
        onClick={() => this.handlePopupClick(pin)}
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
    if (this.state.isDropPin.on ) {
      this.toggleDropPin()
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
  }

  toggleDropPin() {
    let newDropPinStatus = this.state.isDropPin.on ? false : true;
    let newDropPinBackground = this.state.isDropPin.on ? "red" : "blue";
    this.setState({
      isDropPin: { on: newDropPinStatus },
      toggleBG: newDropPinBackground
    });
  }

  clickHamburger(){
    if(this.state.hamburger === true){
      this.setState({
        sidebar: true,
        hamburger: false
      })
    }

    else {
      this.setState({
        sidebar: false,
        hamburger: true
      })
    }
  }

  render() {
    var sidebar = null

    if (this.state.sidebar) {
      sidebar = (
        <Sidebar numberOfMemories={this.state.numberOfMemories} clickHamburger={this.clickHamburger}/>
      )
    }

    var hamburger = null

    if (this.state.hamburger){
      hamburger = (
        <Hamburger clickHamburger={this.clickHamburger}/>
      )
    }

    const allPins = this.state.pins.map((pin, index) => {
      return this.renderMarker(pin, index)
    })
    console.log(this.state.clickedMarker.pin)
    return (
      <div>

        {hamburger}
        {sidebar}
        <PinToggle toggleBG={this.state.toggleBG} toggleDropPin={this.toggleDropPin}/>
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
          {this.state.clickedMarker.isClicked ? this.showPopup(this.state.clickedMarker.pin) : null}
        </this.props.MapClass>

      </div>
    )
  }
}

export default App;
