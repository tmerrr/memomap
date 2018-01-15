import React, { Component } from 'react';

class Hamburger extends Component{
  constructor(props){
    super(props)
  }

  render(){
    return(
      <button
        style={{position: "absolute",
        left: 0,
        top: 0,
        zIndex: 1000
        }}
        onClick={this.props.clickHamburger}
      >
        Hamburger
      </button>
    )
  }
}

export default Hamburger;
