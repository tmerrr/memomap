import React, { Component } from 'react';

class PinToggle extends Component{
  constructor(props){
    super(props)
    this.memoryChecker = this.memoryChecker.bind(this)
    this.getnumberOf = this.getnumberOf.bind(this)
  }

  memoryChecker(number) {
    if (number === 1) {
      return "You have " + number + " memory"
    } else {
      return "You have " + number + " memories"
    }
  }

  getnumberOf(activity) {
    let type = this.props.pins.filter(pin => pin.activity === activity)
    console.log(type.length)
    return type.length

  }

  render(){
    console.log(this.props.pins)
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
        <h3>{this.memoryChecker(this.props.numberOfMemories)}</h3>
        <h4> Nature: {this.getnumberOf("Nature")} </h4>
        <h4> Monument: {this.getnumberOf("Monuments")} </h4>
        <h4> Restaurant: {this.getnumberOf("Restaurant")} </h4>
        <h4> Activity: {this.getnumberOf("Activity")} </h4>
      </div>
    )
  }
}

export default PinToggle;
