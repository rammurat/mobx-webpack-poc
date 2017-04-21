import {observable,computed} from 'mobx';
//const api = require("api");

function mData(contractId){
        
    const form = {contractId : contractId };
    console.log('form',form);
    
    return fetch('/matchingData', { 
        method: 'POST', 
        body: JSON.stringify(form),
        headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json())
    .then(function(json){
        console.log('JSON data',json);
        return json;
    });
}

var mmData = mData("A01");

mmData.then(function(data){
    console.log('data before store',data);
});   


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

    

// api.getMatchingData("A01").then(function(data){
//     console.log('data before store',data);

//     matchingData = data;
// });


export class AppStore{
    //observer product list and master categories
    @observable productList = [];
    @observable matchingData2 = [];

    //create item
    createProduct(product){
        this.productList.push( new newProduct(product));
    }

    @observable listingData = [{
      id : Date.now() + "_" + Math.random(), 
      tradeType:"SHLTR16TB0342:1",  
      marketType:"Chevron Products Company, a division of Chevron USA Inc.", 
      direction:"Chevron Products Company, a division of Chevron USA Inc.",   
      price:"90",   
      priceUOM:"USD/BBL",   
      quantity:"100000",    
      quantityUOM:"BBl",    
      totalQuantity:"10000",  
      totalQuantityUOM:"BBl",   
      tradedate:"15-3-2017",  
      startDate:"1-Apr",  
      endDate:"30-Apr",    
      productCode:"MARS",    
      deliveryLocation:"Clovelly",   
      paymetDays:"20", 
      paymentTerms:"",   
      mOT:"Pipeline", 
      dealStatus:"ACTIVE"
    },{
      id : Date.now() + "_" + Math.random(),
      tradeType:"SHLTR16TB0342:2",  
      marketType:"Chevron Products Company, ", 
      direction:"Chevron Products Company, a division of Chevron USA Inc.",   
      price:"90",   
      priceUOM:"USD/BBL",   
      quantity:"30000",    
      quantityUOM:"BBl",    
      totalQuantity:"30000",  
      totalQuantityUOM:"BBl",   
      tradedate:"15-3-2017",  
      startDate:"1-Apr",  
      endDate:"30-Apr",    
      productCode:"MARS",    
      deliveryLocation:"Clovelly",   
      paymetDays:"20", 
      paymentTerms:"",   
      mOT:"Pipeline", 
      dealStatus:"ACTIVE"
    }]

    @observable matchingData = {
        "TradeNumber":{
            "ValA":"A01",
            "ValB":"A01",
            "Match":false
        },
        "BuyerName":{
            "ValA":"A02",
            "ValB":"A02",
            "Match":false
        },
        "SellerName":{
            "ValA":"A03",
            "ValB":"A03",
            "Match":false
        },
        "BuyerID":{
            "ValA":"A04",
            "ValB":"A04",
            "Match":true
        },
        "SellerID":{
            "ValA":"A05",
            "ValB":"A05",
            "Match":true
        },
        "TradeType":{
            "ValA":"A06",
            "ValB":"A06",
            "Match":false
        },
        "MarketType":{
            "ValA":"A07",
            "ValB":"A07",
            "Match":false
        },
        "Price":{
            "ValA":"A08",
            "ValB":"A08",
            "Match":true
        },
        "PriceUOM":{
            "ValA":"A09",
            "ValB":"A09",
            "Match":false
        },
        "Quantity":{
            "ValA":"A10",
            "ValB":"A10",
            "Match":false
        },
        "QuantityUOM":{
            "ValA":"A11",
            "ValB":"A11",
            "Match":false
        },
        "TotalQuantity":{
            "ValA":"A12",
            "ValB":"A12",
            "Match":true
        },
        "TotalQuantityUOM":{
            "ValA":"A13",
            "ValB":"A13",
            "Match":true
        },
        "TradeDate":{
            "ValA":"A14",
            "ValB":"A14",
            "Match":true
        },
        "StartDate":{
            "ValA":"A15",
            "ValB":"A15",
            "Match":false
        },
        "EndDate":{
            "ValA":"A16",
            "ValB":"A16",
            "Match":true
        },
        "ProductCode":{
            "ValA":"A17",
            "ValB":"A17",
            "Match":true
        },
        "DeliveryLocation":{
            "ValA":"A18",
            "ValB":"A18",
            "Match":true
        },
        "PaymetDays":{
            "ValA":"A19",
            "ValB":"A19",
            "Match":false
        },
        "PaymentTerms":{
            "ValA":"A20",
            "ValB":"A20",
            "Match":true
        },
        "Mot":{
            "ValA":"A21",
            "ValB":"A21",
            "Match":true
        },
        "Owner":{
            "ValA":"A22",
            "ValB":"A22",
            "Match":false
        },
        "CreatorUser":{
            "ValA":"A23",
            "ValB":"A23",
            "Match":false
        },
        "CreationTimestamp":{
            "ValA":"2017-04-18 09:40:38.380852684 +0000 UTC",
            "ValB":"2017-04-18 09:42:30.822722935 +0000 UTC",
            "Match":false
        },
        "DealStatus":"Matched"
    }

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
        formKey :  "Trade Type",
        formValue : "",
    },{
        id : Date.now() + "_" + Math.random(), 
        formKey :  "Market Type",
        formValue : "",
    },{
        id : Date.now() + "_" + Math.random(), 
        formKey :  "Direction",
        formValue : ""
    },{
        id : Date.now() + "_" + Math.random(), 
        formKey :  "Price",
        formValue : ""
    },{
        id : Date.now() + "_" + Math.random(), 
        formKey :  "Price UOM",
        formValue : ""
    },{
        id : Date.now() + "_" + Math.random(), 
        formKey :  "Quantity",
        formValue : ""
    },{
        id : Date.now() + "_" + Math.random(), 
        formKey :  "Quantity UOM",
        formValue : ""
    },{
        id : Date.now() + "_" + Math.random(), 
        formKey :  "Total Quantity",
        formValue : ""
    },{
        id : Date.now() + "_" + Math.random(), 
        formKey :  "Total QuantityUOM",
        formValue : ""
    },{
        id : Date.now() + "_" + Math.random(), 
        formKey :  "Trade Date",
        formValue : ""
    },{
        id : Date.now() + "_" + Math.random(), 
        formKey :  "Start Date",
        formValue : ""
    },{
        id : Date.now() + "_" + Math.random(), 
        formKey :  "End Date",
        formValue : ""
    },{
        id : Date.now() + "_" + Math.random(), 
        formKey :  "Product Code",
        formValue : ""
    },{
        id : Date.now() + "_" + Math.random(), 
        formKey :  "Delivery Location",
        formValue : ""
    },{
        id : Date.now() + "_" + Math.random(), 
        formKey :  "Paymet Days",
        formValue : ""
    },{
        id : Date.now() + "_" + Math.random(), 
        formKey :  "Payment Terms",
        formValue : ""
    },{
        id : Date.now() + "_" + Math.random(), 
        formKey :  "MOT",
        formValue : ""
    },{
        id : Date.now() + "_" + Math.random(), 
        formKey :  "Deal Status",
        formValue : ""
    }]
}

export default new AppStore;