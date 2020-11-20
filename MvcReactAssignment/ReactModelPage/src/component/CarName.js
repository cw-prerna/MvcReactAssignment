import React from "react";
import '../App.css';
import Rating from "./Rating";
import PropTypes from 'prop-types';



class CarName extends React.Component {
  render() {

    const { model } = this.props;

    if (!model) {
      return null;
    }

    return (
      <div className="RatingsAndReviews" data-test="ratingsandreviews">
        <div className="Ratings">
          <p className="Car-Name">BMW { model.modelName}</p>
        </div>
        <div className="Path">
          <Rating RatingValue={model.rating} />
        </div>
        <p className="-Reviews">456 Reviews</p>
      </div>
    );
  }
}

CarName.propTypes = {
  model: PropTypes.shape({
    modelId: PropTypes.number,
    modelName: PropTypes.string,
    rating: PropTypes.number,
    imageUrl: PropTypes.string,
  })
}



export default CarName;

