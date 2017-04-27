import {observable,computed,reaction,action} from 'mobx';
import fetch from 'isomorphic-fetch';
import {fromPromise} from 'mobx-utils';
import { bindPromise } from 'mobx-promise';
import  { _ } from 'underscore';

const uuidV1 = require('uuid/v1');

export class AppStore{
    @observable currentUser = {};
    @observable isLoggedIn = false;

    @observable usersList = [];
    
    //observer product list and master categories
    @observable organisationsList = [];

    @observable tradeTypeList = [{
        id : 1,
        name : "Date Pipeline Fixed price"
    },{
        id : 2,
        name : "Other"
    }];

    @observable marketTypeList = [{
        id : 1,
        name : "Physical Crude Oil"
    },{
        id : 2,
        name : "Other"
    }];

    @observable priceUOMList = [{
        id : 1,
        name : "USD/BBL"
    },{
        id : 2,
        name : "Other"
    }];

    @observable UOMList = [{
        id : 1,
        name : "BBL"
    },{
        id : 2,
        name : "Other"
    }];

    @observable productCodeList = [{
        id : 1,
        name : "MARS"
    },{
        id : 2,
        name : "DSW"
    },{
        id : 3,
        name : "WTS"
    },{
        id : 4,
        name : "POSEIDON"
    }];

    @observable deliveryLocation = [{
        id : 1,
        name : "Clovelly"
    },{
        id : 2,
        name : "Cushing"
    },{
        id : 3,
        name : "Houma"
    }];

    @observable paymentTermList = [{
        id : 1,
        name : "20FFMD"
    },{
        id : 2,
        name : "Other"
    }];

    @observable motList = [{
        id : 1,
        name : "Pipeline"
    },{
        id : 2,
        name : "In-line Transfer"
    }];

    @observable listingData = {
        data: {},
        promiseState: {}
    };

     @observable matchingData = {
        data: {},
        promiseState: {}
    };

     @observable tradorStatus = {
        data: {},
        promiseState: {}
    };

    
    @action fetchListingData(contractId) {
        const form = {contractId : contractId };
        
        const listingDataPromise = fetch('/listingData', { 
            method: 'POST', 
            body: JSON.stringify(form),
            headers: { 'Content-Type': 'application/json' }
        })      
        .then((res) => res.json())

        bindPromise(listingDataPromise)
            .to(this.listingData)
            .then((result) => console.log(this.listingData))
            .catch((err) => alert(err))
    }

    @action fetchMatchingData(contractId) {
        const form = {contractId : contractId };
        
        const matchingDataPromise = fetch('/matchingData', { 
            method: 'POST', 
            body: JSON.stringify(form),
            headers: { 'Content-Type': 'application/json' }
        })      
        .then((res) => res.json())

        bindPromise(matchingDataPromise)
            .to(this.matchingData)
            .then((result) => console.log(this.matchingData))
            .catch((err) => alert(err))
    }

    @action addTrador() {
        const form = {id : 1};
        
        const tradorStatusPromise = fetch('/addTrador', { 
            method: 'POST', 
            body: JSON.stringify(form),
            headers: { 'Content-Type': 'application/json' }
        })      
        .then((res) => res.json())

        bindPromise(tradorStatusPromise)
            .to(this.tradorStatus)
            .then((result) => console.log(this.tradorStatus))
            .catch((err) => alert(err))
    }

    //Set user and organisations once matched 
    @action setUser(userData) {
        
        this.organisationsList = userData.organisations;
        this.currentUser = userData.currentUser;
    }

    @action getUser() {
        
        return this.currentUser;
    }

    //Set user session state 
    @action updateUserSession(state) {
        
        this.isLoggedIn = state;
    }

    //load organisations
    getOrganisation(orgList,query) {
        
        return _.findWhere(orgList,query);
    }

    getUserSession(){
        return this.isLoggedIn;
    }

