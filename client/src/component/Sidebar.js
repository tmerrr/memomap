import React, { Component } from 'react';


class Sidebar extends Component{

  memoryChecker = (number) => {
    if (number === 1) {
      return "You have " + number + " memory"
    } else {
      return "You have " + number + " memories"
    }
  }

  getnumberOf = (activity) => {
    let type = this.props.pins.filter(pin => pin.activity === activity)
    return type.length

  }

  travellerType = () => {
    if (this.props.pins.length < 5) {
      return 'Hermit'
    } else if (this.props.pins.length < 10) {
      return 'House Cat'
    } else if (this.props.pins.length < 20){
      return 'Swallow'
    } else if (this.props.pins.length < 30){
      return 'Atlantic Salmon'
    } else {
      return 'Wandering Albatross'
    }
  }

  render(){
    return(
      <div
        style={{position: "absolute",
          backgroundColor: "#0784f798",
          width: "20vw",
          height: "100vh",
          left: 0,
          top: 0,
          zIndex: 1000
        }}
        >
        <h1>{this.props.userDetails.name}</h1>
        <h2>{this.props.userDetails.email}</h2>
        <img src={this.props.userDetails.picture.data.url}/>
        <button name="hamburger" onClick={this.props.clickHamburger}>Close Menu</button>
        <button name="logout" onClick={this.props.logout}>Logout</button>
        <h3>{this.memoryChecker(this.props.pins.length)}</h3>
        <h4> Nature: {this.getnumberOf("Nature")} </h4>
        <h4> Monument: {this.getnumberOf("Monuments")} </h4>
        <h4> Restaurant: {this.getnumberOf("Restaurant")} </h4>
        <h4> Activity: {this.getnumberOf("Activity")} </h4>
        <h4> traveller level: {this.travellerType()} </h4>
      </div>
    )
  }
}

export default Sidebar;
