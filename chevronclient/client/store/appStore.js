import {observable,computed,reaction,action} from 'mobx';
import fetch from 'isomorphic-fetch';
import {fromPromise} from 'mobx-utils';
import { bindPromise } from 'mobx-promise';
import  { _ } from 'underscore';

const uuidV1 = require('uuid/v1');

export class AppStore{
    @observable currentUser = {};
    @observable listType = "All";
    @observable isLoggedIn = false;
    @observable activeTab = { name: 'All', isActive: true };
    @observable usersList = [];
    @observable tabData = [
        { name: 'All', isActive: true },
        { name: 'Pending', isActive: true },
        { name: 'Matched', isActive: false },
        { name: 'Unmatched', isActive: false }  
    ];
    
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
        name : "INR/BBL"
    },{
        id : 3,
        name : "GBP/BBL"
    },{
        id : 4,
        name : "EUR/BBL"
    },{
        id : 5,
        name : "RUB/BBL"
    },{
        id : 6,
        name : "Other"
    }];

    @observable UOMList = [{
        id : 1,
        name : "USD"
    },{
        id : 2,
        name : "INR"
    },{
        id : 3,
        name : "GBP"
    },{
        id : 4,
        name : "EUR"
    },{
        id : 5,
        name : "RUB"
    },{
        id : 6,
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

    @action setListType(type){
        this.listType = type;
    }
    
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

    @action getListType() {
        
        return this.listType;
    }

    //Set user session state 
    @action updateUserSession(state) {
        
        this.isLoggedIn = state;
    }

    //load organisations
    getOrganisation(orgList,query) {
        
        return _.findWhere(orgList,query);
    }

    //load organisations
    @action getTab(state) {
        let tab = _.findWhere(this.tabData,{name : state})
        return tab;
    }

    @action getActiveTab() {
        return this.activeTab;
    }

    @action setActiveTab(tab) {
        this.activeTab = tab;
    }

    getUserSession(){
        return this.isLoggedIn;
    }

}

export default new AppStore;