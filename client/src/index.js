import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './component/App';
// import Map from './component/Map';
import registerServiceWorker from './registerServiceWorker';
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";

const Map = ReactMapboxGl({
  accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA'
});


class MainApp extends Component {
  constructor(props) {
    super(props)
    this.renderFeature = this.renderFeature.bind(this)
    this.renderMarker = this.renderMarker.bind(this)
    this.addPinToArray = this.addPinToArray.bind(this)
    this.state = { pins: [] }
  }

  renderFeature(long, lat) {
    return(
      <Feature coordinates={[long, lat]}
        onHover={this._onHover}
        onEndHover={this._onEndHover}
        onClick={this._onClickMarker}
      />
    )
  }

  _onClickMarker() {
    console.log('sup!')
  }

  renderMarker() {
    console.log('hello')
    return(
      <Layer
        type="symbol"
        id="marker"
        layout={{ "icon-image": "marker-15", "icon-size": 5 }}>
        {/* {this.renderFeature(-0.073517, 51.517337)} */}
        {this.renderFeature((Math.random() * 50), (Math.random() * 30))}
      </Layer>
    )
  }

  addPinToArray() {
    let newPins = this.state.pins.slice();
    let pin = this.renderMarker()
    newPins.push(pin);
    this.setState({ pins: newPins })
  }

  handleClick() {
    console.log('this ran')
  }

  renderPinsToMap() {

  }

  render() {
    return (
      <Map
        style="mapbox://styles/mapbox/streets-v9"
        containerStyle={{
          height: "100vh",
          width: "100vw"
        }}
        onClick={this.addPinToArray}
      >

      </Map>

    )
  }
}


ReactDOM.render(<MainApp />, document.getElementById('root'))
registerServiceWorker();
