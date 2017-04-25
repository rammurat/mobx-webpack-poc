import React from 'react';
import PropTypes from 'prop-types';
import { observer } from "mobx-react"; 
import { Link } from 'react-router';
const uuidV1 = require('uuid/v1');

import AppStore from '../store/appStore.js';
AppStore.fetchListingData("NPN");

@observer
export default class listing extends React.Component{
    
    render(){

        //get objects from store
        const {listingData} = this.props.route.data;

        switch(listingData.promiseState) {
            case 'pending':
                return <div> Loading... </div>

            case 'fulfilled':
                //group item categories
                 function getTable(){
                    var data = [];
                    
                    listingData.data.forEach(function(item){
                        let link = '/matching/' + item.TradeNumber.ValA;

                        
                            data.push(<tr key={uuidV1()}>
                                <td><Link to={link} activeClassName="active">{item.TradeNumber.ValA}</Link></td>
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
                            </tr>)
                        
                    });

                    return data;
                }
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
                                <th>  Buyer Name</th> 
                                <th>  Seller Name</th>
                                <th>  Buyer ID</th> 
                                <th>  Seller ID</th>  
                                <th> Trade Type</th>
                                <th> Market Type</th>
                                <th>  Price</th>  
                                <th> Price UOM</th>   
                                <th>  Quantity</th>   
                                <th>  Quantity UOM</th>
                                <th>  Total Quantity</th> 
                                <th>  Total QuantityUOM</th>   
                                <th>  Trade Date</th> 
                                <th>  Start Date</th> 
                                <th>  End Date   </th>
                                <th>  Product Code   </th>
                                <th> Direction  </th>
                                <th> Payment Days</th>
                                <th> Payment Terms   </th>
                                <th> MOT</th>
                                <th>  Owner ID   </th>
                                <th>  Owner Name   </th>
                                <th>Creator User</th>
                                <th>Trade Status</th>
                                <th>Creation Timestamp</th>
                            </tr>
                        </thead>
                        <tbody>
                            {getTable()}
                        </tbody>
                    </table>
                </div>

            case 'rejected':
                return <div > No trades available. </div>
        }
    }
}