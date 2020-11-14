import React from "react";
import '../App.css';
import Rating from "./Rating";



export default class CarName extends React.Component
{
  render()
  {
    return(
      <div className="RatingsAndReviews">
        <div className="Ratings">
          <p className="Car-Name">BMW { this.props.model.modelName}</p>
        </div>
        <div className="Path">
          <Rating RatingValue = {this.props.model.rating} MaxRating = {5}/>
        </div>
        <p className="-Reviews">456 Reviews</p> 
      </div>
    );
  }
}