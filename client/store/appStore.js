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
    //observer product list and master categories
    @observable productList = [];
    @observable matchingData = [];

    @observable listingData = {
        data: {},
        promiseState: {}
    };

    
    @action getMorePizzas(contractId) {
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

    //create item
    createProduct(product){
        this.productList.push( new newProduct(product));
    }

    fetchMatchingData(contractId){
        const form = {contractId : contractId };
        
        fetch('/matchingData', { 
            method: 'POST', 
            body: JSON.stringify(form),
            headers: { 'Content-Type': 'application/json' }
        })      
        .then((res) => this.matchingData = res.json())
        .catch(() => this.matchingData = []);

    }

    fetchListingData2(contractId){
        const form = {contractId : contractId };
        
        this.updateListing = [];

        fetch('/listingData', { 
            method: 'POST', 
            body: JSON.stringify(form),
            headers: { 'Content-Type': 'application/json' }
        })      
        .then(function(response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            console.log(response.json());
            return response.json();
        })
        .then(function(data) {
            this.updateListing(data);
        });
    }

    fetchListingData(contractId){
        const form = {contractId : contractId };

        var fetchResult = fromPromise( fetch('/listingData', { 
            method: 'POST', 
            body: JSON.stringify(form),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => {
            if (res.status >= 200 && res.status < 300) {
                return Promise.resolve(res)
            } else {
                return Promise.reject(new Error(res.statusText))
            }
        }).then(res => {
            return res.json()
        }).then(data => {
            console.log(data);
            return data
        }).catch(err => {
            console.log(err)
        }) )

        console.log(fetchResult);

        switch(fetchResult.state) {
            case "pending": return this.test(fetchResult.value)
            case "rejected": return this.test(fetchResult.value)
            case "fulfilled": return this.test(fetchResult.value)
        }        

        console.log(fetchResult);
    }

    
    test(d){
        console.log(d);
    }

    updateListing(data){
        console.log(data);
        matchingData = data;
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