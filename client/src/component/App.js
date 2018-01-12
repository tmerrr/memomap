import React, { Component } from 'react';
import { Popup } from "react-mapbox-gl";
import { Marker } from "react-mapbox-gl";
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props)
    this.sendGetRequest = this.sendGetRequest.bind(this)
    // this.renderPin = this.renderPin.bind(this)
    // this.renderLayer = this.renderLayer.bind(this)
    this.renderPopup = this.renderPopup.bind(this)

    this.handleClick = this.handleClick.bind(this)

    this.showPopup = this.showPopup.bind(this)
    this.renderLayerpopups = this.renderLayerpopups.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.state = { pins: [] }
  }

  componentDidMount() {
    this.sendGetRequest();
  }

  sendGetRequest() {
    let pinsArray = this.state.pins.slice()
    axios.get('/pins')
    .then((response) => {
      response.data.map((pin) => pinsArray.push({
        lng: pin.longitude, lat: pin.latitude
      }))
      this.setState({
        pins: pinsArray
      })
      console.log(this.state)
    })
    .catch(function (error) {
      console.log(error)
    })
  }

  // renderPin(long, lat, index) {
  //   return(
  //     <this.props.FeatureClass
  //       key={index}
  //       coordinates={[long, lat]}
  //       onHover={this._onHover}
  //       onEndHover={this._onEndHover}
  //       onClick={this._onClickMarker}
  //     />
  //   )
  // }
  //
  // renderLayer() {
  //   console.log(this.state.pins)
  //   return(
  //     <this.props.LayerClass
  //       type="symbol"
  //       id="marker"
  //       layout={{ "icon-image": "marker-15", "icon-size": 5}}>
  //       {this.state.pins.map((pin, index) =>
  //         this.renderPin(pin.lng, pin.lat, index)
  //
  //       )}
  //     </this.props.LayerClass>
  //
  //   )
  // }


  renderLayerpopups(){
    console.log('hello Dania Mah')
    this.setState({
      clicked: true
    })
  }

  renderPopup(){
    return(
    <Popup
    coordinates={[-0.2416815, 51.5285582]}
    offset={{
      'bottom-left': [12, -38], 'bottom': [0, -38], 'bottom-right': [-12, -38]
    }}>
    <form>
      <input type="text" name="name"></input>
      <input type="submit" value="Click Me Bitches"></input>
    </form>
  </Popup> )
  }

  showPopup(lng, lat) {
    console.log(lng, lat)

    return(
      <Popup
      coordinates={[lng, lat]}
      offset={{
        'bottom-left': [12, -38], 'bottom': [0, -38], 'bottom-right': [-12, -38]
      }}
    >
      <form>
        <input type="text" name="name"></input>
        <input type="submit" value="Click Me Bitches"></input>
      </form>
    </Popup>
  )
  }

  handlePopupClick(lng, lat) {
    this.setState({
      clicked: true,
      lng: lng,
      lat: lat
    })
  }

  renderMarker(lng, lat, index){
    return (
      <Marker
        key={index}
        coordinates={[lng, lat]}
        // onClick={() => this.showPopup(lng, lat)}
        onClick={() => this.handlePopupClick(lng, lat)}
        anchor="bottom"
      >
        <img src={"1.png"} alt="pin" style={{"width": "60px"}}/>
      </Marker>
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
      console.log(response)
    })
    .catch(function(error) {
      console.log(error)
    });
  }

  render() {
    const allPins = this.state.pins.map((pin, index) => {
      console.log(pin)
      return this.renderMarker(pin.lng, pin.lat, index)
    })
    console.log(allPins)
    return (
      <this.props.MapClass
        style="mapbox://styles/mapbox/streets-v9"
        containerStyle={{
          height: "100vh",
          width: "100vw"
        }}
        onClick={this.handleClick}
      >
      {allPins}
      <this.props.GeocoderClass />
      {this.state.clicked ? this.showPopup(this.state.lng, this.state.lat) : null}
    </this.props.MapClass>
    )
  }
}

export default App;
