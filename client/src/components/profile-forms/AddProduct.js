import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addProduct } from '../../actions/profile';

const AddProduct = ({ addProduct, history }) => {
  const [formData, setFormData] = useState({
    productid: '',
    title: '',
    soluong:'',
    dongia:'',
    from: '',
    to: '',
    supplierid: '',
    description: ''
  });

  const { productid, title, soluong, dongia, from, to, supplierid, description } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      <h1 className="large text-primary">Add Products</h1>
      <p className="lead">
        <i className="fas fa-code-branch" /> Add All Products Information
      </p>
      <small>* = required field</small>
      <form
        className="form"
        onSubmit={e => {
          e.preventDefault();
          addProduct(formData, history);
        }}
      >
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
          <input
            type="text"
            placeholder="* Product Name"
            name="title"
            value={title}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Quantity"
            name="soluong"
            value={soluong}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Unit Price"
            name="dongia"
            value={dongia}
            onChange={onChange}
            required
          />
        </div>
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
          <h4>From Date</h4>
          <input type="date" name="from" value={from} onChange={onChange} />
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input
            type="date"
            name="to"
            value={to}
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

AddProduct.propTypes = {
  addProduct: PropTypes.func.isRequired
};

export default connect(null, { addProduct })(AddProduct);
