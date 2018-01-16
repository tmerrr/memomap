import React, { Component } from 'react';

class Sidebar extends Component{
  constructor(props){
    super(props)
  }

  render() {
    var color = this.props.toggleBG
    return(
      <button onClick={this.props.toggleDropPin}
              style={{position: "absolute",
                      zIndex: 1000,
                      top: 55,
                      right: 80,
                      backgroundColor: color
                    }}
      >
        Toggle
      </button>
    )
  }
}

export default Sidebar;
