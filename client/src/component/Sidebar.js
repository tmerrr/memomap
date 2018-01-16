import React, { Component } from 'react';

class PinToggle extends Component{
  constructor(props){
    super(props)
    this.memoryChecker = this.memoryChecker.bind(this)
  }

  memoryChecker(number) {
    if (number === 1) {
      return "You have " + number + " memory"
    } else {
      return "You have " + number + " memories"
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
        <button name="hamburger" onClick={this.props.clickHamburger}>Close Menu</button>
        <h1>{this.memoryChecker(this.props.numberOfMemories)}</h1>
      </div>
    )
  }
}

export default PinToggle;
