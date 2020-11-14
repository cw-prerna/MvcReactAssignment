import React from "react";
import '../App.css';
import { connect } from "react-redux";
import CarName from './CarName'
import CarImage from './CarImage'
import NavBar from './NavBar'
import PriceDetails from './PriceDetails'
import CityVersionBox from './CityVersionBox'
import CommonPopUp from './CommonPopUp'

const NavBarConnect = connect(mapStateToProps,mapDispatchToProps)(NavBar);
const CityVersionBoxConnect = connect(mapStateToProps,mapDispatchToProps)(CityVersionBox);
const CommonPopUpConnect = connect(mapStateToProps,mapDispatchToProps)(CommonPopUp);

function updateCityNameAction(city) {
  return {
    type: "UPDATE_CITY",
    selectedLocation: city
  };
}

function mapStateToProps(state) {
  return {
    ...state,
    selectedLocation: state.selectedLocation
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeCityName: function(selectedLocation) {
      dispatch(updateCityNameAction(selectedLocation));
    }
  };
}

class App extends React.Component
{
  constructor(props)
  {
    super(props)
    this.state = {
      id : 1,
      models : [],
      selectedModel : {},
      dataRecieved : false,
      locationPopUpVisible : false,
      versionPopUpVisible : false,
      versions : [],
      locations : [], 
      selectedLocation : "",
      selectedVersion : {},
    }
  }

  componentDidMount()
  {
    fetch("http://localhost:5000/home/GetModelsDetails?companyId=1")
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);

           
          fetch("http://localhost:5000/home/getcardetails?companyId=1&modelId=1")
            .then(res1 => res1.json())
            .then(
            (versions) => {
              console.log(versions);

              fetch("http://localhost:5000/home/GetCities")
              .then(res2 => res2.json())
              .then(
              (location) => {
                console.log(location);

              this.setState({
                ...this.state,
                dataRecieved : true,
                models : result,
                selectedModel : result[0],
                versions : versions,
                locations : location,
                selectedLocation : location[0],
                selectedVersion : versions[0],
                
              });
              
            },

            (errorlocation) => {
              console.log("Error City fetch:",errorlocation)
            }
          );
        },

        (errorversion) => {
          console.log("Error: version fetch:",errorversion)
        }
      );
    },

        (errorcar) => {
          console.log("Error: cardata fetch: ",errorcar);
        }
      );
  }

  changeEntityFlag = (flag, entity, type) => {
    if(type === "Version")
    {
      let sel_ver = {};
      for (let i = 0; i < this.state.versions.length; i++) {
        if(this.state.versions[i].versionName === entity)
        {
          sel_ver = this.state.versions[i];
          break;
        }
      }
      this.setState({
        ...this.state,
        selectedVersion : sel_ver,
        locationPopUpVisible : false,
        versionPopUpVisible : flag
      });
    }
    else
    {
      this.setState({
        ...this.state,
        selectedLocation : entity,
        locationPopUpVisible : flag,
        versionPopUpVisible : false
      });
    }
  }
  


  render()
  {
    if(this.state.dataRecieved)
    {
      if(this.state.locationPopUpVisible)
      {
        return(
          <div><CommonPopUpConnect popUpType="Location" entityList={this.state.locations} changeEntityFlag={this.changeEntityFlag} selectedEntity={this.state.selectedLocation} popUpVisible={this.state.locationPopUpVisible}></CommonPopUpConnect></div>
        );
      }
      else if(this.state.versionPopUpVisible)
      {
        return(
          <div><CommonPopUpConnect popUpType="Version" entityList={this.state.versions} changeEntityFlag={this.changeEntityFlag} selectedEntity={this.state.selectedVersion} popUpVisible={this.state.versionPopUpVisible}></CommonPopUpConnect></div>
        );
      }
      else
      {
        return(
          <div className="Container">
            <NavBarConnect selectedLocation={this.state.selectedLocation} changeEntityFlag={this.changeEntityFlag}></NavBarConnect>
            <CarImage model={this.state.selectedModel}></CarImage>
            <CarName model={this.state.selectedModel}></CarName>
            <CityVersionBoxConnect selectedLocation={this.state.selectedLocation} selectedVersion={this.state.selectedVersion} changeEntityFlag={this.changeEntityFlag}></CityVersionBoxConnect>
            <PriceDetails selectedVersion={this.state.selectedVersion}></PriceDetails>
          </div>
        );
      }
    }
    else
    {
      return(
        <div>console.log("error")</div>
      );
    }
    
  }
}

export default App;
