import React from 'react';
import PropTypes from 'prop-types';

const ProfileSupplier = ({
  supplier: { supplierid, suppliername, supplieremail, supplieraddress, productid, description }
}) => (
  <div>
     <p>
      <strong>Supplier ID: </strong> {supplierid}
    </p>
    <p>
      <strong>Supplier Name: </strong> {suppliername}
    </p>
    <p>
      <strong>Supplier Email: </strong> {supplieremail}
    </p>
     <p>
      <strong>Supplier Address: </strong> {supplieraddress}
    </p>
    <p>
      <strong>Product ID: </strong> {productid}
    </p>
    <p>
      <strong>Description: </strong> {description}
    </p>
  </div>
);

ProfileSupplier.propTypes = {
  supplier: PropTypes.object.isRequired
};

export default ProfileSupplier;
