import React from 'react';
import PropTypes from 'prop-types';
import { observer } from "mobx-react"; 
import { Link } from 'react-router';

@observer
export default class listing extends React.Component{

    render(){

        //get objects from store
        const {listingData} = this.props.route.data;

        console.log(listingData);

        switch(listingData.promiseState) {
            case 'pending':
                return <div> Loading... </div>

            case 'fulfilled':
                //group item categories
                listingData.data.map(function(item){
                    console.log(item.BuyerID.ValA);
                });

                //group item categories
                const listTable = listingData ? listingData.data.map(function(item){
                    <tr key={Date()}>
                        <td><Link to="/detail" activeClassName="active">{item.TradeNumber.ValA}</Link></td>
                        <td>{item.BuyerName.ValA}</td>
                        <td>{item.SellerName.ValA}</td>
                        <td>{item.BuyerID.ValA}</td>
                        <td>{item.SellerID.ValA}</td>
                        <td>{item.TradeType.ValA}</td>
                        <td>{item.MarketType.ValA}</td>
                        <td>{item.Price.ValA}</td>
                        <td>{item.PriceUOM.ValA}</td>
                        <td>{item.Quantity.ValA}</td>
                        <td>{item.QuantityUOM.ValA}</td>
                        <td>{item.TotalQuantity.ValA}</td>
                        <td>{item.TotalQuantityUOM.ValA}</td>
                        <td>{item.TradeDate.ValA}</td>
                        <td>{item.StartDate.ValA}</td>
                        <td>{item.EndDate.ValA}</td>
                        <td>{item.ProductCode.ValA}</td>
                        <td>{item.DeliveryLocation.ValA}</td>
                        <td>{item.PaymetDays.ValA}</td>
                        <td>{item.PaymentTerms.ValA}</td>
                        <td>{item.Mot.ValA}</td>
                        <td>{item.Owner.ValA}</td>
                        <td>{item.OwnerName.ValA}</td>
                        <td>{item.CreatorUser.ValA}</td>
                        <td>{item.TradeStatus.ValA}</td>
                        <td>{item.CreationTimestamp.ValA}</td>
                    </tr>
                }) : "";

                //render html
                return <div className="row productTable">
                    <h2>Trade Listing</h2>
                    <ul className="nav nav-tabs">
                        <li role="presentation" className="active"><a href="#">Pending</a></li>
                        <li role="presentation"><a href="#">Matched</a></li>
                        <li role="presentation"><a href="#">Unmatched</a></li>
                    </ul>
                    <table className="table table-striped table-responsive table-bordered">
                        <thead>
                            <tr>
                                <th>Trade Number</th>  
                                <th>Market Type</th>
                                <th> Direction  </th>
                                <th>  Price</th>  
                                <th> Price UOM</th>   
                                <th>  Quantity</th>   
                                <th>  Quantity UOM</th>
                                <th>  Total Quantity</th> 
                                <th>  Total QuantityUOM</th>   
                                <th>  Trade Date</th> 
                                <th>  Start Date</th> 
                                <th>  End Date   </th>
                                <th>  Trade Code   </th>
                                <th>  Delivery Location</th>   
                                <th> Paymet Days</th>
                                <th> Payment Terms   </th>
                                <th> MOT</th>
                                <th>Deal Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listTable}
                        </tbody>
                    </table>
                </div>

            case 'rejected':
                return <div > No trades available. </div>
        }
    }
}