import React, { Component } from 'react';

class MainInfoDisplay extends Component {
  render(){
    return (
      <div>
        <div className="info-section">
          <div className="info-col">
            <div className="info-col-contents">
              <h1 className="info-header">Customizable</h1>
              <div><i className="icon fa fa-cog fa-5x"></i></div>
              <p>Polls are fully Customizable. Users can create polls with any possible number of items.</p>
            </div>
          </div>
          <div className="info-col">
            <div className="info-col-contents">
              <h1 style={{color: "#c1d42f"}} className="info-header">Social</h1>
              <div style={{color: "#c1d42f"}} className="icon fa fa-wechat fa-5x"></div>
              <p style={{color: "#c1d42f"}}>Survery you friends by sending the a link to your poll or sharing on social media!</p>
            </div>
          </div>
          <div className="info-col">
            <div className="info-col-contents">
              <h1 style={{color: "#fcb723"}} className="info-header">Responsive</h1>
              <div style={{color:"#fcb723"}} className="adjust-left icon fa fa-arrows fa-5x"></div>
              <p style={{color: "#fcb723"}}>A responsive layout means this app is goign to look great whether you are on your tablet, mobile, or phone.</p>
            </div>
          </div>
        </div>
        <div style={{height:"200px"}}></div>
      </div>

    );
  }
}

export default MainInfoDisplay;