    @observable formData =[{
        id : uuidV1(), 
        fieldKey :  "Trade Number",
        fieldValue : "SHLTR16TB0342",
        fieldName : "tradeNumber" ,
        fieldLabel : "tradeNumberLabel" ,
        fieldError : "tradeNumberError",
        fieldType : "input"
    },{
        id : uuidV1(), 
        fieldKey :  "Buyer Name",
        fieldValue : "XYZ",
        fieldName : "buyerName" ,
        fieldLabel : "buyerNameLabel" ,
        fieldError : "buyerNameError",
        fieldType : "select" 
    },{
        id : uuidV1(), 
        fieldKey :  "Seller Name",
        fieldValue : "ABC",
        fieldName : "sellerName" ,
        fieldLabel : "sellerNameLabel" ,
        fieldError : "sellerNameError",
        fieldType : "readonly" 
    },{
        id : uuidV1(), 
        fieldKey :  "Trade Type",
        fieldValue : "Date Pipeline Fixed price",
        fieldName : "tradeType" ,
        fieldLabel : "tradeTypeLabel" ,
        fieldError : "tradeTypeError" ,
        fieldType : "select"
    },{
        id : uuidV1(), 
        fieldKey :  "Market Type",
        fieldValue : "Physical Crude Oil",
        fieldName : "marketType" ,
        fieldLabel : "marketTypeLabel" ,
        fieldError : "marketTypeError" ,
        fieldType : "select"

    },{
        id : uuidV1(), 
        fieldKey :  "Price",
        fieldValue : "100",
        fieldName : "price",
        fieldLabel : "priceLabel" ,
        fieldError : "priceError"  ,
        fieldType : "input"
    },{
        id : uuidV1(), 
        fieldKey :  "Price UOM",
        fieldValue : "BBL",
        fieldName : "priceUom" ,
        fieldLabel : "priceUomLabel" ,
        fieldError : "priceUomError" ,
        fieldType : "readonly"
    },{
        id : uuidV1(), 
        fieldKey :  "Quantity",
        fieldValue : "100",
        fieldName : "quantity" ,
        fieldLabel : "quantityLabel" ,
        fieldError : "quantityError" ,
        fieldType : "input"
    },{
        id : uuidV1(), 
        fieldKey :  "Quantity UOM",
        fieldValue : "BBL",
        fieldName : "quantityUom" ,
        fieldLabel : "quantityUomLabel" ,
        fieldError : "quantityUomError" ,
        fieldType : "readonly"
    },{
        id : uuidV1(), 
        fieldKey :  "Total Quantity",
        fieldValue : "30000",
        fieldName : "totalQuantity" ,
        fieldLabel : "totalQuantityLabel" ,
        fieldError : "totalQuantityError" ,
        fieldType : "input"
    },{
        id : uuidV1(), 
        fieldKey :  "Total QuantityUOM",
        fieldValue : "BBL",
        fieldName : "totalQuantityUom",
        fieldLabel : "totalQuantityUomLabel" ,
        fieldError : "totalQuantityUomError" ,
        fieldType : "readonly" 
    },{
        id : uuidV1(), 
        fieldKey :  "Trade Date",
        fieldValue : "24-04-2017",
        fieldName : "tradeDate" ,
        fieldLabel : "tradeDateLabel" ,
        fieldError : "tradeDateError" ,
        fieldType : "input"
    },{
        id : uuidV1(), 
        fieldKey :  "Start Date",
        fieldValue : "24-04-2017",
        fieldName : "startDate" ,
        fieldLabel : "startDateLabel" ,
        fieldError : "startDateError" ,
        fieldType : "input"
    },{
        id : uuidV1(), 
        fieldKey :  "End Date",
        fieldValue : "24-04-2017",
        fieldName : "endDate" ,
        fieldLabel : "endDateLabel" ,
        fieldError : "endDateError" ,
        fieldType : "input"
    },{
        id : uuidV1(), 
        fieldKey :  "Product Code",
        fieldValue : "MARS",
        fieldName : "productCode" ,
        fieldLabel : "productCodeLabel" ,
        fieldError : "productCodeError" ,
        fieldType : "select"
    },{
        id : uuidV1(), 
        fieldKey :  "Delivery Location",
        fieldValue : "Clovelly",
        fieldName : "deliveryLocation",
        fieldLabel : "deliveryLocationLabel" ,
        fieldError : "deliveryLocationError" ,
        fieldType : "select" 
    },{
        id : uuidV1(), 
        fieldKey :  "Payment Days",
        fieldValue : "20",
        fieldName : "paymetDays" ,
        fieldLabel : "paymetDaysLabel" ,
        fieldError : "paymetDaysError" ,
        fieldType : "input"
    },{
        id : uuidV1(), 
        fieldKey :  "Payment Terms",
        fieldValue : "20FFMD",
        fieldName : "paymentTerms" ,
        fieldLabel : "paymentTermsLabel" ,
        fieldError : "paymentTermsError" ,
        fieldType : "input"
    },{
        id : uuidV1(), 
        fieldKey :  "MOT",
        fieldValue : "Pipeline",
        fieldName : "mot" ,
        fieldLabel : "motLabel" ,
        fieldError : "motError" ,
        fieldType : "input"
    },{
        id : uuidV1(), 
        fieldKey :  "Owner Name",
        fieldValue : "XYZ",
        fieldName : "ownerName" ,
        fieldLabel : "ownerNameLabel" ,
        fieldError : "ownerNameError" ,
        fieldType : "readonly"
    }]
}

export default new AppStore;