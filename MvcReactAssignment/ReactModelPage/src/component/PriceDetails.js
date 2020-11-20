import React from "react";
import '../App.css';
import PropTypes from 'prop-types';

class PriceDetails extends React.Component {
  render() {
    const { selectedVersion } = this.props;


    if (!selectedVersion) {
      return null;
    }


    return (
      <div data-test="priceDetails">
        <div data-test="pricebreakup">
          <span className="price" id="price"> ₹ { selectedVersion.price } Lakh</span>
          
          <span className="pricebreakup">View Price Breakup</span>

        </div>
        <span className="onroad">On-Road Price</span>

        <div className="emiDiv" data-test="emi">
          <p className="Emi">EMI ₹ 478,270</p>
          <p className="years">For 5 years</p>
          <button className="button">Customrize your Emi</button>

        </div>
      </div>
    )
  }
}

PriceDetails.propTypes = {
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


export default PriceDetails;