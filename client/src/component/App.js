import React, { Component } from 'react';
import axios from 'axios';
import Mapp from './Mapp'
import LogIn from './login.js';

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pins      : [],
      activePin : { isClicked: false },
      user      : false
    }
  }

  sendPostRequestForPins = () => {
    let newPins = []
    axios.post('/pins/users_pins', {
      userFbId: this.state.user.id
    })
    .then((res) => {
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

  deletePin = (evt) => {
    evt.preventDefault();
    const self = this
    axios.post('pins/delete', {
      _id: self.state.activePin.pin._id
    })
    .then((res) => {
      console.log(res)
      self.sendPostRequestForPins();
    })
    .catch((error) => {
      console.log(error)
    })
    self.resetActiveMarker()
  }

  resetActiveMarker = () => {
    this.setState({
      activePin: { isClicked: false }
    })
  }

  dropPin = (map, evt) => {
    const self = this
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
      self.sendPostRequestForPins()
    }

  toggleDropPin = () => {
    let newDropPinStatus = this.state.isDropPin.on ? false : true;
    let newDropPinBackground = this.state.isDropPin.on ? "#d75766" : "#0a398c";

    this.setState({
      clickedMarker:  { isClicked: false },
      isDropPin: { on: newDropPinStatus },
      toggleBG: newDropPinBackground
    });
    this.sendPostRequestForPins()
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

  handlePinClick = (pin) => {
    this.sendPostRequestForPins()
    this.setState({
      activePin: { isClicked: true, pin: pin }
    })
  }

  logout = () => {
    this.setState({
      user: false
    })
  }

  render() {
    const loginContainer = <LogIn responseFacebook={this.login} />

    // MAP COMPONENT:
    const MapContainer = (
      <Mapp
        MapClass={this.props.MapClass}
        sendPostRequestForPins={this.sendPostRequestForPins}
        deletePin={this.deletePin}
        handlePinClick={this.handlePinClick}
        userDetails={this.state.user}
        pins={this.state.pins}
        logout={this.logout}
        activePin={this.state.activePin}
        createNewPin={this.dropPin}
        resetActiveMarker={this.resetActiveMarker}
      />
    )

    return this.state.user ? MapContainer : loginContainer
  }
}
