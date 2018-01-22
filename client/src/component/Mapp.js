import React, { Component } from 'react';

import Geocoder from './Geocoder'
import Sidebar from './Sidebar'
import Hamburger from './Hamburger'
import Pin from './Pin';
import PinPopup from './PinPopup';
import PinToggle from './PinToggle'


export default class Mapp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isDropPin: { on: false },
      isSidebarActive: false,
      isHamburgerActive: true
    }
  }

  dropPin = (map, evt) => {
    this.props.resetActiveMarker();
    if (this.state.isDropPin.on) {
      this.toggleDropPin()
      this.props.createNewPin(map, evt)
    }
    this.props.sendPostRequestForPins()
  }

  showPopup = (pin) => {
    console.log(pin)
    return(
      <PinPopup
        pin={pin}
        deletePin={this.props.deletePin}
      />
    )
  }

  clickHamburger = () => {
    let newSidebarStatus;
    let newHamburgerStatus;
    if (this.state.isHamburgerActive) {
      newSidebarStatus    = true;
      newHamburgerStatus  = false;
    } else {
      newSidebarStatus    = false;
      newHamburgerStatus  = true;
    }
    this.setState({
      isSidebarActive  : newSidebarStatus,
      isHamburgerActive: newHamburgerStatus
    })
  }

  renderPin = (pin, index) => {
    return (
      <Pin
        key={index}
        index={index}
        pin={pin}
        handlePopupClick={this.props.handlePinClick}
      />
    )
  }

  toggleDropPin = () => {
    let newDropPinStatus = this.state.isDropPin.on ? false : true;
    this.setState({
      activePin:  { isClicked: false },
      isDropPin: { on: newDropPinStatus }
    });
    this.props.sendPostRequestForPins()
  }

  render() {
    let hamburger;
    if (this.state.isHamburgerActive) {
      hamburger = (
        <Hamburger clickHamburger={this.clickHamburger} />
      )
    }

    let sidebar;
    if (this.state.isSidebarActive) {
      sidebar = (
        <Sidebar
          clickHamburger={this.clickHamburger}
          userDetails={this.props.userDetails}
          pins={this.props.pins}
          logout={this.props.logout}
        />
      )
    }

    let allPins = this.props.pins.map((pin, index) => {
      return this.renderPin(pin, index)
    })

    return(
      <div>
        {hamburger}
        {sidebar}
        <PinToggle
          handleClick={this.toggleDropPin}
          isDropPin={this.state.isDropPin}
        />
        <this.props.MapClass
          style="mapbox://styles/mapbox/streets-v9"
          containerStyle={{
            height: "100vh",
            width: "100vw"
          }}
          onClick={this.dropPin}
          >
            {allPins}
            <Geocoder />
            {this.props.activePin.isClicked ? this.showPopup(this.props.activePin.pin) : null}
          </this.props.MapClass>
        </div>
    )
  }
}
