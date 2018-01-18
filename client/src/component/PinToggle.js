import React, { Component } from 'react';
import styles from '../styles/pinToggle.css'

class PinToggle extends Component{

  render() {
    var color = this.props.isDropPin.on ? "#0a398c" : "#d75766";
    return(
      <div>
      <button
        id="button"
        style={{backgroundColor: color}}
        onClick={this.props.handleClick}
      >
        Enable Map
      </button>
      </div>
    )
  }
}

export default PinToggle;
