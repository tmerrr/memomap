import React, { Component } from 'react';

class PinToggle extends Component{
  constructor(props){
    super(props)
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
      </div>
    )
  }
}

export default PinToggle;
