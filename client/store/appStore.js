import {observable,computed,reaction,action} from 'mobx';
import fetch from 'isomorphic-fetch';
import {fromPromise} from 'mobx-utils';
import { bindPromise } from 'mobx-promise'

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
    @observable usersList = [{
        id : 1,
        name : "John Walker",
        organisationId : "CHV"
    },{
        id : 2,
        name : "Paul Walker",
        organisationId : "CHV"
    },{
        id : 3,
        name : "Syan Smith",
        organisationId : "IOC"
    },{
        id : 4,
        name : "Lauren Iyer",
        organisationId : "IOC"
    }];
    
    //observer product list and master categories
    @observable organisations = [{
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
        id : Date.now() + "_" + Math.random(), 
        productKey :  "Trade Type",
        productValue : "SHLTR16TB0342:1",
    },{
        id : Date.now() + "_" + Math.random(), 
        productKey :  "Market Type",
        productValue : "Chevron Products Company, a division of Chevron USA Inc.",
    },{
        id : Date.now() + "_" + Math.random(), 
        productKey :  "Direction",
        productValue : "SHLTR16TB0342:1"
    },{
        id : Date.now() + "_" + Math.random(), 
        productKey :  "Price",
        productValue : "SHLTR16TB0342:1"
    },{
        id : Date.now() + "_" + Math.random(), 
        productKey :  "Price UOM",
        productValue : "SHLTR16TB0342:1"
    },{
        id : Date.now() + "_" + Math.random(), 
        productKey :  "Quantity",
        productValue : "33"
    },{
        id : Date.now() + "_" + Math.random(), 
        productKey :  "Quantity UOM",
        productValue : "22AA"
    },{
        id : Date.now() + "_" + Math.random(), 
        productKey :  "Total Quantity",
        productValue : "331"
    },{
        id : Date.now() + "_" + Math.random(), 
        productKey :  "Total QuantityUOM",
        productValue : "BBl:1"
    },{
        id : Date.now() + "_" + Math.random(), 
        productKey :  "Trade Date",
        productValue : "8-March"
    },{
        id : Date.now() + "_" + Math.random(), 
        productKey :  "Start Date",
        productValue : "6-March"
    },{
        id : Date.now() + "_" + Math.random(), 
        productKey :  "End Date",
        productValue : "4-March"
    },{
        id : Date.now() + "_" + Math.random(), 
        productKey :  "Product Code",
        productValue : "Mars"
    },{
        id : Date.now() + "_" + Math.random(), 
        productKey :  "Delivery Location",
        productValue : "Abu dhabi"
    },{
        id : Date.now() + "_" + Math.random(), 
        productKey :  "Paymet Days",
        productValue : "SHLTR16TB0342:1"
    },{
        id : Date.now() + "_" + Math.random(), 
        productKey :  "Payment Terms",
        productValue : "NA"
    },{
        id : Date.now() + "_" + Math.random(), 
        productKey :  "MOT",
        productValue : "Pipeline"
    },{
        id : Date.now() + "_" + Math.random(), 
        productKey :  "Deal Status",
        productValue : "ACTIVE"
    }]

    @observable formData =[{
        id : Date.now() + "_" + Math.random(), 
        fieldKey :  "Trade Type",
        fieldValue : "",
        fieldName : "tradeType" ,
        fieldLabel : "tradeTypeLabel" ,
        fieldError : "tradeTypeError" 
    },{
        id : Date.now() + "_" + Math.random(), 
        fieldKey :  "Market Type",
        fieldValue : "",
        fieldName : "marketType" ,
        fieldLabel : "marketTypeLabel" ,
        fieldError : "marketTypeError" 

    },{
        id : Date.now() + "_" + Math.random(), 
        fieldKey :  "Direction",
        fieldValue : "",
        fieldName : "direction",
        fieldLabel : "directionLabel" ,
        fieldError : "directionError" 
    },{
        id : Date.now() + "_" + Math.random(), 
        fieldKey :  "Price",
        fieldValue : "",
        fieldName : "price",
        fieldLabel : "priceLabel" ,
        fieldError : "priceError"  
    },{
        id : Date.now() + "_" + Math.random(), 
        fieldKey :  "Price UOM",
        fieldValue : "",
        fieldName : "priceUom" ,
        fieldLabel : "priceUomLabel" ,
        fieldError : "priceUomError" 
    },{
        id : Date.now() + "_" + Math.random(), 
        fieldKey :  "Quantity",
        fieldValue : "",
        fieldName : "quantity" ,
        fieldLabel : "quantityLabel" ,
        fieldError : "quantityError" 
    },{
        id : Date.now() + "_" + Math.random(), 
        fieldKey :  "Quantity UOM",
        fieldValue : "",
        fieldName : "quantityUom" ,
        fieldLabel : "quantityUomLabel" ,
        fieldError : "quantityUomError" 
    },{
        id : Date.now() + "_" + Math.random(), 
        fieldKey :  "Total Quantity",
        fieldValue : "",
        fieldName : "totalQuantity" ,
        fieldLabel : "totalQuantityLabel" ,
        fieldError : "totalQuantityError" 
    },{
        id : Date.now() + "_" + Math.random(), 
        fieldKey :  "Total QuantityUOM",
        fieldValue : "",
        fieldName : "totalQuantityUom",
        fieldLabel : "totalQuantityUomLabel" ,
        fieldError : "totalQuantityUomError"  
    },{
        id : Date.now() + "_" + Math.random(), 
        fieldKey :  "Trade Date",
        fieldValue : "",
        fieldName : "tradeDate" ,
        fieldLabel : "tradeDateLabel" ,
        fieldError : "tradeDateError" 
    },{
        id : Date.now() + "_" + Math.random(), 
        fieldKey :  "Start Date",
        fieldValue : "",
        fieldName : "startDate" ,
        fieldLabel : "startDateLabel" ,
        fieldError : "startDateError" 
    },{
        id : Date.now() + "_" + Math.random(), 
        fieldKey :  "End Date",
        fieldValue : "",
        fieldName : "endDate" ,
        fieldLabel : "endDateLabel" ,
        fieldError : "endDateError" 
    },{
        id : Date.now() + "_" + Math.random(), 
        fieldKey :  "Product Code",
        fieldValue : "",
        fieldName : "productCode" ,
        fieldLabel : "productCodeLabel" ,
        fieldError : "productCodeError" 
    },{
        id : Date.now() + "_" + Math.random(), 
        fieldKey :  "Delivery Location",
        fieldValue : "",
        fieldName : "deliveryLocation",
        fieldLabel : "deliveryLocationLabel" ,
        fieldError : "deliveryLocationError"  
    },{
        id : Date.now() + "_" + Math.random(), 
        fieldKey :  "Paymet Days",
        fieldValue : "",
        fieldName : "paymentDays" ,
        fieldLabel : "paymentDaysLabel" ,
        fieldError : "paymentDaysError" 
    },{
        id : Date.now() + "_" + Math.random(), 
        fieldKey :  "Payment Terms",
        fieldValue : "",
        fieldName : "paymentTerms" ,
        fieldLabel : "paymentTermsLabel" ,
        fieldError : "paymentTermsError" 
    },{
        id : Date.now() + "_" + Math.random(), 
        fieldKey :  "MOT",
        fieldValue : "",
        fieldName : "mot" ,
        fieldLabel : "motLabel" ,
        fieldError : "motError" 
    },{
        id : Date.now() + "_" + Math.random(), 
        fieldKey :  "Deal Status",
        fieldValue : "",
        fieldName : "dealStatus" ,
        fieldLabel : "dealStatusLabel" ,
        fieldError : "dealStatusError" 
    }]
}

export default new AppStore;