import React from 'react';
import PropTypes from 'prop-types';

const ProfileClient = ({
  client: { clientid, clientname, clientemail, clientaddress, clientcity, description }
}) => (
  <div>
     <p>
      <strong>Client ID: </strong> {clientid}
    </p>
    <p>
      <strong>Client Name: </strong> {clientname}
    </p>
    <p>
      <strong>Client Email: </strong> {clientemail}
    </p>
     <p>
      <strong>Client Address: </strong> {clientaddress}
    </p>
    <p>
      <strong>Client City: </strong> {clientcity}
    </p>
    <p>
      <strong>Description: </strong> {description}
    </p>
  </div>
);

ProfileClient.propTypes = {
  client: PropTypes.object.isRequired
};

export default ProfileClient;
