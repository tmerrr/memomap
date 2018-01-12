import React from 'react';
import ReactDOM from 'react-dom';
import App from './component/App'
import ReactMapboxGl, { Feature, Layer } from 'react-mapbox-gl';

const Map = ReactMapboxGl({
  accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA'
});

ReactDOM.render(
  <App
    FeatureClass={Feature}
    LayerClass={Layer}
    MapClass={Map}
  />,
  document.getElementById('root')
)
