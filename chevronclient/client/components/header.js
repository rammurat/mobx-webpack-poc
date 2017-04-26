import React from 'react';
import PropTypes from 'prop-types';
import { observer } from "mobx-react"; 
import { Link } from 'react-router';

import AppStore from '../store/appStore.js';

@observer
export default class header extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            orgLogo : "../../logos/logo.png"
        }
    };

    render(){
        const { organisationsList,currentUser,getOrganisation } = this.props.data;

        let org = getOrganisation(organisationsList,{id : currentUser.orgId});
        this.state.orgLogo = "../../logos/" + org.logo;

        console.log(this.state.orgLogo);

        function loadMenu(logo){

            const isLoggedIn = AppStore.getUserSession();
            
            return (isLoggedIn === true) ? (
            <div className="row">
                <div className="col-md-9">
                    <nav className="navbar navbar-default">
                        <div className="container-fluid">
                            <div className="navbar-header">
                                <a className="navbar-brand" href="#"></a>
                            </div>
                            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                                <ul className="nav navbar-nav">
                                    {/* Change from a to Link */}
                                    <li><Link to="/listing" activeClassName="active">Listing</Link></li>
                                    <li><Link to="/addTrade" activeClassName="active">Add Trade</Link></li>
                                    <li><Link to="/" activeClassName="active" >Signout</Link></li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
                <div className="col-md-3">
                    <img id="logo" className="logo" src={logo}/>
                </div>
            </div>) : ( <div> </div>)
        }

        return(
            <div>
                {loadMenu(this.state.orgLogo)}
            </div>
        );
    }
}