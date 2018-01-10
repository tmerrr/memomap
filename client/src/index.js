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
    this.onClick = this.handleClick.bind(this)
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

  renderMarker() {
    return(
      <Layer
        type="symbol"
        id="marker"
        layout={{ "icon-image": "marker-15", "icon-size": 5 }}>
        {this.renderFeature(-0.073517, 51.517337)}
      </Layer>
    )
  }

  handleClick(e) {
    console.log('this ran')
  }

  render() {
    return (
      <Map
        style="mapbox://styles/mapbox/streets-v9"
        containerStyle={{
          height: "100vh",
          width: "100vw"
        }}
      >
        {this.renderMarker()}
      </Map>

    )
  }
}


ReactDOM.render(<MainApp onClick={(e) => this.handleClick(e)}/>, document.getElementById('root'))
registerServiceWorker();
