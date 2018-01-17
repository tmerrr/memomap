import React, { Component } from 'react';

export default class PinContent extends Component {

  render() {
    return (
      <div>
        <img src={this.props.pin.imageurl} alt="Image Uploaded" style={{"width": "150px"}}/>
        <h1>Place: {this.props.pin.place}</h1>
        <h2>Title: {this.props.pin.memory}</h2>
        <h5>Day: {this.props.pin.date}</h5>
        <h5>{this.props.pin.activity}</h5>
        <h5>Rating: {this.props.pin.rating}</h5>
      </div>
    )
  }
}
