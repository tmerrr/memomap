import React, { Component } from 'react';
import { Popup } from "react-mapbox-gl";
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props)
    this.renderPin = this.renderPin.bind(this)
    this.renderLayer = this.renderLayer.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.state = { pins: [] }
  }

  componentDidMount() {
    let pinsArray = this.state.pins.slice()
    axios.get('/pins')
    .then((response) => {
      response.data.map((pin) => pinsArray.push({
        lng: pin.longitude, lat: pin.latitude
      }))
      this.setState({
        pins: pinsArray
      })
    })
    .catch(function (error) {
      console.log(error)
    })
  }

  renderPin(long, lat, index) {
    return(
      <this.props.FeatureClass
        key={index}
        coordinates={[long, lat]}
        onHover={this._onHover}
        onEndHover={this._onEndHover}
        onClick={this._onClickMarker}
      />
    )
  }

  renderLayer() {
    return(
      <this.props.LayerClass
        type="symbol"
        id="marker"
        layout={{ "icon-image": "marker-15", "icon-size": 5}}>
        {this.state.pins.map((pin, index) =>
            this.renderPin(pin.lng, pin.lat, index)
        )}
      </this.props.LayerClass>

    )
  }

  handleClick(map, evt) {
    let pinsArray = this.state.pins.slice()
    pinsArray.push(evt.lngLat)
    this.setState({
      pins: pinsArray
    })
    axios.post('/pins/new', {
      longitude: evt.lngLat.lng,
      latitude: evt.lngLat.lat
    })
    .then(function(response) {
      console.log(response)
    })
    .catch(function(error) {
      console.log(error)
    });
  }

  render() {

    return (
      <this.props.MapClass
        style="mapbox://styles/mapbox/streets-v9"
        containerStyle={{
          height: "100vh",
          width: "100vw"
        }}
        onClick={this.handleClick}
      >
      {this.renderLayer()}
      <Popup
      coordinates={[-0.13235092163085938,51.518250335096376]}
      offset={{
        'bottom-left': [12, -38],  'bottom': [0, -38], 'bottom-right': [-12, -38]
      }}>
      <h1>Hello</h1>
      </Popup>
    </this.props.MapClass>
    )
  }
}

export default App;
