import React, {Component} from 'react';
import { Link } from 'react-router';

import AppStore from '../store/appStore.js';

class Main extends Component {

    render(){

        return(
            <div>
                <div className="container">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default Main