import React from "react";
import '../App.css';

export default class CityVersionBox extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      popupName : ['Version','City'],
      selectedLocation : props.selectedLocation,
      selectedVersion : props.selectedVersion
    }
  }

  OpenLocationPopUp = () => {
    this.props.changeEntityFlag(true,this.state.selectedLocation,"Location");
  }

  OpenVersionPopUp = () => {
    this.props.changeEntityFlag(true,this.state.selectedVersion,"Version");
  }

 

  render()
  {
    const popups = this.state.popupName.map(popup => {
      if (popup === "Version") 
      {
        return (
          <div style= {{ display: "inline-block", margin: "0 20px" }}>
            
            <div className="version">{popup}</div>
            <button className="button" key={popup} onClick={this.OpenVersionPopUp} > {this.state.selectedVersion.versionName}</button>

          </div>

        )
      }
      else
      {
        return (
        
          <div style= {{ display: "inline-block", margin: "0 20px" }}>
            
            <div className="version">{popup}</div>
            <button className="button" key={popup} onClick={this.OpenLocationPopUp} > {this.state.selectedLocation}</button>

          </div>
        )
      }

    
    })
    return (
      <div className="popUpContainer">
        {popups}
      </div>
    );
  }

}