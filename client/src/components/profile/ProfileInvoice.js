import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import moment from 'moment';

const ProfileInvoice = ({
  invoice: { invoiceid, productid, supplierid, to, from, soluong, dongia, thanhtien, description }
}) => (
  <div>
    <p>
      <strong>Invoice ID: </strong> {invoiceid}
    </p>
    <p>
      <strong>Product ID: </strong> {productid}
    </p>
    <p>
      <strong>Supplier ID: </strong> {supplierid}
    </p>
    <p>
      <strong>Years: </strong><Moment format="YYYY/MM/DD">{moment.utc(from)}</Moment> -{' '}
      {!to ? ' Now' : <Moment format="YYYY/MM/DD">{moment.utc(to)}</Moment>}
    </p>
    <p>
      <strong>Quantity: </strong> {soluong}
    </p>
    <p>
      <strong>Unit Price: </strong> {dongia}
    </p>
    <p>
      <strong>Total: </strong> {thanhtien}
    </p>
    <p>
      <strong>Description: </strong> {description}
    </p>
  </div>
);

ProfileInvoice.propTypes = {
  invoice: PropTypes.object.isRequired
};

export default ProfileInvoice;
