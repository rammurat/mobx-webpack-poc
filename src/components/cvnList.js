'use strict';
import React from 'react';


export default class cvnList extends React.Component {
  render() {
    return (
         <div className=" container-fluid">   
            <div className="row">
      
                      <div className="col-md-12">
                        <ul className="nav nav-tabs">
                          <li className="nav-item">
                            <a className="nav-link active" href="#">Active</a>
                          </li>
                          <li className="nav-item">
                            <a className="nav-link" href="#">Link</a>
                          </li>
                          <li className="nav-item">
                            <a className="nav-link" href="#">Link</a>
                          </li>
                          <li className="nav-item">
                            <a className="nav-link disabled" href="#">Disabled</a>
                          </li>
                        </ul>  

                      </div>
             </div>
            

          <div className="row">
             <div className="col-md-12">
                <table className="table table-striped table-bordered">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr claclassNamess="warning">
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                      </tr>
                      <tr className="success" >
                        <th scope="row">2</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@TwBootstrap</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@TwBootstrap</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@TwBootstrap</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@TwBootstrap</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@TwBootstrap</td>
                      </tr>
                      <tr className="warning">
                        <th scope="row">3</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                      </tr>
                      <tr>
                        <th scope="row">4</th>
                        <td colspan="2">Larry the Bird</td>
                        <td>@ twitter</td>
                        <td>@ twitter</td>
                        <td>Larry the Bird</td>
                        <td>@ twitter</td>
                        <td>@ twitter</td>
                        <td>Larry the Bird</td>
                        <td>@ twitter</td>
                        <td>@ twitter</td>
                        <td>Larry the Bird</td>
                        <td>@ twitter</td>
                        <td>@ twitter</td>
                        <td>Larry the Bird</td>
                        <td>@ twitter</td>
                        <td>@ twitter</td>
                      </tr>
                    </tbody>
              </table>
            </div>
         </div>
      </div>
      
    );
  }
}
