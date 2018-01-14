import React, { Component } from 'react';

class Form extends Component {
  constructor(props) {
    super(props)
    this.postComment = this.postComment.bind(this)
  }
}

postComment(evt){
  evt.preventDefault();
  var forminput = document.getElementById('comment').value
  axios.post('/pins/update', {
    comment: forminput,
    _id: this.props._id
  })
  .then(function(response) {
    console.log(response)
  })
  .catch(function(error) {
    console.log(error)
  })
  this.sendGetRequest()
  this.setState({
    comment: forminput
  })
  console.log("HERE", this.state)
}

render() {
  return (
    <form >
      <input id="comment" type="text" name="name"></input>
      <button onClick={this.postComment} type="submit">"Click Me"</button>
    </form>
  )
}
