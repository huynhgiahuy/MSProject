import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteSupplier } from '../../actions/profile';

const Supplier = ({ supplier, deleteSupplier }) => {
  const suppliers = supplier.map(sup => (
    <tr key={sup._id}>
      <td>{sup.supplierid}</td>
      <td>{sup.suppliername}</td>
      <td>{sup.supplieremail}</td>
      <td>{sup.supplieraddress}</td>
      <td>{sup.productid}</td>
      <td>{sup.description}</td>
      <td>
        <button
          onClick={() => deleteSupplier(sup._id)}
          className="btn btn-danger"
        >
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className="my-2">Suppliers Information</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Supplier ID</th>
            <th className="hide-sm">Supplier Name</th>
            <th className="hide-sm">Supplier Email</th>
            <th className="hile-sm">Supplier Address</th>
            <th className="hile-sm">Product ID</th>
            <th className="hile-sm">Description</th>
            <th />
          </tr>
        </thead>
        <tbody>{suppliers}</tbody>
      </table>
    </Fragment>
  );
};

Supplier.propTypes = {
  supplier: PropTypes.array.isRequired,
  deleteSupplier: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteSupplier }
)(Supplier);
