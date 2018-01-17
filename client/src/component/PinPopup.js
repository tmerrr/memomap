import React, { Component } from 'react';
import { Popup } from "react-mapbox-gl";
import Form from './form';

export default class PinPopup extends Component {
  render() {
    return(
      <Popup
        coordinates={[this.props.pin.longitude, this.props.pin.latitude]}
        offset={{
          'bottom-left': [12, -38], 'bottom': [0, -38], 'bottom-right': [-12, -38]
        }}
      >
        <Form
          pin={this.props.pin}
          deletePin={this.props.deletePin}
        />
      </Popup>
    )
  }
}
