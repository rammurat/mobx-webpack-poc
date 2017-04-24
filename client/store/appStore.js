import {observable,computed,reaction,action} from 'mobx';
import fetch from 'isomorphic-fetch';
import {fromPromise} from 'mobx-utils';
import { bindPromise } from 'mobx-promise'
const uuidV1 = require('uuid/v1');

class newProduct{
    //observer each product
    @observable id;
    @observable name;
    @observable price;
    @observable category;

    //initialize product
    constructor(product){
        this.id = parseInt(Date.now()) + "_" + Math.random(20)
        this.name = product.name
        this.price = product.price
        this.category = product.category

    }
}

export class AppStore{
    @observable currentUser = {
        id : 1,
        name : "John Walker",
        organisationId : "CHV",
        username : "john",
        password : "john"
    };

    @observable usersList = [{
        id : 1,
        name : "John Walker",
        organisationId : "CHV",
        username : "john",
        password : "john"
    },{
        id : 2,
        name : "Paul Walker",
        organisationId : "CHV",
        username : "paul",
        password : "paul"
    },{
        id : 3,
        name : "Syan Smith",
        organisationId : "IOC",
        username : "syan",
        password : "syan"
    },{
        id : 4,
        name : "Lauren Iyer",
        organisationId : "IOC",
        username : "lauren",
        password : "lauren"
    }];
    
    //observer product list and master categories
    @observable organisationsList = [{
        id : "CHV",
        name : "Chevron Products a Division of Chevorn USA"
    },{
        id : "IOC",
        name : "Indian Oil Corporation"
    },{
        id : "BPL",
        name : "BP"
    },{
        id : "SHL",
        name : "Shell"
    }];

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

    //create item
    createProduct(product){
        this.productList.push( new newProduct(product));
    }

    // fetchListingData2(contractId){
    //     const form = {contractId : contractId };
        
    //     this.updateListing = [];

    //     fetch('/listingData', { 
    //         method: 'POST', 
    //         body: JSON.stringify(form),
    //         headers: { 'Content-Type': 'application/json' }
    //     })      
    //     .then(function(response) {
    //         if (response.status >= 400) {
    //             throw new Error("Bad response from server");
    //         }
    //         console.log(response.json());
    //         return response.json();
    //     })
    //     .then(function(data) {
    //         this.updateListing(data);
    //     });
    // }

    // fetchListingData(contractId){
    //     const form = {contractId : contractId };

    //     var fetchResult = fromPromise( fetch('/listingData', { 
    //         method: 'POST', 
    //         body: JSON.stringify(form),
    //         headers: { 'Content-Type': 'application/json' }
    //     }).then(res => {
    //         if (res.status >= 200 && res.status < 300) {
    //             return Promise.resolve(res)
    //         } else {
    //             return Promise.reject(new Error(res.statusText))
    //         }
    //     }).then(res => {
    //         return res.json()
    //     }).then(data => {
    //         console.log(data);
    //         return data
    //     }).catch(err => {
    //         console.log(err)
    //     }) )

    //     console.log(fetchResult);

    //     switch(fetchResult.state) {
    //         case "pending": return this.test(fetchResult.value)
    //         case "rejected": return this.test(fetchResult.value)
    //         case "fulfilled": return this.test(fetchResult.value)
    //     }        

    //     console.log(fetchResult);
    // }

    
    // test(d){
    //     console.log(d);
    // }

    // updateListing(data){
    //     console.log(data);
    //     matchingData = data;
    // }

    @observable detailData =[{
        id : uuidV1(), 
        productKey :  "Trade Type",
        productValue : "SHLTR16TB0342:1",
    },{
        id : uuidV1(), 
        productKey :  "Market Type",
        productValue : "Chevron Products Company, a division of Chevron USA Inc.",
    },{
        id : uuidV1(), 
        productKey :  "Direction",
        productValue : "SHLTR16TB0342:1"
    },{
        id : uuidV1(), 
        productKey :  "Price",
        productValue : "SHLTR16TB0342:1"
    },{
        id : uuidV1(), 
        productKey :  "Price UOM",
        productValue : "SHLTR16TB0342:1"
    },{
        id : uuidV1(), 
        productKey :  "Quantity",
        productValue : "33"
    },{
        id : uuidV1(), 
        productKey :  "Quantity UOM",
        productValue : "22AA"
    },{
        id : uuidV1(), 
        productKey :  "Total Quantity",
        productValue : "331"
    },{
        id : uuidV1(), 
        productKey :  "Total QuantityUOM",
        productValue : "BBl:1"
    },{
        id : uuidV1(), 
        productKey :  "Trade Date",
        productValue : "8-March"
    },{
        id : uuidV1(), 
        productKey :  "Start Date",
        productValue : "6-March"
    },{
        id : uuidV1(), 
        productKey :  "End Date",
        productValue : "4-March"
    },{
        id : uuidV1(), 
        productKey :  "Product Code",
        productValue : "Mars"
    },{
        id : uuidV1(), 
        productKey :  "Delivery Location",
        productValue : "Abu dhabi"
    },{
        id : uuidV1(), 
        productKey :  "Paymet Days",
        productValue : "SHLTR16TB0342:1"
    },{
        id : uuidV1(), 
        productKey :  "Payment Terms",
        productValue : "NA"
    },{
        id : uuidV1(), 
        productKey :  "MOT",
        productValue : "Pipeline"
    },{
        id : uuidV1(), 
        productKey :  "Deal Status",
        productValue : "ACTIVE"
    }]

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
        fieldKey :  "Paymet Days",
        fieldValue : "20",
        fieldName : "paymentDays" ,
        fieldLabel : "paymentDaysLabel" ,
        fieldError : "paymentDaysError" ,
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