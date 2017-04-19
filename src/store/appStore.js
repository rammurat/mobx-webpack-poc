import {observable,computed} from 'mobx';
import {_} from "underscore";

class newForm{
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
    @observable listStore = [{
        id : Date.now() + Math.random(20),
        name : "Food"
    },{
        id : Date.now() + Math.random(20),
        name : "Clothing"
    },{
        id : Date.now() + Math.random(20),
        name : "Transport"
    }]

}

export default new AppStore;