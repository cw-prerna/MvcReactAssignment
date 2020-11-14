import React from 'react'

export default function Rating(props) {
    const { RatingValue, MaxRating } = props;
    console.log(RatingValue);
    let RatingArr = [];
    for(let i = 0; i < MaxRating; i++) {
        if(i < RatingValue)
            RatingArr.push("star");
        else
            RatingArr.push("nv");
    }
    return (
        RatingArr.map((rating, index) => {
            return rating === "star" ? (<span className="fa fa-star star" key = {index}></span>) : (<span key = {index} className="fa fa-star nv"></span>); 
        })
    )
}
