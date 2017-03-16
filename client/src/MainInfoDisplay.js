import React, { Component } from 'react';

class MainInfoDisplay extends Component {
  render(){
    return (
      <div className="info-section">
        <div className="info-col">
          <div className="info-col-contents">
            <h1 className="info-header">Customizable</h1>
            <div className="icon fa fa-cog fa-5x"></div>
            <p>and here is some descriptionand here is some descriptio and here is some description and here is some description and here is some description and here is some description</p>
          </div>
        </div>
        <div className="info-col">
          <div className="info-col-contents">
            <h1 className="info-header">Social</h1>
            <div className="icon fa fa-wechat fa-5x"></div>
            <p>and here is some descriptionand here is some descriptio and here is some description and here is some description and here is some description and here is some description</p>
          </div>
        </div>
        <div className="info-col">
          <div className="info-col-contents">
            <h1 className="info-header">Responsive</h1>
            <div className="adjust-left icon fa fa-arrows fa-5x"></div>
            <p>and here is some descriptionand here is some descriptio and here is some description and here is some description and here is some description and here is some description</p>
          </div>
        </div>
      </div>
    );
  }
}

export default MainInfoDisplay;
