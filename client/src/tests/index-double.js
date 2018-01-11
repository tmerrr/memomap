import React, { Component } from 'react';

export class FeatureDouble extends Component {

}

export class LayerDouble extends Component {

}

export class MapDouble extends Component {

}

export class MainAppDouble extends Component {
  constructor(props) {
    super(props)
    this.renderPin = this.renderPin.bind(this)
    this.renderLayer = this.renderLayer.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.state = { pins: [] }
  }

  renderPin(long, lat) {
    return(
      <FeatureDouble coordinates={[long, lat]}
        onHover={this._onHover}
        onEndHover={this._onEndHover}
        onClick={this._onClickMarker}
      />
    )
  }

  renderLayer() {
    return(
      <LayerDouble
        type="symbol"
        id="marker"
        layout={{ "icon-image": "marker-15", "icon-size": 5 }}>
        {this.state.pins.map((pin) =>
          this.renderPin(pin.lng, pin.lat)
        )}
      </LayerDouble>
    )
  }

  handleClick(map, evt) {
    let pinsArray = this.state.pins.slice()
    pinsArray.push(evt.lngLat)
    this.setState({
      pins: pinsArray
    })
  }

  render() {
    return (
      <MapDouble
        style="mapbox://styles/mapbox/streets-v9"
        containerStyle={{
          height: "100vh",
          width: "100vw"
        }}
        onClick={this.handleClick}
      >
      {this.renderLayer()}
    </MapDouble>
    )
  }
}
