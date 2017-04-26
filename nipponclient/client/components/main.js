import React, {Component} from 'react';
import { Link } from 'react-router';

import AppStore from '../store/appStore.js';

class Main extends Component {

    render(){

        return(
            <div>
                {this.props.children}
            </div>
        );
    }
}

export default Main