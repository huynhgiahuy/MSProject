import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import moment from 'moment';

const ProfileProduct = ({
  product: { productid, title, soluong, dongia, to, from, supplierid, description }
}) => (
  <div>
     <p>
      <strong>Product ID: </strong> {productid}
    </p>
    <p>
      <strong>Product Name: </strong> {title}
    </p>
    <p>
      <strong>Years:</strong> <Moment format="YYYY/MM/DD">{moment.utc(from)}</Moment> -{' '}
      {!to ? ' Now' : <Moment format="YYYY/MM/DD">{moment.utc(to)}</Moment>}
    </p>
    <p>
      <strong>Quantity: </strong> {soluong}
    </p>
    <p>
      <strong>Unit Price: </strong> {dongia}
    </p>
    <p>
      <strong>Supplier ID: </strong> {supplierid}
    </p>
    <p>
      <strong>Description: </strong> {description}
    </p>
  </div>
);

ProfileProduct.propTypes = {
  product: PropTypes.object.isRequired
};

export default ProfileProduct;
