import React, { Component } from 'react';
import axios from 'axios';

class Form extends Component {
  constructor(props) {
    super(props)
    this.postComment = this.postComment.bind(this)
  }

  componentWillReceiveProps(newProps){
    this.setState({pin: newProps.pin})
  }

  componentWillMount() {
    this.setState({
      place: this.props.pin.place,
      memory: this.props.pin.memory,
      _id: this.props.pin._id,
      imageurl: this.props.pin.imageurl
    })
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
      memory: memoryInput
    })
    console.log("HERE", this.state)
  }

  render() {
    console.log(this.state)
    return (
      <div>
        { (this.state.place && this.state.memory) ? <div><img src={this.state.imageurl} alt="Image Uploaded" style={{"width": "150px"}}/> <h1>{this.state.place}</h1><h2>{this.state.memory}</h2></div> :
        <form id="form" encType="multipart/form-data">
          <input id="place" type="text" name="place"></input>
          <input id="memory" type="text" name="memory"></input>
          <input id="image" type="file" name="image"></input>
          <button onClick={this.postComment} type="submit">"Click Me"</button>
        </form> }
    </div>
    )
  }

}
export default Form;
