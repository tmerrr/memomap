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

  postComment = (evt) => {
    evt.preventDefault();
    var formData = new FormData()
    formData.append('image', document.getElementById('image').files[0])
    formData.append('place', document.getElementById('place').value)
    formData.append('memory', document.getElementById('memory').value)
    formData.append('_id', this.props.pin._id)
    formData.append('imageurl', document.getElementById('image').files[0].name)
    formData.append('activity', document.getElementById('activity').value)
    formData.append('rating', document.getElementById('rating').innerHTML)

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

    let placeMessage;

    if(this.state.placeValidation.length < 1) {
      placeMessage = <h1>Please enter a Place</h1>
    }

    let memoryMessage;
    if (this.state.memoryValidation.length < 1) {
      memoryMessage = <h1>Please enter a Memory</h1>
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
      </div>
    )
  }

}
export default Form;
