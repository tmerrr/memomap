import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './component/App';
// import Map from './component/Map';
import registerServiceWorker from './registerServiceWorker';
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";

const Map = ReactMapboxGl({
  accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA'
});




ReactDOM.render(<Map
  style="mapbox://styles/mapbox/streets-v9"
  containerStyle={{
    height: "100vh",
    width: "100vw"
  }}>
    <Layer
      type="symbol"
      id="marker"
      layout={{ "icon-image": "marker-15", "icon-size": 5 }}>
      <Feature coordinates={[-0.481747846041145, 51.3233379650232]}
               onHover={this._onHover}
               onEndHover={this._onEndHover}
               onClick={this._onClickMarker}
      />
    </Layer>
</Map>

      , document.getElementById('root'));
registerServiceWorker();
