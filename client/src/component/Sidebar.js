import React, { Component } from 'react';
import TravellerType from './TravellerType';
import styles from '../styles/Sidebar.css';


class Sidebar extends Component{

  memoryChecker = (number) => {
    if (number === 1) {
      return "You have " + number + " memory"
    } else {
      return "You have " + number + " memories"
    }
  }

  getnumberOf = (activity) => {
    let type = this.props.pins.filter(pin => pin.activity === activity)
    return type.length

  }

  setTravellerType = () => {
    if (this.props.pins.length < 5) {
      return { name: "Hermit Crab", imageUrl: 'hermit.jpg'}
    } else if (this.props.pins.length < 10) {
      return { name: "House Cat", imageUrl: 'cat.jpg'}
    } else if (this.props.pins.length < 20){
      return { name: "Swallow", imageUrl: 'swallow.jpg'}
    } else if (this.props.pins.length < 30){
      return { name: "Atlantic Salmon", imageUrl: 'salmon.png'}
    } else {
      return { name: "Wandering Albatross", imageUrl: 'albatross.jpg'}
    }
  }

  render(){
    return(
      <div id="navbar">
        <div id='menu'></div>
        <button id="hamburger" name="hamburger" onClick={this.props.clickHamburger}><img src = "menuicon.png"/></button>
        <div id="usershadow"></div>

        <h1 id="name">{this.props.userDetails.name}</h1>
        <h2 id="email">{this.props.userDetails.email}</h2>
        <img class="image" src={this.props.userDetails.picture.data.url}/>

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

        <h4 class="activitying"> {this.getnumberOf("Activity")} </h4>
        <img id="icon0" src = "activityicon.png"/>
        <h5 id="activitycaption"> Activity </h5>

        <TravellerType animal={this.setTravellerType()} />
          <button id="logout" name="logout" onClick={this.props.logout}>Logout</button>
      </div>
    )
  }
}

export default Sidebar;
