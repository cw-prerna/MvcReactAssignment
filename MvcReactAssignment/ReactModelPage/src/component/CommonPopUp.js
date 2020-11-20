import React from "react";
import '../App.css';
import PropTypes from 'prop-types';

import { connect } from "react-redux";

import { mapDispatchToProps, mapStateToProps } from '../Actions/cityAction';


class CommonPopUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      popUpType: props.popUpType,
      popUpVisible: true,
      popupList: props.popupList,
      id: this.props.id
    };
  }

  changeEntityDetails = (e) => {
    var entityName = e.target.innerHTML
    if (this.state.popUpType === "Location") {
      this.props.changeCityName(entityName);
    }
    this.props.setCityVersion(false, entityName, this.state.popUpType, this.state.id);
  }

  render() {
    const entities = this.state.popupList.map(entity => {
      if (this.state.popUpVisible) {
        if (this.state.popUpType === "Version") {
          return (
            <p className="displayVersionName" style={{ whiteSpace: "nowrap" }} onClick={this.changeEntityDetails} key={entity.versionId + "_" + entity.versionName}>{entity.versionName}</p>
          )
        }
        else {
          return (
            <p className="displayLocationName" style={{ whiteSpace: "nowrap" }} onClick={this.changeEntityDetails} key={entity}>{entity}</p>
          )
        }
      }
      else {
        return (
          ''
        )
      }
    });
    return (
      <div>
        {entities}
      </div>
    );
  }
}

CommonPopUp.propTypes = {
  popUpType: PropTypes.string,
  setCityVersion: PropTypes.func,
  popupList: PropTypes.shape({
    CompanyId: PropTypes.number,
    CompanyName: PropTypes.string,
    ModelId: PropTypes.number,
    ModelName: PropTypes.string,
    Rating: PropTypes.number,
    VersionId: PropTypes.number,
    ImageUrl: PropTypes.string,
    VersionName: PropTypes.string,
    Price: PropTypes.number
  }) || PropTypes.shape({
    locations: PropTypes.string
  }),
  visibleItem: PropTypes.shape({
    CompanyId: PropTypes.number,
    CompanyName: PropTypes.string,
    ModelId: PropTypes.number,
    ModelName: PropTypes.string,
    Rating: PropTypes.number,
    VersionId: PropTypes.number,
    ImageUrl: PropTypes.string,
    VersionName: PropTypes.string,
    Price: PropTypes.number
  }) || PropTypes.shape({
    locations: PropTypes.string
  }),
  popUpVisible: PropTypes.bool

}



export default CommonPopUp;

export const CommonPopUpConnect = connect(mapStateToProps, mapDispatchToProps)(CommonPopUp);