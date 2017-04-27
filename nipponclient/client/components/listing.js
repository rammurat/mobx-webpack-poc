import React from 'react';
import PropTypes from 'prop-types';
import { observer } from "mobx-react"; 
import { Link } from 'react-router';
const uuidV1 = require('uuid/v1');

import AppStore from '../store/appStore.js';
import Header from '../components/header.js';

@observer
export default class listing extends React.Component{

    constructor(props) {
        super(props);
        
        const user = AppStore.getUser();
        AppStore.fetchListingData(user.orgId);

    };
    
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
                    
                    if(listingData.data && listingData.data.length){
                        listingData.data.forEach(function(item){
                            let link = '/matching/' + item.TradeNumber.ValA;
                        
                            data.push(<tr key={uuidV1()}>
                                        <td><Link to={link} activeClassName="active">{item.TradeNumber.ValA}</Link></td>
                                        <td>{item.OwnerName.ValA}</td>
                                        <td>{item.BuyerName.ValA}</td>
                                        <td>{item.SellerName.ValA}</td>
                                        
                                        <td>{item.TradeType.ValA}</td>
                                        <td>{item.MarketType.ValA}</td>
                                        <td>{item.TotalQuantity.ValA}</td>
                                        <td>{item.TotalQuantityUOM.ValA}</td>
                                        
                                        <td>{item.TradeDate.ValA}</td>
                                        <td>{item.EndDate.ValA}</td>
                                        <td>{item.ProductCode.ValA}</td>
                                        <td>{item.DeliveryLocation.ValA}</td>

                                        <td>{item.PaymentTerms.ValA}</td>
                                        <td>{item.Mot.ValA}</td>
                                        <td>{item.Price.ValA}</td>
                                        <td>{item.TradeStatus.ValA}</td>

                                    </tr>)
                                
                            });
                    }

                    return data;
                }
                //render html
                return <div className="productTable ">
                    <Header data={this.props.route.data} />
                    <h2>Trade Listing</h2>
                    <ul className="nav nav-tabs">
                        <li role="presentation" className="active"><a href="#">Pending</a></li>
                        <li role="presentation"><a href="#">Matched</a></li>
                        <li role="presentation"><a href="#">Unmatched</a></li>
                    </ul>
                    <div className="aa">
                        <table className="table table-striped table-bordered table-condensed">
                            <thead>
                                <tr>
                                    <th>Trade Number</th>  
                                    <th>  Trade Origin   </th>
                                    <th>  Buyer Name</th> 
                                    <th>  Seller Name</th>

                                    <th> Trade Type</th>
                                    <th> Market Type</th>
                                    <th>  Total Quantity</th> 
                                    <th>  Total Quantity UOM</th>   
                                    
                                    <th>  Trade Date</th> 
                                    <th>  End Date   </th>
                                    <th>  Product Code   </th>
                                    <th> Delivery Location  </th>
                                    
                                    <th> Payment Terms   </th>
                                    <th> MOT</th>
                                    <th>  Price</th>
                                    <th>Trade Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {getTable()}
                            </tbody>
                        </table>
                    </div>
                </div>

            case 'rejected':
                return <div > No trades available. </div>
        }
    }
}