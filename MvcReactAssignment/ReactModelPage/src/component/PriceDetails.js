import React from "react";
import '../App.css';

export default class PriceDetails extends React.Component
{
  render()
  {
    return(
      <div>
            <div >
             <span className="price"> ₹ {this.props.selectedVersion.price} Lakh</span>
            <span className="pricebreakup">View Price Breakup</span>

            </div>
            <span className="onroad">On-Road Price</span>

            <div className="emiDiv">
           <p className="Emi">EMI ₹ 478,270</p>
           <p className="years">For 5 years</p>
           <button className="button">Customrize your Emi</button>
          
            </div>
      </div>
    )
  }
}