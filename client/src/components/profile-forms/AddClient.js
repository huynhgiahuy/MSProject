import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addClient } from '../../actions/profile';

const AddClient = ({ addClient, history }) => {
  const [formData, setFormData] = useState({
    clientid: '',
    clientname: '',
    clientemail:'',
    clientaddress:'',
    clientcity: '',
    description: ''
  });

  const { clientid, clientname, clientemail, clientaddress, clientcity, description } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      <h1 className="large text-primary">Add Client</h1>
      <p className="lead">
        <i className="fas fa-code-branch" /> Add All Client Information
      </p>
      <small>* = required field</small>
      <form
        className="form"
        onSubmit={e => {
          e.preventDefault();
          addClient(formData, history);
        }}
      >
        <div className="form-group">
          <input
            type="text"
            placeholder="* Client ID"
            name="clientid"
            value={clientid}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Client Name"
            name="clientname"
            value={clientname}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Client Email"
            name="clientemail"
            value={clientemail}
            onChange={onChange}
          />
        </div>
         <div className="form-group">
          <input
            type="text"
            placeholder="Client Address"
            name="clientaddress"
            value={clientaddress}
            onChange={onChange}
          />
        </div>
         <div className="form-group">
          <input
            type="text"
            placeholder="Client City"
            name="clientcity"
            value={clientcity}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Description"
            value={description}
            onChange={onChange}
          />
        </div>
        <input type="submit" value = "Submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

AddClient.propTypes = {
  addClient: PropTypes.func.isRequired
};

export default connect(null, { addClient })(AddClient);
