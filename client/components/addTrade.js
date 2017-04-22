'use strict';

import React from 'react';
import { browserHistory } from 'react-router';

export default class addTrade extends React.Component {
      constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    //update current field state on change 
    handleChange(e) {
        //add active class
        e.target.classList.add('active');

        //set state
        this.setState({
            [e.target.name]: e.target.value
        });

        //validate and show error
        this.showInputError(e.target.name);
    }

    //handle form submission 
    handleSubmit(e) {    
        e.preventDefault();

        if (!this.showFormErrors()) {
            console.log('form is invalid: do not submit');
        } else {
            console.log('form is valid: submit');

            //create object to send 
            let form = {'username': this.state.username,'password': this.state.password};
            console.log(form);

            //redirect user to dashbaord page 
            fetch('/login', { 
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
                        alert("Invalid credentials. Enter 'admin/admin' to login");
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
    }
  
    
  render() {

       //get objects from store
        const {formData} = this.props.route.data;

        //group item categories
        const formFields = formData ? formData.map(input => (
            <div className="form-group col-md-6" key={input.id}>
                <label htmlFor={input.fieldName} id={input.fieldLabel} className="col-sm-6 control-label">{input.fieldKey}</label>
                <div className="col-sm-6">
                    <input name={input.fieldName} className="form-control" id={input.fieldName} placeholder={input.formKey} ref={input.fieldName} onChange={ this.handleChange } required/>
                    <div className="error" id={input.fieldError} />
                </div>
            </div> 
        )) : "";

    return (
        <div className="container-fluid">
            <h4 className="form-signin-heading">Add Trade</h4>
            <div className="row">
                <form className="form-horizontal"  id="addTrade" name="addTrade" method="post" action="/listing" noValidate>
                    <div className="row">
                        {formFields}
                    </div>
                    <div className="row">
                        <button className="btn btn-primary center-block" onClick={this.handleSubmit}>Add</button>
                    </div>
                </form>
            </div>
        </div>
    );
  }
}