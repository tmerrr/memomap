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
    this.state = {
      
    }
    this.renderFeature = this.renderFeature.bind(this)
    this.renderMarker = this.renderMarker.bind(this)
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

  // _onClickMarker() {
  //   console.log('sup!')
  // }

  renderMarker() {
    console.log('hello')
    this.setState({
      layer: <Layer
        type="symbol"
        id="marker"
        layout={{ "icon-image": "marker-15", "icon-size": 5 }}>
        {this.renderFeature(-0.073517, 51.517337)}
      </Layer>
    })
  }
  //
  // handleClick() {
  //   console.log('this ran')
  // }

  render() {
    return (
      <Map
        style="mapbox://styles/mapbox/streets-v9"
        containerStyle={{
          height: "100vh",
          width: "100vw"
        }}
        onClick={this.renderMarker}
      >
      { this.state.layer ? this.state.layer : null }
      </Map>

    )
  }
}


ReactDOM.render(<MainApp />, document.getElementById('root'))
registerServiceWorker();
