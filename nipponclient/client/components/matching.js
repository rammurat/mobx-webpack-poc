import React from 'react';
import PropTypes from 'prop-types';
import { observer } from "mobx-react"; 
const uuidV1 = require('uuid/v1');

import AppStore from '../store/appStore.js';
import Header from '../components/header.js';
import {keyMapping} from '../utils/utils.js';

@observer
export default class matching extends React.Component{
    constructor(props) {
        super(props);
        AppStore.fetchMatchingData(this.props.params.trade);
        this.state = {
            status : 'Pending',
            statusClass : 'btn btn-default'
        }
    }

    render(){

        //get objects from store
        const {matchingData} = this.props.route.data;

        switch(matchingData.promiseState) {
            case 'pending':
                return <div> Loading... </div>

            case 'fulfilled':

                //set deal status
                if(matchingData.data.DealStatus === "Matched"){
                    this.state = {
                        status : 'Matched',
                        statusClass : 'btn btn-success'
                    }
                }else if(matchingData.data.DealStatus === "Unmatched"){
                    this.state = {
                        status : 'Unmatched',
                        statusClass : 'btn btn-warning'
                    }
                }

                function getTableHead(){
                    if(matchingData.data.TradeNumber.ValB !== ""){
                        return(<tr>
                            <th>Type</th>  
                            <th>Trador 1</th>
                            <th>Trador 2</th>
                            <th>Status</th>
                        </tr>)
                    }else{
                        return(<tr>
                            <th>Type</th>  
                            <th>Trador 1</th>
                        </tr>)
                    }
                }

                //group item categories
                function getTableBody(){
                    var data = [];

                    //no status is not pending
                    if(matchingData.data.TradeNumber.ValB === ""){
                        const matchingTable = Object.keys(matchingData.data).forEach(function (key) {
                            
                            if(key !== "DealStatus" && key !== "BuyerID" && key !== "DealStatus" && key !== "SellerID" && key !== "Owner" && key !== "CreatorUser"){
                                data.push(<tr key={uuidV1()}>
                                    <td>{keyMapping[key]}</td>
                                    <td>{matchingData.data[key].ValA}</td>
                                </tr>) 
                            }
                        });
                    }else{
                        const matchingTable = Object.keys(matchingData.data).forEach(function (key) {
                            
                            if(key !== "DealStatus" && key !== "BuyerID" && key !== "DealStatus" && key !== "SellerID" && key !== "Owner" && key !== "CreatorUser"){
                                var statusClass = (matchingData.data[key].Match === true) ? "btn btn-success" : "btn btn-warning",
                                    status = (matchingData.data[key].Match === true) ? "Yes" : "No"
                                data.push(<tr key={uuidV1()}>
                                    <td>{keyMapping[key]}</td>
                                    <td>{matchingData.data[key].ValA}</td>
                                    <td>{matchingData.data[key].ValB}</td>
                                    <td>{matchingData.data[key].Match}<button type="button" className={statusClass}>{status}</button></td>
                                </tr>) 
                            }
                        });
                    }

                    return data;
                }
                
                //render html
                return <div>
                    <Header data={this.props.route.data}/>
                    <h2>Deal Matching</h2>
                    <div className="well">
                        <span className="pull-left"> <strong>Deal Status</strong> </span> 
                        <span className="pull-right"> <button type="button" className={this.state.statusClass}>{this.state.status}</button> </span>
                    </div>
                    <table className="table table-striped table-responsive  table-condensed">
                        <thead>
                            {getTableHead()}
                        </thead>
                        <tbody>
                            {getTableBody()}
                        </tbody>
                    </table>
                </div>
             case 'rejected':
                return <div > No trades available. </div>
        }

    }
}