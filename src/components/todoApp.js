import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';

import Login from './login';

import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS } from '../constants';

import DevTool from 'mobx-react-devtools';

@observer
export default class MyApp extends React.Component {
	render() {
		const {todoStore, viewStore} = this.props;
		return (
			<div>
				<DevTool />
				<Login todoStore={todoStore} viewStore={viewStore} />
			</div>
		);
	}

	componentDidMount() {
		
	}
}

MyApp.propTypes = {
	viewStore: PropTypes.object.isRequired,
	todoStore: PropTypes.object.isRequired
};
