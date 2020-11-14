import React from "react";
import '../App.css';

export default class NavBar extends React.Component 
{
  constructor(props) 
  {
    super(props);
    this.state = {
      selectedCity : props.selectedLocation, 
    };
  }

  OpenLocationPopUp = () => {
    this.props.changeEntityFlag(true,this.state.selectedCity,"Location");
  }

  handleLocationClick = () => {
    this.props.changeCityName(this.state.selectedCity);
    this.OpenLocationPopUp();
  }

  displayTooltip = () => {
    document.getElementsByClassName("tooltip")[0].style.display = "block";
    setTimeout(() => {
      document.getElementsByClassName("tooltip")[0].style.display = "none";
    }, 2000);
  }

  render() 
  {
    return (
      <div className="Rectangle" >
        <img src="https://imgd.aeplcdn.com/0x0/cw/static/icons/new-header/logo.svg" className="LogoImgShape"></img>
        <img src="https://www.flaticon.com/svg/static/icons/svg/927/927667.svg" className="LocationShape" onMouseOver={this.displayTooltip} onClick={this.handleLocationClick} data-tip data-for="locationTip"></img>
        <img src="./search.svg" className="SearchShape"></img>
        <div className="tooltip" style={{backgroundColor:"gray"}}>
          <p className="tooltipText">Current Location : {this.state.selectedCity}</p>
        </div>
      </div>
    );
  }
}