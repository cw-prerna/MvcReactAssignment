import React from "react";
import '../App.css';
import PropTypes from 'prop-types';
import { connect } from "react-redux";

import { mapDispatchToProps, mapStateToProps } from '../Actions/cityAction';


class CityVersionBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      popupName: ['Version', 'City'],
      selectedLocation: props.selectedLocation,
      selectedVersion: props.selectedVersion,
      id: props.id
    }
  }

  OpenLocationPopUp = () => {
    this.props.setCityVersion(true, this.state.selectedLocation, "Location");
  }

  OpenVersionPopUp = () => {
    this.props.setCityVersion(true, this.state.selectedVersion, "Version");
  }



  render() {
    const { selectedLocation, setCityVersion, selectedVersion } = this.props;

    if (!setCityVersion || !selectedLocation || !selectedVersion) {
      return null;
    }


    const popups = this.state.popupName.map(popup => {
      if (popup === "Version") {
        return (
          <div style={{ display: "inline-block", margin: "0 20px" }}>

            <div className="version">{popup}</div>
            <button className="button" key={popup} onClick={this.OpenVersionPopUp} > {this.state.selectedVersion.versionName}</button>

          </div>

        )
      }
      else {
        return (

          <div style={{ display: "inline-block", margin: "0 20px" }}>

            <div className="version">{popup}</div>
            <button className="button" key={popup} onClick={this.OpenLocationPopUp} > {this.state.selectedLocation}</button>

          </div>
        )
      }


    })
    return (
      <div className="popUpContainer" test-data="popUpContainer">
        {popups}
      </div>
    );
  }

}

CityVersionBox.propTypes = {
  selectedLocation: PropTypes.string,
  setCityVersion: PropTypes.func,
  selectedVersion: PropTypes.shape({
    CompanyId: PropTypes.number,
    CompanyName: PropTypes.string,
    ModelId: PropTypes.number,
    ModelName: PropTypes.string,
    Rating: PropTypes.number,
    VersionId: PropTypes.number,
    ImageUrl: PropTypes.string,
    VersionName: PropTypes.string,
    Price: PropTypes.number
  })
}


export default CityVersionBox;

export const CityVersionBoxConnect = connect(mapStateToProps, mapDispatchToProps)(CityVersionBox);
