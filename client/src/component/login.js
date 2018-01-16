import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';


export default class LogIn extends Component {
  constructor(props) {
    super(props)
    this.state = { user: false }
  }

  responseFacebook(response){
    console.log(response)
  }

  render() {
    return(
      <FacebookLogin
        appId="1382418925218617"
        autoLoad={false}
        fields="name,email,friends"
        scope="public_profile,email,user_friends"
        callback={this.props.responseFacebook}
        reAuthenticate={true}
      />
    )
  }
}
