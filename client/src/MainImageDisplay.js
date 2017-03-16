import React, { Component } from 'react';

class MainImageDisplay extends Component {
  render(){
    return (
      <div className="image-area">
        <div className="text-box">
          <div className="text-area">
            <h1>Pollster</h1>
            <p>Custom Polls. Live Results</p>
            <div className="signup-button">
              <a href="/signup" className="div-anchor">
                Sign up
              </a>
            </div>
          </div>
        </div>
        <div className="main-image-container">
          <img alt="hands reaching upwards" className="main-image" src="http://res.cloudinary.com/ddbeeuyr4/image/upload/v1489684384/votinghands_nwimso.png"/>
        </div>
      </div>
    )
  }
}

export default MainImageDisplay;
