import {observable,computed} from 'mobx';
import {_} from "underscore";

             


// TradeNumber
// TradeOrigin
// Buyer
// Seller
// TradeType
// MarketType
// Direction
// Price
// Price UOM
// Quantity
// QuantityUOM
// TotalQuantity
// TotalQuantityUOM
// Tradedate 
// StartDate
// EndDate
// ProductCode
// DeliveryLocation
// PaymetDays
// PaymentTerms
// MOT
// DealStatus

class newList{
    //observer each product
   
     @observable TradeType  
     @observable MarketType 
     @observable Direction   
     @observable Price   
     @observable PriceUOM   
     @observable Quantity    
     @observable QuantityUOM    
     @observable TotalQuantity  
     @observable TotalQuantityUOM   
     @observable Tradedate  
     @observable StartDate  
     @observable EndDate    
     @observable ProductCode    
     @observable DeliveryLocation   
     @observable PaymetDays 
     @observable PaymentTerms   
     @observable MOT 
     @observable DealStatus



    //initialize product
    constructor(list){
        
     this.TradeType        =  TradeType  
     this.MarketType       =  MarketType
     this.Direction        =  Direction   
     this.Price            =  Price   
     this.PriceUOM         =  PriceUOM   
     this.Quantity         =  Quantity  
     this.QuantityUOM      =  QuantityUOM  
     this.TotalQuantity    =  TotalQuantity 
     this.TotalQuantityUOM = TotalQuantityUOM  
     this.Tradedate        = Tradedate
     this.StartDate        = StartDate
     this.EndDate          = EndDate
     this.ProductCode      = ProductCode  
     this.DeliveryLocation = DeliveryLocation  
     this.PaymetDays       = PaymetDays
     this.PaymentTerms     = PaymentTerms 
     this.MOT              = MOT
     this.DealStatus       = DealStatus
    }
}

export class listStore{
    //observer product list and master categories
    @observable cvnList = [];
    @observable cvndata = [{
      TradeType:"SHLTR16TB0342:1",  
      MarketType:"Chevron Products Company, a division of Chevron USA Inc.", 
      Direction:"Chevron Products Company, a division of Chevron USA Inc.",   
      Price:"90",   
      PriceUOM:"USD/BBL",   
      Quantity:"100000",    
      QuantityUOM:"BBl",    
      TotalQuantity:"10000",  
      TotalQuantityUOM:"BBl",   
      Tradedate:"15-3-2017",  
      StartDate:"1-Apr",  
      EndDate:"30-Apr",    
      ProductCode:"MARS",    
      DeliveryLocation:"Clovelly",   
      PaymetDays:"20", 
      PaymentTerms:"",   
      MOT:"Pipeline", 
      DealStatus:"ACTIVE"



    },{
      TradeType:"SHLTR16TB0342:2",  
      MarketType:"Chevron Products Company, ", 
      Direction:"Chevron Products Company, a division of Chevron USA Inc.",   
      Price:"90",   
      PriceUOM:"USD/BBL",   
      Quantity:"30000",    
      QuantityUOM:"BBl",    
      TotalQuantity:"30000",  
      TotalQuantityUOM:"BBl",   
      Tradedate:"15-3-2017",  
      StartDate:"1-Apr",  
      EndDate:"30-Apr",    
      ProductCode:"MARS",    
      DeliveryLocation:"Clovelly",   
      PaymetDays:"20", 
      PaymentTerms:"",   
      MOT:"Pipeline", 
      DealStatus:"ACTIVE"

    }]


    
    //compute grouped product categories 
    @computed get cvnList(){
        var groups = [];

        if(this.productList.length){
            //group products
            groups = _.groupBy(this.productList,  "category");
            var data = _.map(groups,function(g, key) {
                return { 
                    id: Date.now() + Math.random(20),
                    name : key,
                    price: _.reduce(g,function(m,x) { 
                        return Number(m) + Number(x.price);
                    }, 0) 
                };
            });
            data = _.sortBy(data, 'price');
        }

        return data;
    } 

    
    //create item
    createProduct(product){
        this.productList.push( new newProduct(product));
    }
}

export default new listStore;




