import React, { Component } from 'react';
import axios from 'axios';

class Form extends Component {
  constructor(props) {
    super(props)
    this.postComment = this.postComment.bind(this)
    this.dateConverter = this.dateConverter.bind(this)

    this.state = {
      placeValidation: ''
    }
  }

  componentWillReceiveProps(newProps){
    console.log(newProps.pin)
    this.setState({
      place: newProps.pin.place,
      memory: newProps.pin.memory,
      _id: newProps.pin._id,
      imageurl: newProps.pin.imageurl,
      date: this.dateConverter(this.props.pin.date)
    })
  }

  componentWillMount() {
    console.log(this.props.pin)
    console.log(this.props.pin.date)
    this.setState({
      place: this.props.pin.place,
      memory: this.props.pin.memory,
      _id: this.props.pin._id,
      imageurl: this.props.pin.imageurl,
      date: this.dateConverter(this.props.pin.date)
    })
  }

  dateConverter(date){
    var dateone = date.split("T")[0]
    return dateone.split("-").reverse().join("-")
  }

  postComment(evt) {
    evt.preventDefault();
    var formData = new FormData()
    var image = document.getElementById('image')
    console.log(image.files[0])
    var imageurl = image.files[0].name
    var placeInput = document.getElementById('place').value
    var memoryInput = document.getElementById('memory').value
    console.log(imageurl)
    formData.append('image', image.files[0])
    formData.append('place', placeInput)
    formData.append('memory', memoryInput)
    formData.append('_id', this.state._id)
    formData.append('imageurl', imageurl)

    axios.post('pins/update', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(function(response) {
      console.log(response)
    })
    .catch(function(error) {
      console.log(error)
    });
    this.setState({
      place: placeInput,
    })
    console.log("HERE", this.state)
  }

  handlePlaceChange = (evt) => {
    console.log(this.state.placeValidation.length)
    this.setState ({ placeValidation: evt.target.value })
  }

  handleSubmit = (evt) => {
    console.log(this.state.placeValidation.length)
    if(this.state.placeValidation.length < 1){
      return true
    } else {
      return false
    }
  }

  render() {
    console.log(this.state)
    const Placeresult = this.handleSubmit();

    var placeresults = null

    if(Placeresult === true){
      placeresults = (
        <h1> Not a Valid Place</h1>
      )
    }
    return (
      <div>
        { this.state.place ? <div><img src={this.state.imageurl} alt="Image Uploaded" style={{"width": "150px"}}/>
        <h1>Place: {this.state.place}</h1><h2>Title: {this.state.memory}</h2><h5>Day: {this.state.date}</h5></div> :
        <form id="form" encType="multipart/form-data">
          <input id="place" type="text" name="place" placeholder="Place" onChange={this.handlePlaceChange}></input>
          {placeresults}
          <input id="memory" type="text" name="memory" placeholder="Memory"></input>
          <input id="image" type="file" name="image"></input>
          <button disabled={Placeresult} onClick={this.postComment} type="submit">"Click Me"</button>
        </form> }
    </div>
    )
  }

}
export default Form;
