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

class newProduct{
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
    constructor(product){
        
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

export class ProductStore{
    //observer product list and master categories
    @observable productList = [];
    @observable categories = [{
        id : Date.now() + Math.random(20),
        name : "Food"
    },{
        id : Date.now() + Math.random(20),
        name : "Clothing"
    },{
        id : Date.now() + Math.random(20),
        name : "Transport"
    }]

    //compute grouped product categories 
    @computed get filteredProductList(){
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

    //delete product
    deleteItem(id){
        //find product from list and remove
        this.productList = _.without(this.productList, _.findWhere(this.productList, {
            id: id
        }));
    }

    //create item
    createProduct(product){
        this.productList.push( new newProduct(product));
    }
}

export default new ProductStore;




