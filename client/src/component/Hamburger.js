import React, { Component } from 'react';
import styles from '../styles/Hamburger.css'

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
        <img id="slide" src="menumainicon.png"
         style={{position: "relative",
         top: 8,
         left: 20,
         width: 105,
         height: 80 }}/>
      </button>
    )
  }
}

export default Hamburger;
