import React, { Component } from 'react';
import axios from 'axios';
import Rating from 'react-rating';
import '../styles/Formstyling.css';

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
    formData.append('image', document.getElementById('image').files[0])
    formData.append('place', document.getElementById('place').value)
    formData.append('memories', document.getElementById('memories').value)
    formData.append('_id', this.props.pin._id)
    formData.append('imageurl', document.getElementById('image').files[0].name)
    formData.append('activities', document.getElementById('activities').value)
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
      placeMessage = (
        <h1></h1>
      )
    }

    let memoryMessage;
    if (this.state.memoryValidation.length < 1) {
      memoryMessage = (
        <h1></h1>
      )
    }

    const activityOptions = ['Nature', 'Monument', 'Restaurant', 'Activity']

    let dropdownMenu = (
      <select id="activities" class="activities" name="activity">
        {activityOptions.map((type, index) => {
          return(<option key={index} value={type}>{type}</option>)
        })}
      </select>
    )


    return (
      <div id="forms">
        <form id="form" encType="multipart/form-data">

        <h4 id="header">Enter your</h4>
        <h4 id="h2">Memory</h4>

          <input id="place" type="text" name="place" placeholder="Place" onChange={this.handlePlaceChange}></input>
          {placeMessage}


          <textarea id="memories" cols="30" rows="5" placeholder="Enter your Memory" onChange={this.handleMemoryChange}></textarea>
          {dropdownMenu}


          <input id="image" class="images"type="file" name="image" onChange={this.handleFileUpload}></input>
          {memoryMessage}

          <div id="ratings">
            <Rating
              class="hearts"
              emptySymbol="fa fa-heart-o fa-2x fa_custom"
              fullSymbol="fa fa-heart fa-2x fa_custom2"
              style="color:red"
              fractions={2}
              onChange={(rating) => document.getElementById('rating').innerHTML = rating || 0}
            />
          </div>
          <h1 id="rating">0</h1>
          <button className="submit" disabled={Placeresult} onClick={this.postComment} type="submit">Done!</button>
        </form>

      </div>
    )
  }

}

export default Form;
