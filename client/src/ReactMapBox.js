import ReactMapBoxGl, { Layer, Feature } from "react-mapbox-gl";
import React from "react";

class MapTrial extends React.Component {
  render(){
    return(

      <div>
      <ReactMapBoxGl
        style="mapbox://styles/mapbox/streets-v8"
        accessToken="pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA"

        containerStyle={{
          height: "80vh",
          weight: "100vw"
        }}>

        <Layer
          type="symbol"
          id="marker"
          layout={{ "icon-image" : "1"}}>
          <Feature coordinates={[-0.0733, 51.5171]}/>
        </Layer>
       </ReactMapBoxGl>
      </div>
    )
  }
}

export default MapTrial;
