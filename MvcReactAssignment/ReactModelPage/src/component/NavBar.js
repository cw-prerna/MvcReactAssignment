import React from "react";
import '../App.css';
import PropTypes from 'prop-types';

import { connect } from "react-redux";

import { mapDispatchToProps, mapStateToProps } from '../Actions/cityAction';



class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCity: props.selectedLocation,
      id: props.id
    };
  }

  OpenLocationPopUp = () => {
    this.props.setCityVersion(true, this.state.selectedCity, "Location", this.state.id);
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

  render() {
    const { selectedLocation, setCityVersion } = this.props;

    if (!selectedLocation || !setCityVersion) {
      return null;
    }
    return (
      <div className="Rectangle" test-data="navbar">
        <img src="https://imgd.aeplcdn.com/0x0/cw/static/icons/new-header/logo.svg" className="LogoImgShape" alt="logo"></img>
        <img src="./search.svg" className="SearchShape"></img>
        <img src="https://www.flaticon.com/svg/static/icons/svg/927/927667.svg" alt="tooltip" className="LocationShape" onMouseOver={this.displayTooltip} onClick={this.handleLocationClick} data-tip data-for="locationTip"></img>
        <div className="tooltip" style={{ backgroundColor: "gray" }}>
          <p className="tooltipText">Current Location : {this.state.selectedCity}</p>
        </div>
      </div>
    );
  }
}


NavBar.propTypes = {
  selectedLocation: PropTypes.string,
  setCityVersion: PropTypes.func
}


export default NavBar;

export const NavBarConnect = connect(mapStateToProps, mapDispatchToProps)(NavBar);