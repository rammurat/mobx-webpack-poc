import React, {Component} from 'react';
import { Link } from 'react-router';

class Main extends Component {
    render(){
        return(
            <div>
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="#"></a>
                        </div>
                        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            <ul className="nav navbar-nav">
                                {/* Change from a to Link */}
                                <li><Link to="/" activeClassName="active">Home</Link></li>
                                <li><Link to="/addForm" activeClassName="">Add Trade</Link></li>
                                <li><Link to="/detail" activeClassName="">Detail</Link></li>
                                <li><Link to="/listing" activeClassName="">Listing</Link></li>
                                <li><Link to="/matching" activeClassName="">Matching</Link></li>
                                <li><Link to="/" activeClassName="">Signout</Link></li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className="container">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default Main