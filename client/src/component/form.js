import React, { Component } from 'react';
import axios from 'axios';
import Rating from 'react-rating';

class Form extends Component {
  constructor(props) {
    super(props)
    this.postComment = this.postComment.bind(this)
    this.dateConverter = this.dateConverter.bind(this)

    this.state = {
      placeValidation: '',
      memoryValidation: '',
      fileValidation: false
      // rating: 0
    }
  }

  componentWillReceiveProps(newProps){
    this.setState({
      place: newProps.pin.place,
      memory: newProps.pin.memory,
      _id: newProps.pin._id,
      imageurl: newProps.pin.imageurl,
      activity: newProps.pin.activity,
      date: this.dateConverter(this.props.pin.date)
    })
  }

  componentWillMount() {
    this.setState({
      place: this.props.pin.place,
      memory: this.props.pin.memory,
      _id: this.props.pin._id,
      imageurl: this.props.pin.imageurl,
      activity: this.props.pin.activity,
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
    var imageurl = image.files[0].name
    var placeInput = document.getElementById('place').value
    var memoryInput = document.getElementById('memory').value
    var activity = document.getElementById('activity').value
    var rating = this.state.rating
    formData.append('image', image.files[0])
    formData.append('place', placeInput)
    formData.append('memory', memoryInput)
    formData.append('_id', this.state._id)
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
      console.log(response)
      console.log(self)
      self.setState({
        place: placeInput,
        memory: memoryInput,
        imageurl: imageurl
      })
    })
    .catch(function(error) {
      console.log(error)
    });
    this.setState({
      place: placeInput,
    })
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
    if((this.state.placeValidation.length < 1) || (this.state.memoryValidation.length < 1) || (!this.state.fileValidation)){
      return true
    } else {
      return false
    }
  }

  handleRating = (evt) => {
    console.log(evt)
    // this.setState({
    //   rating: evt
    // })
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

    let content;
    if (this.state.place) {
      content = (
        <div>
          <img src={this.state.imageurl} alt="Image Uploaded" style={{"width": "150px"}}/>
          <h1>Place: {this.state.place}</h1>
          <h2>Title: {this.state.memory}</h2>
          <h5>Day: {this.state.date}</h5>
          <h7>{this.state.activity}</h7>
        </div>
      )
    } else {
      content = (
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
      )
    }

    return (
      <div>
        {content}
        <button onClick={this.props.deletePin}>Delete Pin</button>
      </div>
    )
  }

}
export default Form;
