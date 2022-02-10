import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteClient } from '../../actions/profile';

const Client = ({ client, deleteClient }) => {
  const clients = client.map(cli => (
    <tr key={cli._id}>
      <td>{cli.clientid}</td>
      <td>{cli.clientname}</td>
      <td>{cli.clientemail}</td>
      <td>{cli.clientaddress}</td>
      <td>{cli.clientcity}</td>
      <td>{cli.description}</td>
      <td>
        <button
          onClick={() => deleteClient(cli._id)}
          className="btn btn-danger"
        >
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className="my-2">Clients Information</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Client ID</th>
            <th className="hide-sm">Client Name</th>
            <th className="hide-sm">Client Email</th>
            <th className="hile-sm">Client Address</th>
            <th className="hile-sm">Client City</th>
            <th className="hile-sm">Description</th>
            <th />
          </tr>
        </thead>
        <tbody>{clients}</tbody>
      </table>
    </Fragment>
  );
};

Client.propTypes = {
  client: PropTypes.array.isRequired,
  deleteClient: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteClient }
)(Client);
