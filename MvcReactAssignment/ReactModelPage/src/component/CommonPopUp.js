import React from "react";
import '../App.css';

export default class CommonPopUp extends React.Component 
{
  constructor(props) 
  {
    super(props);
    this.state = {
      popUpType : props.popUpType,
      popUpVisible : true,
      entityList: props.entityList
    };
  }
  
  changeEntityDetails = (e) => {
    var entityName = e.target.innerHTML
    if(this.state.popUpType==="Location")
    {
      this.props.changeCityName(entityName);
    }
    this.props.changeEntityFlag(false,entityName,this.state.popUpType);
  }

  render() 
  {
    const entities = this.state.entityList.map(entity => {
      if(this.state.popUpVisible)
      {
        if(this.state.popUpType==="Version")
        {
          return (
            <p style={{whiteSpace:"nowrap"}} onClick={this.changeEntityDetails} key={entity.versionId+"_"+entity.versionName}>{entity.versionName}</p>
          )
        }
        if(this.state.popUpType==="Model")
        {
          return (
            <p style={{whiteSpace:"nowrap"}} onClick={this.changeEntityDetails} key={entity.modelId+"_"+entity.modelName}>{entity.modelName}</p>
          )
        }
        else
        {
          return (
            <p style={{whiteSpace:"nowrap"}} onClick={this.changeEntityDetails} key={entity}>{entity}</p>
          )
        }
      }
      else
      {
        return(
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