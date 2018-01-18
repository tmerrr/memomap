import React, { Component } from 'react';
import styles from '../styles/pinToggle.css'

class PinToggle extends Component{
  constructor(props){
    super(props)
  }

  render() {
    var color = this.props.toggleBG
    return(
      <div>
      <button id="button" onClick={this.props.toggleDropPin}
              style={{ backgroundColor: color }}
      >
        Pin Drop: {this.props.toggleStatus ? "On" : "Off"}
      </button>
      </div>
    )
  }
}

export default PinToggle;
