import React, { Component } from 'react';
import axios from 'axios';
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
      toggleBG:       '#0a398c',
      user:           false
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

  postComment = (evt) => {
    evt.preventDefault();
    const self = this
    var forminput = document.getElementById('comment').value
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

  // POPUP && FORM COMPONENT
  showPopup = (pin) => {
    return(
      <this.props.PinPopupClass
        pin={pin}
        deletePin={this.deletePin}
      />
    )
  }

  handlePopupClick = (pin) => {
    this.sendPostRequestForPins()
    this.setState({
      clickedMarker: {isClicked: true, pin: pin}
    })
  }

  // MARKER COMPONENT
  renderMarker = (pin, index) => {
    return (
      <this.props.PinClass
        index={index}
        pin={pin}
        handlePopupClick={this.handlePopupClick}
      />

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
    let newDropPinBackground = this.state.isDropPin.on ? "#0a398c" : "    #d75766";

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

    // MAP COMPONENT:
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
