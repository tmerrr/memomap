import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';


export default class LogIn extends Component {
  constructor(props) {
    super(props)
    this.state = { user: false }
  }

  render() {
    return(
      <div>
      <FacebookLogin
        appId="1382418925218617"
        autoLoad={false}
        fields="name,email,friends,picture"
        scope="public_profile,email,user_friends"
        callback={this.props.responseFacebook}
        // reAuthenticate={true}
      />
      <a href="https://www.facebook.com/" target="_blank">Change User</a>
      </div>
    )
  }
}
