import React, { Component } from 'react';
import { Popup } from "react-mapbox-gl";
import { Marker } from "react-mapbox-gl";
import axios from 'axios';
import Form from './form';
import Sidebar from './Sidebar'
import Hamburger from './Hamburger'
import PinToggle from './PinToggle'
import LogIn from './login.js';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pins: [],
      clickedMarker:  { isClicked: false },
      isDropPin:      { on: false },
      sidebar:        false,
      hamburger:      true,
      toggleBG:       'red',
      user:           false
    }
  }

  sendPostRequestForPins = () => {
    let newPins = []
    axios.post('/pins/users_pins', {
      userFbId: this.state.user.id
    })
    .then((res) => {
      console.log(res)
      res.data.forEach((pin) => {
        newPins.push(pin)
      })
      this.setState({
        pins: newPins
      })
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  postComment = (evt) => {
    evt.preventDefault();
    const self = this
    var forminput = document.getElementById('comment').value
    console.log(forminput)
    axios.post('/pins/update', {
      comment: forminput,
      _id: this.state.clickedMarker.pin._id
    })
    .then(function(response) {
      console.log(response)
      self.sendPostRequestForPins()
    })
    .catch(function(error) {
      console.log(error)
    })
  }

  deletePin = (evt) => {
    evt.preventDefault();
    const self = this
    axios.post('pins/delete', {
      _id: this.state.clickedMarker.pin._id
    })
    .then((res) => {
      console.log(res)
      self.sendPostRequestForPins();
    })
    .catch((error) => {
      console.log(error)
    })
    this.setState({ clickedMarker: { isClicked: false } })
  }

  showPopup = (pin) => {
    return(
      <Popup
        coordinates={[pin.longitude, pin.latitude]}
        offset={{
          'bottom-left': [12, -38], 'bottom': [0, -38], 'bottom-right': [-12, -38]
        }}
      >
        <Form
          pin={pin}
          deletePin={this.deletePin}
         />
      </Popup>
    )
  }

  handlePopupClick = (pin) => {
    this.sendPostRequestForPins()
    this.setState({
      clickedMarker: {isClicked: true, pin: pin}
    })
  }

  renderMarker = (pin, index) => {
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

  handleClick = (map, evt) => {
    const self = this
    this.setState({
      clickedMarker: { isClicked: false }
    })
    if (this.state.isDropPin.on ) {
      this.toggleDropPin()
      axios.post('/pins/new', {
        longitude:  evt.lngLat.lng,
        latitude:   evt.lngLat.lat,
        userFbId:   this.state.user.id
      })
      .then(function(response) {
        console.log(response)
        self.sendPostRequestForPins();
      })
      .catch(function(error) {
        console.log(error)
      });
    }
    this.sendPostRequestForPins()
  }

  toggleDropPin = () => {
    let newDropPinStatus = this.state.isDropPin.on ? false : true;
    let newDropPinBackground = this.state.isDropPin.on ? "red" : "blue";
    this.setState({
      isDropPin: { on: newDropPinStatus },
      toggleBG: newDropPinBackground
    });
  }

  clickHamburger = () => {
    if(this.state.hamburger === true) {
      this.setState({
        sidebar: true,
        hamburger: false
      })
    } else {
      this.setState({
        sidebar: false,
        hamburger: true
      })
    }
  }

  sendLoginRequest = (data) => {
    axios.post('/users/login', {
      fbId:  data.id,
      name:  data.name,
      email: data.email,
      imageUrl: data.imageUrl
    })
  }

  login = (facebookResponse) => {
    console.log(facebookResponse)
    if (facebookResponse.status != 'not_authorized') {
      this.sendLoginRequest(facebookResponse)
      this.setState({
        user: facebookResponse
      })
      this.sendPostRequestForPins();
    }
  }

  logout = () => {
    this.setState({
      user: false
    })
  }

  render() {
    var sidebar = null

    if (this.state.sidebar) {
      sidebar = (
        <Sidebar
          clickHamburger={this.clickHamburger}
          userDetails={this.state.user}
          pins={this.state.pins}
          logout={this.logout}/>
      )
    }

    var hamburger = null

    if (this.state.hamburger){
      hamburger = (
        <Hamburger clickHamburger={this.clickHamburger} />
      )
    }

    const allPins = this.state.pins.map((pin, index) => {
      return this.renderMarker(pin, index)
    })

    const loginContainer = <LogIn responseFacebook={this.login} />

    const MapContainer = (
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

    return this.state.user ? MapContainer : loginContainer
  }
}

export default App;
