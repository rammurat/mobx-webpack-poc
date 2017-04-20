import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { observer } from "mobx-react"; 

@observer
export default class CarDetail extends Component {
    
	handleRedirect(){
        browserHistory.push('/cars');
    }
    render(){
        const tempdata = this.props.route.data;
        const id = this.props.params.id;
		
		//get objects from store
		const {detailData} = this.props.route.data;

		//group item categories
		const detailTable = detailData ? detailData.map(item => (
			<tr key={item.id}>
				<td>{item.productKey}</td>
				<td>{item.productValue}</td>
			</tr>    
		)) : "";


        return (
            <div>

				<h2>Product Detail</h2>
				<table className="table table-striped table-responsive">
					<thead>
						<tr>
							<th>Product</th>  
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						{detailTable}
					</tbody>
				</table>
			
            </div>
        );
    }
}