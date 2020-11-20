import React from "react";
import '../App.css';
import CarName from './CarName'
import CarImage from './CarImage'
import { NavBarConnect } from './NavBar'
import PriceDetails from './PriceDetails'
import { CityVersionBoxConnect } from './CityVersionBox'
import { CommonPopUpConnect } from './CommonPopUp'



class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: 0,
      models: [],
      selectedModel: {},
      dataRecieved: false,
      locationPopUpVisible: false,
      versionPopUpVisible: false,
      versions: [],
      locations: [],
      selectedLocation: "",
      selectedVersion: {},
    }
  }




  componentDidMount() {
    fetch("http://localhost:5000/home/GetModelsDetails?companyId=1")
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result.dbModels);


          fetch("http://localhost:5000/home/getcardetails?companyId=1&modelId=1")
            .then(res1 => res1.json())
            .then(
              (Versions) => {
                console.log(Versions.dbVersions);

                fetch("http://localhost:5000/Home/getcities")
                  .then(res2 => res2.json())
                  .then(
                    (location) => {
                     let cities = [];
                     location.dbCity.forEach(element => {
                      cities.push(element.city);
                     });
                     let v = [];
                     Versions.dbVersions.forEach(element => {
                      v.push(element);
                     });
                     console.log(v[0]);
                     let m = [];
                     result.dbModels.forEach(element => {
                      m.push(element);
                     });
                     console.log(m[0]);
                      this.setState({
                        ...this.state,
                        dataRecieved: true,
                        models: m,
                        selectedModel: m[0],
                        versions: v,
                        locations: cities,
                        selectedLocation: cities[0],
                        selectedVersion: v[0],

                      });
                    
                      

                    },

                    (errorlocation) => {
                      console.log("Error: City fetch:", errorlocation)
                    }
                  );
              },

              (errorversion) => {
                console.log("Error: version fetch:", errorversion)
              }
            );
        },

        (errorcar) => {
          console.log("Error: cardata fetch: ", errorcar);
        }
      );
  }



  setCityVersion = (flag, entity, type, id) => {
    if (type === "Version") {
        let sel_version = {};
        for (let i = 0; i < this.state.versions.length; i++) {
            if (this.state.versions[i].versionName === entity) {
                sel_version = this.state.versions[i];
                break;
            }
        }
        this.setState({
            ...this.state,
            selectedVersion: sel_version,
            locationPopUpVisible: false,
            versionPopUpVisible: flag,
            id: 0
        });
    }
    else {
        this.setState({
            ...this.state,
            selectedLocation: entity,
            locationPopUpVisible: flag,
            versionPopUpVisible: false,
            id: 1
        });
    }
}



  render() {
    if (this.state.dataRecieved) {
      if (this.state.locationPopUpVisible) {
        return (
          <div><CommonPopUpConnect popUpType="Location" popupList={this.state.locations} setCityVersion={this.setCityVersion}  visibleItem={this.state.selectedLocation} popUpVisible={this.state.locationPopUpVisible}></CommonPopUpConnect></div>
        );
      }
      else if (this.state.versionPopUpVisible) {
        return (
          <div><CommonPopUpConnect popUpType="Version" popupList={this.state.versions} setCityVersion={this.setCityVersion}  visibleItem={this.state.selectedVersion} popUpVisible={this.state.versionPopUpVisible}></CommonPopUpConnect></div>
        );
      }
      else {
        return (
          <div className="Container">
            <NavBarConnect setCityVersion={this.setCityVersion} ></NavBarConnect>
            <CarImage model={this.state.selectedModel}></CarImage>
            <CarName model={this.state.selectedModel}></CarName>
            <CityVersionBoxConnect selectedLocation={this.state.selectedLocation} selectedVersion={this.state.selectedVersion} setCityVersion={this.setCityVersion} ></CityVersionBoxConnect>
            <PriceDetails selectedVersion={this.state.selectedVersion}></PriceDetails>
          </div>
        );
      }
    }
    else {
      return (
        <div>console.log("error")</div>
      );
    }

  }
}

export default App;
