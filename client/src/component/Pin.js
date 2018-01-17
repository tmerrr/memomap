import React, { Component } from 'react';
import { Marker } from "react-mapbox-gl";
import styles from '../styles/Pin.css'

export default class Pin extends Component {
  render() {
    return(
      <Marker
        key={this.props.index}
        id={this.props.pin._id}
        coordinates={[this.props.pin.longitude, this.props.pin.latitude]}
        onClick={() => this.props.handlePopupClick(this.props.pin)}
        anchor="bottom"
        >
          <img id="pin" src={"1.png"} alt="pin" style={{"width": "60px"}}/>
        </Marker>
    )
  }
}
