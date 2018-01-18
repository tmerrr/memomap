import React, { Component } from 'react';
import '../styles/travellerType.css';

export default class TravellerType extends Component {

render() {
  return(
    <div>
      <h4 id="headers"> Currently, you are a {this.props.animal.name}</h4>
      <img className="animal" src={this.props.animal.imageUrl} />
    </div>
  )
}

}
