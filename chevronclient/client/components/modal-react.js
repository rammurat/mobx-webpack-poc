'use strict';

import React from 'react';
import {Button,Modal} from 'react-bootstrap';
import { Link } from 'react-router';

const MessageModal = React.createClass({
  getInitialState() {
    return { showModal: false,message: "Trade added successfully" };
  },

  close() {
    this.setState({ showModal: false });
  },

  open() {
    this.setState({ showModal: true });
  },


  render() {

    return (
      <div>

         <div id="modal-button" className="hidden" onClick={this.open} >
          Launch demo modal
        </div>
       
        <Modal show={this.state.showModal} onHide={this.close}>
          
          <Modal.Header closeButton>
            <Modal.Title>Add Trade</Modal.Title>
          </Modal.Header>
          
          <div className="modal-body">
            <p>{this.state.message}. Go back to <Link to="/listing" activeClassName="active">Listing</Link></p>
          </div>
          
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        
        </Modal>
      </div>
    );
  }
});

export default MessageModal;