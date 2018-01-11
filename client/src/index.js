import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './component/App';
// import Map from './component/Map';
import registerServiceWorker from './registerServiceWorker';
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import axios from 'axios';

const Map = ReactMapboxGl({
  accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA'
});


class MainApp extends Component {
  constructor(props) {
    super(props)
    this.renderPin = this.renderPin.bind(this)
    this.renderLayer = this.renderLayer.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.state = { pins: [] }
  }

  componentDidMount() {
    let self = this
    let pinsArray = this.state.pins
    axios.get('/pins')
    .then(function (response) { response.data.map((pin) => pinsArray.push({ lng: pin.longitude, lat: pin.latitude }))
      self.setState({
        pins: pinsArray
      })
    })
    .catch(function (error) {
    })
  }

  renderPin(long, lat, index) {
    return(
      <Feature
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
      <Layer
        type="symbol"
        id="marker"
        layout={{ "icon-image": "marker-15", "icon-size": 5 }}>
        {this.state.pins.map((pin, index) =>
          this.renderPin(pin.lng, pin.lat, index)
        )}
      </Layer>
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
    })
    .catch(function(error) {
    });
  }

  render() {

    return (
      <Map
        style="mapbox://styles/mapbox/streets-v9"
        containerStyle={{
          height: "100vh",
          width: "100vw"
        }}
        onClick={this.handleClick}
      >
      {this.renderLayer()}
      </Map>
    )
  }
}


ReactDOM.render(<MainApp />, document.getElementById('root'))
registerServiceWorker();
