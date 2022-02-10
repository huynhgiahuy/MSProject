import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import moment from 'moment';
import { connect } from 'react-redux';
import { deleteProduct } from '../../actions/profile';

const Product = ({ product, deleteProduct }) => {
  const products = product.map(exp => (
    <tr key={exp._id}>
      <td>{exp.productid}</td>
      <td className="hide-sm">{exp.title}</td>
      <td>
        <Moment format="YYYY/MM/DD">{moment.utc(exp.from)}</Moment> -{' '}
        {exp.to === null ? (
          ' Now'
        ) : (
          <Moment format="YYYY/MM/DD">{moment.utc(exp.to)}</Moment>
        )}
      </td>
      <td>{exp.soluong}</td>
      <td>{exp.dongia}</td>
      <td>{exp.supplierid}</td>
      <td>{exp.description}</td>
      <td>
        <button
          onClick={() => deleteProduct(exp._id)}
          className="btn btn-danger"
        >
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className="my-2">Products Information</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Product ID</th>
            <th className="hide-sm">Product Name</th>
            <th className="hide-sm">Years</th>
            <th className="hile-sm">Quantity</th>
            <th className="hile-sm">Unit Price</th>
            <th className="hile-sm">Supplier ID</th>
            <th className="hile-sm">Description</th>
            <th />
          </tr>
        </thead>
        <tbody>{products}</tbody>
      </table>
    </Fragment>
  );
};

Product.propTypes = {
  product: PropTypes.array.isRequired,
  deleteProduct: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteProduct }
)(Product);
