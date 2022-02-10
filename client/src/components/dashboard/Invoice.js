import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import moment from 'moment';
import { connect } from 'react-redux';
import { deleteInvoice } from '../../actions/profile';

const Invoice = ({ invoice, deleteInvoice }) => {
  const invoices = invoice.map(edu => (
    <tr key={edu._id}>
      <td>{edu.invoiceid}</td>
      <td>{edu.productid}</td>
      <td>{edu.supplierid}</td>
      <td>
        <Moment format="YYYY/MM/DD">{moment.utc(edu.from)}</Moment> -{' '}
        {edu.to === null ? (
          ' Now'
        ) : (
          <Moment format="YYYY/MM/DD">{moment.utc(edu.to)}</Moment>
        )}
      </td>
      <td>{edu.soluong}</td>
      <td>{edu.dongia}</td>
      <td>{edu.thanhtien}</td>
      <td>{edu.description}</td>
      <td>
        <button
          onClick={() => deleteInvoice(edu._id)}
          className="btn btn-danger"
        >
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className="my-2">Invoices Information</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Invoice ID</th>
            <th>Product ID</th>
            <th className="hide-sm">Supplier ID</th>
            <th className="hide-sm">Years</th>
            <th className="hide-sm">Quantity</th>
            <th className="hide-sm">Unit Price</th>
            <th className="hide-sm">Total</th>
            <th className="hide-sm">Description</th>
            <th />
          </tr>
        </thead>
        <tbody>{invoices}</tbody>
      </table>
    </Fragment>
  );
};

Invoice.propTypes = {
  invoice: PropTypes.array.isRequired,
  deleteInvoice: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteInvoice }
)(Invoice);
