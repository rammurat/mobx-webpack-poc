import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import {observable, expr} from 'mobx';

const ESCAPE_KEY = 27;
const ENTER_KEY = 13;

@observer
export default class Login extends React.Component {
	@observable editText = "";

	render() {

        //get objects from store
        const {categories} = this.props;

        //create category menu
        const catItems = categories ? categories.map(item => (
            <option key={item.id} value={item.name}>{item.name}</option>    
        )) : "";

		return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6 col-md-offset-3 col-sm-6 col-sm-offset-3">
                        <form  id="productForm" method="post" action="/login" noValidate>
                            <h2 className="form-signin-heading">Login</h2>
                            <div className="form-group">
                                <label className="sr-only" htmlFor="item" id="usernameLabel">Username</label>
                                <input name="username" className="form-control" id="item" placeholder="Username" ref="username" onChange={ this.handleChange } required/>
                                <div className="error" id="usernameError" />
                            </div>
                            <div className="form-group">
                                <label className="sr-only" htmlFor="price" id="passwordLabel">Password</label>
                                <input name="password" className="form-control" id="password" placeholder="Password" ref="password" onChange={ this.handleChange } required/>
                                <div className="error" id="passwordError" />
                            </div>
                            <div className="form-group">
                                <button className="btn btn-primary" onClick={this.handleSubmit}>Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
		);
	}
}

Login.propTypes = {
	login: PropTypes.object.isRequired
};
