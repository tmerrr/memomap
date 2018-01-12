import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props)
    this.sendGetRequest = this.sendGetRequest.bind(this)
    this.renderPin = this.renderPin.bind(this)
    this.renderLayer = this.renderLayer.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.state = { pins: [] }
  }

  componentDidMount() {
    this.sendGetRequest();
  }

  sendGetRequest() {
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
        layout={{ "icon-image": "marker-15", "icon-size": 5 }}>
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
      <this.props.GeocoderClass />
    </this.props.MapClass>
    )
  }
}

export default App;
