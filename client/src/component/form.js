import React, { Component } from 'react';
import axios from 'axios';

class Form extends Component {
  constructor(props) {
    super(props)
    this.postComment = this.postComment.bind(this)
  }

  componentWillReceiveProps(newProps){
    this.setState({comment: newProps.comment, _id: newProps.id})
  }

  componentWillMount() {
    console.log(this.props.comment)
    console.log(this.props.id)
    this.setState({
      comment: this.props.comment,
      _id: this.props.id
    })
  }

  // componentDidMount() {
  //   console.log(this.props.comment)
  //   console.log(this.props.id)
  //   this.setState({
  //     comment: this.props.comment,
  //     _id: this.props.id
  //   })
  // }

  postComment(evt) {
    evt.preventDefault();
    var image = document.getElementById('image')
    console.log(image.files[0])
    var formData = new FormData()
    // console.log(image.files[0].name)
    var imageurl = '../../uploads/' + image.files[0].name
    var forminput = document.getElementById('comment').value
    console.log(imageurl)
    formData.append('image', image.files[0])
    formData.append('comment', forminput)
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
    // axios.post('/pins/update', {
    //   comment: forminput,
    //   _id: this.state._id
    // })
    // .then(function(response) {
    //   console.log(response)
    // })
    // .catch(function(error) {
    //   console.log(error)
    // })
    // this.sendGetRequest()
    this.setState({
      comment: forminput
    })
    console.log("HERE", this.state)
  }

  render() {
    console.log(this.state)
    return (
      <div>
        { this.state.comment ? <h1>{this.state.comment}</h1> :
        <form id="form" encType="multipart/form-data">
          <input id="comment" type="text" name="name"></input>
          <input id="image" type="file" name="image"></input>
          <button onClick={this.postComment} type="submit">"Click Me"</button>
        </form> }
    </div>
    )
  }

}
export default Form;
