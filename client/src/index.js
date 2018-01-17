import React from 'react';
import ReactDOM from 'react-dom';
import App from './component/App'
import Geocoder from './component/Geocoder'
import ReactMapboxGl from 'react-mapbox-gl';

import Pin from './component/Pin'
import PinPopup from './component/PinPopup'

const Map = ReactMapboxGl({
  accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA'
});


ReactDOM.render(
  <App
    MapClass={Map}
    GeocoderClass={Geocoder}
    PinClass={Pin}
    PinPopupClass={PinPopup}
  />,
  document.getElementById('root')
)
