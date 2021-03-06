import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import styles from '../styles/login.css'


export default class LogIn extends Component {
  constructor(props) {
    super(props)
    this.state = { user: false }
  }

  render() {
    return(
      <div id="body">
      <img id="background" src="back.png"/>
      <img id="logo" src="memomap.png"/>
      <h1 className='slogans'> Places • Pictures • Memories </h1>
      <div className='fbmask'></div>
      <div id="fb"><FacebookLogin
        appId="1382418925218617"
        autoLoad={false}
        fields="name,email,friends,picture"
        scope="public_profile,email,user_friends"
        callback={this.props.responseFacebook}
      /></div>
      <a className="change" href="https://www.facebook.com/" target="_blank">Change User</a>
      </div>
    )
  }
}
