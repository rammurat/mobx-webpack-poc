'use strict';

import React from 'react';
import { browserHistory } from 'react-router';
import DatePicker from 'react-datepicker';
import moment from 'moment';

export default class addTrade extends React.Component {
      constructor(props) {
        super(props);

        this.state = {
            tradeNumber: '',
            buyerName: '',
            sellerName: '',
            buyerID: '',
            sellerID: '',
            tradeStatus: 'Active',
            tradeType: 'Date Pipeline Fixed price',
            marketType: 'Physical Crude Oil',
            price: '',
            priceUOM: 'USD/BBL',
            quantity: '',
            quantityUOM: 'BBL',
            totalQuantity: '',
            totalQuantityUOM: 'BBL',
            tradeDate: moment(),
            startDate: moment(),
            endDate: moment(),
            productCode: 'MARS',
            deliveryLocation: 'Clovelly',
            paymentDays: '',
            paymentTerms: '20FFMD',
            mot: 'Pipeline',
            owner: '',
            ownerName: '',
            creatorUser: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTradeDate = this.handleTradeDate.bind(this);
        this.handleStartDate = this.handleStartDate.bind(this);
        this.handleEndDate = this.handleEndDate.bind(this);
    }

    //update current field state on change 
    handleChange(e) {
        //add active class
        e.target.classList.add('active');

        //set state
        this.setState({
            [e.target.name]: e.target.value
        });

        if(e.target.name === "quantity"){
            this.setState({
                totalQuantity: (Number(e.target.value) * 30)
            }); 
        }

        if(e.target.name === "sellerName"){
            const { organisationsList,getOrganisation } = this.props.route.data;
            let sellerId = getOrganisation(organisationsList,{name : e.target.value});

            console.log(sellerId.id);

            this.setState({
                sellerName: e.target.value
            }); 

            this.setState({
                sellerID: sellerId.id
            }); 

        }

        //validate and show error
        this.showInputError(e.target.name);
    }

    handleTradeDate(date){
        
        this.setState({
            tradeDate: date
        });
    }
    handleStartDate(date){
        
        this.setState({
            startDate: date
        });
    }
    handleEndDate(date){
        
        this.setState({
            endDate: date
        });
    }

    //handle form submission 
    handleSubmit(e) {    
        e.preventDefault();

        if (!this.showFormErrors()) {
            console.log('form is invalid: do not submit');
        } else {
            console.log('form is valid: submit');

            //create object to send 
            let form = {
                tradeNumber: this.state.tradeNumber,
                buyerName: this.state.buyerName,
                sellerName: this.state.sellerName,
                buyerID: this.state.buyerID,
                sellerID: this.state.sellerID,
                tradeStatus: this.state.tradeStatus,
                tradeType: this.state.tradeType,
                marketType: this.state.marketType,
                price: this.state.price,
                priceUOM: this.state.priceUOM,
                quantity: this.state.quantity,
                quantityUOM: this.state.quantityUOM,
                totalQuantity: this.state.totalQuantity,
                totalQuantityUOM: this.state.totalQuantityUOM,
                tradeDate: this.state.tradeDate._d,
                startDate: this.state.startDate._d,
                endDate: this.state.endDate._d,
                productCode: this.state.productCode,
                deliveryLocation: this.state.deliveryLocation,
                paymentDays: this.state.paymentDays,
                paymentTerms: this.state.paymentTerms,
                mot: this.state.mot,
                owner: this.state.owner,
                ownerName: this.state.ownerName,
                creatorUser: this.state.creatorUser

            };
            console.log(form);

            //redirect user to dashbaord page 
            fetch('/addTrador', { 
                    method: 'POST', 
                    body: JSON.stringify(form),
                    headers: { 'Content-Type': 'application/json' }
                })
                .then(res => res.json())
                .then(function(json){
                    
                    console.log(json);
                    if(json.success){
                        browserHistory.push('/listing');
                    }else{
                        alert("Server error!!");
                    }
                });

        }
    }
    
    //reset form
    resetForm(){
        //get all input and select menus of form, if new form fields will introduce it will handle automatically 
        const inputs = document.querySelectorAll('input');
        const selects = document.querySelectorAll('select');
        
        //traverse input fields
        inputs.forEach(input => {
            input.classList.remove('active');
            input.value = "";
        });
        
        //traverse select fields 
        selects.forEach(select => {
            select.classList.remove('active');
            select.value = "";
        });
    }

    //show errors
    showFormErrors() {
        //get form fields 
        const inputs = document.querySelectorAll('input');
        const selects = document.querySelectorAll('select');
        
        let isFormValid = true;

        //traverse input fields 
        inputs.forEach(input => {
            //add error
            input.classList.add('active');

            const isInputValid = this.showInputError(input.name);

            if (!isInputValid) {
                isFormValid = false;
            }
        });
        
        //traverse select menu fields
        selects.forEach(select => {
            //add error
            select.classList.add('active');

            const isSelectValid = this.showInputError(select.name);

            if (!isSelectValid) {
                isFormValid = false;
            }
        });

        return isFormValid;
    }

    //validate input fields 
    showInputError(refName) {
        //fetch field
        const validity = this.refs[refName].validity;
        const label = document.getElementById(`${refName}Label`).textContent;
        const error = document.getElementById(`${refName}Error`);

        if(this.refs[refName].validity){

            //validate field
            if (!validity.valid) {
                if (validity.valueMissing) {
                    error.textContent = `${label} is a required field`; 
                } else if (validity.patternMismatch) {
                    error.textContent = `${label} price should be in digits`; 
                } 
                return false;
            }

            //update error message
            error.textContent = '';
            return true;

        }else{
            error.textContent = '';
            return true;
        }
    }
  
    
  render() {

    //get objects from store
    const {
            tradeTypeList,marketTypeList,priceUOMList,UOMList,
            productCodeList,deliveryLocation,paymentTermList,
            motList,organisationsList,getOrganisation,currentUser
          } = this.props.route.data;

    let org = getOrganisation(organisationsList,{id : currentUser.organisationId});

    //set state 
    this.state.buyerName = org.name;
    this.state.buyerID = org.id;
    this.state.ownerName = org.name;
    this.state.owner = org.id;
    this.state.creatorUser = currentUser.id;

    const tradeOptions = tradeTypeList ? tradeTypeList.map(item => (
        <option key={item.id} value={item.name}> {item.name} </option>
    )) : "";

    const marketOptions = marketTypeList ? marketTypeList.map(item => (
        <option key={item.id} value={item.name}> {item.name} </option>
    )) : "";

    const priceUOMoptions = priceUOMList ? priceUOMList.map(item => (
        <option key={item.id} value={item.name}> {item.name} </option>
    )) : "";

    const UOMOptions = UOMList ? UOMList.map(item => (
        <option key={item.id} value={item.name}> {item.name} </option>
    )) : "";

    const productCodeOptions = productCodeList ? productCodeList.map(item => (
        <option key={item.id} value={item.name}> {item.name} </option>
    )) : "";

    const deliveryOptions = deliveryLocation ? deliveryLocation.map(item => (
        <option key={item.id} value={item.name}> {item.name} </option>
    )) : "";

    const paymentTermOptions = paymentTermList ? paymentTermList.map(item => (
        <option key={item.id} value={item.name}> {item.name} </option>
    )) : "";

    const motOptions = motList ? motList.map(item => (
        <option key={item.id} value={item.name}> {item.name} </option>
    )) : "";

    const organisationOptions = organisationsList ? organisationsList.map(item => (
        <option key={item.id} value={item.name}> {item.name} </option>
    )) : "";
  

    return (
        <div className="container-fluid">
            <h4 className="form-signin-heading">Add Trade</h4>
            <div className="row">
                <form className="form-horizontal"  id="addTrade" name="addTrade" method="post" action="/listing" noValidate>
                    <div className="row">
                        
<div className="form-group col-md-6" >
    <label htmlFor="tradeNumber" id="tradeNumberLabel" className="col-sm-6 control-label">Trade Number</label>
    <div className="col-sm-6">
        <input name="tradeNumber" className="form-control" id="tradeNumber" ref="tradeNumber" onChange={ this.handleChange } required/>
        <div className="error" id="tradeNumberError" />
    </div>
</div>

<div className="form-group col-md-6" >
    <label htmlFor="buyerName" id="buyerNameLabel" className="col-sm-6 control-label">Buyer Name</label>
    <div className="col-sm-6">
        <input name="buyerName" className="form-control" id="buyerName" ref="buyerName" value={this.state.buyerName} onChange={ this.handleChange } readOnly/>
        <div className="error" id="buyerNameError" />
    </div>
</div>

<div className="form-group col-md-6" >
    <label htmlFor="sellerName" id="sellerNameLabel" className="col-sm-6 control-label">Seller Name</label>
    <div className="col-sm-6">
        <select name="sellerName" className="form-control" id="sellerName" ref="sellerName" onChange={ this.handleChange } required>
            <option value=""> Select </option>
            {organisationOptions}
        </select>
        <div className="error" id="sellerNameError" />
    </div>
</div>

<div className="form-group col-md-6" >
    <label htmlFor="tradeType" id="tradeTypeLabel" className="col-sm-6 control-label">Trade Type</label>
    <div className="col-sm-6">
        <select name="tradeType" className="form-control" id="tradeType" ref="tradeType" onChange={ this.handleChange } value={this.state.tradeType}>
            {tradeOptions}
        </select>
        <div className="error" id="tradeTypeError" />
    </div>
</div>

<div className="form-group col-md-6" >
    <label htmlFor="marketType" id="marketTypeLabel" className="col-sm-6 control-label">Market Type</label>
    <div className="col-sm-6">
        <select name="marketType" className="form-control" id="marketType" ref="marketType" onChange={ this.handleChange }>
            {marketOptions}
        </select>
        <div className="error" id="marketTypeError" />
    </div>
</div>

<div className="form-group col-md-6" >
    <label htmlFor="price" id="priceLabel" className="col-sm-6 control-label">Price</label>
    <div className="col-sm-6">
        <input pattern="[0-9]{1,10}"  name="price" className="form-control" id="price" ref="price" onChange={ this.handleChange } required/>
        <div className="error" id="priceError" />
    </div>
</div>

<div className="form-group col-md-6" >
    <label htmlFor="priceUom" id="priceUomLabel" className="col-sm-6 control-label">Price UOM</label>
    <div className="col-sm-6">
        <select name="priceUom" className="form-control" id="priceUom" ref="priceUom" onChange={ this.handleChange }>
            {priceUOMoptions}
        </select>
        <div className="error" id="priceUomError" />
    </div>
</div>

<div className="form-group col-md-6" >
    <label htmlFor="quantity" id="quantityLabel" className="col-sm-6 control-label">Quantity</label>
    <div className="col-sm-6">
        <input pattern="[0-9]{1,10}" name="quantity" className="form-control" id="quantity" ref="quantity" onChange={ this.handleChange } required/>
        <div className="error" id="quantityError" />
    </div>
</div>

<div className="form-group col-md-6" >
    <label htmlFor="quantityUom" id="quantityUomLabel" className="col-sm-6 control-label">Quantity Uom</label>
    <div className="col-sm-6">
        <select name="quantityUom" className="form-control" id="quantityUom" ref="quantityUom" onChange={ this.handleChange }>
            {UOMOptions}
        </select>
        <div className="error" id="quantityUomError" />
    </div>
</div>

<div className="form-group col-md-6" >
    <label htmlFor="totalQuantity" id="totalQuantityLabel" className="col-sm-6 control-label">Total Quantity</label>
    <div className="col-sm-6">
        <input value={this.state.totalQuantity} name="totalQuantity" className="form-control" id="totalQuantity" ref="totalQuantity" readOnly/>
        <div className="error" id="totalQuantityError" />
    </div>
</div>

<div className="form-group col-md-6" >
    <label htmlFor="totalQuantityUom" id="totalQuantityUomLabel" className="col-sm-6 control-label">Total Quantity Uom</label>
    <div className="col-sm-6">
        <select name="totalQuantityUom" className="form-control" id="totalQuantityUom" ref="totalQuantityUom" onChange={ this.handleChange }>
            {UOMOptions}
        </select>
        <div className="error" id="totalQuantityUomError" />
    </div>
</div>

<div className="form-group col-md-6" >
    <label htmlFor="tradeDate" id="tradeDateLabel" className="col-sm-6 control-label">Trade Date</label>
    <div className="col-sm-6">
        
        <DatePicker name="tradeDate" className="form-control"  id="tradeDate" ref="tradeDate" selected={this.state.tradeDate} onChange={this.handleTradeDate} />
        <div className="error" id="tradeDateError" />
    </div>
</div>

<div className="form-group col-md-6" >
    <label htmlFor="startDate" id="startDateLabel" className="col-sm-6 control-label">Start Date</label>
    <div className="col-sm-6">
        <DatePicker name="startDate" className="form-control"  id="startDate" ref="startDate" selected={this.state.startDate} onChange={this.handleStartDate} />
        <div className="error" id="startDateError" />
    </div>
</div>

<div className="form-group col-md-6" >
    <label htmlFor="endDate" id="endDateLabel" className="col-sm-6 control-label">End date</label>
    <div className="col-sm-6">
        <DatePicker name="endDate" className="form-control"  id="endDate" ref="endDate" selected={this.state.endDate} onChange={this.handleEndDate} />
        <div className="error" id="endDateError" />
    </div>
</div>

<div className="form-group col-md-6" >
    <label htmlFor="productCode" id="productCodeLabel" className="col-sm-6 control-label">Product Code</label>
    <div className="col-sm-6">
        <select name="productCode" className="form-control" id="productCode" ref="productCode" onChange={ this.handleChange }>
            {productCodeOptions}
        </select>
        <div className="error" id="productCodeError" />
    </div>
</div>

<div className="form-group col-md-6" >
    <label htmlFor="deliveryLocation" id="deliveryLocationLabel" className="col-sm-6 control-label">Delivery Location</label>
    <div className="col-sm-6">
        <select name="deliveryLocation" className="form-control" id="deliveryLocation" ref="deliveryLocation" onChange={ this.handleChange }>
            {deliveryOptions}
        </select>
        <div className="error" id="deliveryLocationError" />
    </div>
</div>

<div className="form-group col-md-6" >
    <label htmlFor="paymentDays" id="paymentDaysLabel" className="col-sm-6 control-label">Payment Days</label>
    <div className="col-sm-6">
        <input pattern="[0-9]{1,10}"  name="paymentDays" className="form-control" id="paymentDays" ref="paymentDays" onChange={ this.handleChange } required/>
        <div className="error" id="paymentDaysError" />
    </div>
</div>

<div className="form-group col-md-6" >
    <label htmlFor="paymentTerms" id="paymentTermsLabel" className="col-sm-6 control-label">Payment Terms</label>
    <div className="col-sm-6">
         <select name="paymentTerms" className="form-control" id="paymentTerms" ref="paymentTerms" onChange={ this.handleChange }>
            {paymentTermOptions}
        </select>
        <div className="error" id="paymentTermsError" />
    </div>
</div>

<div className="form-group col-md-6" >
    <label htmlFor="mot" id="motLabel" className="col-sm-6 control-label">MOT</label>
    <div className="col-sm-6">
        <select name="mot" className="form-control" id="mot" ref="mot" onChange={ this.handleChange }>
            {motOptions}
        </select>
        <div className="error" id="motError" />
    </div>
</div>

<div className="form-group col-md-6" >
    <label htmlFor="ownerName" id="ownerNameLabel" className="col-sm-6 control-label">Owner Name</label>
    <div className="col-sm-6">
        <input name="ownerName" className="form-control" value={this.state.ownerName} id="ownerName" ref="ownerName" onChange={ this.handleChange } readOnly/>
        <div className="error" id="ownerNameError" />
    </div>
</div>
                        
                    </div>
                    <div className="row">
                        <button className="btn btn-primary center-block" onClick={this.handleSubmit}>Add Trade</button>
                    </div>
                </form>
            </div>
        </div>
    );
  }
}