import React from "react";
import '../App.css';
import PropTypes from 'prop-types';


class CarImage extends React.Component {
  render() {

    const { model } = this.props;


    if (!model) {
      return null;
    }

    return (
      <div className="ImgAndInfo" data-test="imageandinfo">
        <div className="CarImage">
          <img src={ model.imageUrl } className="Images2" alt="CarImage"></img>

        </div>
        <div className="CarInformation">
          <div className="Color">
            <img src="./colors.svg" className="Images3" alt="ColorImage"></img>
            <p className="car-info">Color</p>
          </div>
          <div className="Image">
            <img src="./image.svg" className="Images" alt="Images"></img>
            <p className="car-info">Image</p>
          </div>
          <div className="Video">
            <img src="./video.svg" className="Images" alt="Video"></img>
            <p className="car-info">Video</p>
          </div>
          <div className="View">
            <img src="./view.svg" className="Images" alt="View"></img>
            <p className="car-info">View</p>
          </div>
        </div>

      </div>
    )
  }
}


CarImage.propTypes = {
  model: PropTypes.shape({
    modelId: PropTypes.number,
    modelName: PropTypes.string,
    rating: PropTypes.number,
    imageUrl: PropTypes.string,
  })
}


export default CarImage;