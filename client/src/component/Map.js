import React from 'react'
import ReactDOM from 'react-dom'
import mapboxgl from 'mapbox-gl'
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";

// mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

class Map extends Component {

  componentDidMount() {
    MapboxGl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA'

    new MapboxGl.Map({
      container: this.container,
      style: 'mapbox://styles/mapbox/light-v9'
    })
  }

  render() {
    return (
      <div className='Map' ref={(x) => { this.container = x }}>
      </div>
    )
  }
}

export default Map
