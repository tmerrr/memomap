import React, { Component } from 'react';
import axios from 'axios';
import Rating from 'react-rating';

class Form extends Component {
  constructor(props) {
    super(props)
    this.state = {
      placeValidation: '',
      memoryValidation: '',
      fileValidation: false
    }
  }

  dateConverter = (date) => {
    var dateone = date.split("T")[0]
    return dateone.split("-").reverse().join("-")
  }

  postComment = (evt) => {
    evt.preventDefault();
    var formData = new FormData()
    var image = document.getElementById('image')
    var imageurl = image.files[0].name
    var placeInput = document.getElementById('place').value
    var memoryInput = document.getElementById('memory').value
    var activity = document.getElementById('activity').value
    var rating = document.getElementById('rating').innerHTML
    formData.append('image', image.files[0])
    formData.append('place', placeInput)
    formData.append('memory', memoryInput)
    formData.append('_id', this.props.pin._id)
    formData.append('imageurl', imageurl)
    formData.append('activity', activity)
    formData.append('rating', rating)

    var self = this

    axios.post('pins/update', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(function(response) {
      return response
    })
    .then(function(response) {
      console.log(response)
      self.props.reRenderPinPopup(response.data)
    })
    .catch(function(error) {
      console.log(error)
    });
  }

  handlePlaceChange = (evt) => {
    this.setState ({ placeValidation: evt.target.value })
  }

  handleMemoryChange = (evt) => {
    this.setState ({memoryValidation: evt.target.value})
  }

  handleFileUpload = (evt) => {
    if(evt.target.files.length === 1) {
      this.setState ({fileValidation: true})
    }
  }

  handleSubmit = (evt) => {
    return ((this.state.placeValidation.length < 1) || (this.state.memoryValidation.length < 1) || (!this.state.fileValidation))
  }

  render() {
    const Placeresult = this.handleSubmit();

    var placeMessage = null

    if(this.state.placeValidation.length < 1) {
      placeMessage = (
        <h1>Please enter a Place</h1>
      )
    }

    var memoryMessage = null
    if (this.state.memoryValidation.length < 1) {
      memoryMessage = (
        <h1>Please enter a Memory</h1>
      )
    }

    const activityOptions = ['Nature', 'Monument', 'Restaurant', 'Activity']

    let dropdownMenu = (
      <select id="activity" name="activity">
        {activityOptions.map((type, index) => {
          return(<option key={index} value={type}>{type}</option>)
        })}
      </select>
    )

    return (
      <div>
        <form id="form" encType="multipart/form-data">
          <input id="place" type="text" name="place" placeholder="Place" onChange={this.handlePlaceChange}></input>
          {placeMessage}
          <input id="memory" type="text" name="memory" placeholder="Memory" onChange={this.handleMemoryChange}></input>
          {dropdownMenu}
          <input id="image" type="file" name="image" onChange={this.handleFileUpload}></input>
          {memoryMessage}
            <Rating
              emptySymbol="fa fa-heart-o fa-2x"
              fullSymbol="fa fa-heart fa-2x"
              fractions={2}
              onChange={(rating) => document.getElementById('rating').innerHTML = rating || 0}
            />
          <h1 id="rating">0</h1>
          <button disabled={Placeresult} onClick={this.postComment} type="submit">"Click Me"</button>
        </form>
        <button onClick={this.props.deletePin}>Delete Pin</button>
      </div>
    )
  }

}
export default Form;
