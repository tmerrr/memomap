import React, { Component } from 'react';
import styles from '../styles/Sidebar.css'

class Sidebar extends Component{
  constructor(props){
    super(props)
    this.memoryChecker = this.memoryChecker.bind(this)
    this.getnumberOf = this.getnumberOf.bind(this)
    this.travellerType = this.travellerType.bind(this)
  }

  memoryChecker(number) {
    if (number === 1) {
      return "You have " + number + " memory"
    } else {
      return "You have " + number + " memories"
    }
  }

  getnumberOf(activity) {
    let type = this.props.pins.filter(pin => pin.activity === activity)
    return type.length

  }

  travellerType(){
    if (this.props.pins.length < 5) {
      return 'Hermit'
    } else if (this.props.pins.length < 10) {
      return 'House Cat'
    } else if (this.props.pins.length < 20){
      return 'Swallow'
    } else if (this.props.pins.length < 30){
      return 'Atlantic Salmon'
    } else {
      return 'Wandering Albatross'
    }
  }



  render(){
    return(
      <div id="navbar">
        <div id='menu'></div>
        <button id="hamburger" name="hamburger" onClick={this.props.clickHamburger}><img src = "menuicon.png"/></button>
        <div id="usershadow"></div>
        <img id="image" src={this.props.userDetails.picture.data.url}/>
        <h1 id="name">{this.props.userDetails.name}</h1>
        <h2 id="email">{this.props.userDetails.email}</h2>

        <div id="block"></div>

        <h3 id ="memory">{this.memoryChecker(this.props.pins.length)}</h3>

        <h4 id="nature"> {this.getnumberOf("Nature")} </h4>
        <h5 id="naturecaption"> Nature </h5>
        <img id="icon1" src = "natureicon.png"/>

        <h4 id="monument"> {this.getnumberOf("Monuments")} </h4>
        <h5 id="monumentcaption"> Monument </h5>
        <img id="icon2" src = "monumenticon.png"/>

        <h4 id="restaurant"> {this.getnumberOf("Restaurant")} </h4>
        <h5 id="restaurantcaption"> Restaurant </h5>
        <img id="icon3" src = "restauranticon.png"/>

        <h4 id="activity"> {this.getnumberOf("Activity")} </h4>
        <img id="icon0" src = "activityicon.png"/>
        <h5 id="activitycaption"> Activity </h5>

        <h4 id="header"> Currently, you are a</h4>
        <h4 id="level"> {this.travellerType()} </h4>

          <button id="logout" name="logout" onClick={this.props.logout}>Logout</button>
      </div>
    )
  }
}

export default Sidebar;
