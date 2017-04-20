import {observable,computed} from 'mobx';

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
    //observer product list and master categories
    @observable productList = [];
   
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
}

export default new AppStore;