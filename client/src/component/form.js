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
    console.log(this.state._id)
    console.log(document.getElementById('comment').value)
    var forminput = document.getElementById('comment').value
    axios.post('/pins/update', {
      comment: forminput,
      _id: this.state._id
    })
    .then(function(response) {
      console.log(response)
    })
    .catch(function(error) {
      console.log(error)
    })
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
        <form >
          <input id="comment" type="text" name="name"></input>
          <button onClick={this.postComment} type="submit">"Click Me"</button>
        </form> }
    </div>
    )
  }

}
export default Form;
