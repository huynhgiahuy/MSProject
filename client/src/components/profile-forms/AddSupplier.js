import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addSupplier } from '../../actions/profile';

const AddSupplier = ({ addSupplier, history }) => {
  const [formData, setFormData] = useState({
    supplierid: '',
    suppliername: '',
    supplieremail:'',
    supplieraddress:'',
    productid: '',
    description: ''
  });

  const { supplierid, suppliername, supplieremail, supplieraddress, productid, description } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      <h1 className="large text-primary">Add Supplier</h1>
      <p className="lead">
        <i className="fas fa-code-branch" /> Add All Supplier Information
      </p>
      <small>* = required field</small>
      <form
        className="form"
        onSubmit={e => {
          e.preventDefault();
          addSupplier(formData, history);
        }}
      >
        <div className="form-group">
          <input
            type="text"
            placeholder="* Supplier ID"
            name="supplierid"
            value={supplierid}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Supplier Name"
            name="suppliername"
            value={suppliername}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Supplier Email"
            name="supplieremail"
            value={supplieremail}
            onChange={onChange}
          />
        </div>
         <div className="form-group">
          <input
            type="text"
            placeholder="Supplier Address"
            name="supplieraddress"
            value={supplieraddress}
            onChange={onChange}
          />
        </div>
         <div className="form-group">
          <input
            type="text"
            placeholder="* Product ID"
            name="productid"
            value={productid}
            onChange={onChange}
            required
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

AddSupplier.propTypes = {
  addSupplier: PropTypes.func.isRequired
};

export default connect(null, { addSupplier })(AddSupplier);
