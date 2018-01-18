import React, { Component } from 'react';
import { Popup } from "react-mapbox-gl";
import Form from './form';
import PinContent from './PinContent';
import '../styles/pinPopup.css';

export default class PinPopup extends Component {

  componentWillReceiveProps(newProps){
    this.setState({
      pin: newProps.pin
    })
  }

  componentWillMount() {
    this.setState({
      pin: this.props.pin
    })
  }

  reRenderPinPopup = (pin) => {
    this.setState({
      pin: {
        userFbId: this.props.pin.userFbId,
        _id: this.props.pin._id,
        longitude: this.props.pin.longitude,
        latitude: this.props.pin.latitude,
        place: pin.place,
        memory: pin.memory,
        imageurl: pin.imageurl,
        activity: pin.activity,
        rating: pin.rating,
        date: pin.date
      }
    })
  }

  renderPopupBody = () => {
    if(this.state.pin.place) {
      return <PinContent pin={this.state.pin} />
    } else {
      return (
        <Form
          pin={this.state.pin}
          reRenderPinPopup={this.reRenderPinPopup}
        />

      )
    }
  }
  render() {
    return(
      <div id="try">
      <Popup
        coordinates={[this.props.pin.longitude, this.props.pin.latitude]}
        offset={{
          'bottom-left': [12, -38], 'bottom': [0, -38], 'bottom-right': [-12, -38]
        }}
      >
        {this.renderPopupBody()}
        <button id="delete" onClick={this.props.deletePin}>Delete Pin</button>
      </Popup>
      </div>
    )
  }
}
