import React, {Component} from 'react';
import { Link } from 'react-router';

class Main extends Component {
    render(){
        return(
            <div>
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
                                        <li><Link to="/" activeClassName="active">Signout</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                    </div>
                    <div className="col-md-3">
                        <img className="logo" src="logos/nippon.png"/>
                    </div>
                </div>
                
                <div className="container">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default Main