import React from 'react';
import { Link } from 'react-router-dom';

const DashboardActions = () => {
  return (
    <div className='dash-buttons'>
      <Link to='/edit-profile' className='btn btn-light'>
        <i className='fas fa-user-circle text-primary' /> Edit Profile
      </Link>
      <Link to='/add-supplier' className='btn btn-light'>
        <i className='fas fa-user-tie text-primary' /> Add Supplier
      </Link>
      <Link to='/add-client' className='btn btn-light'>
        <i className='fas fa-user text-primary' /> Add Client
      </Link>
      <Link to='/add-product' className='btn btn-light'>
        <i className='fas fa-gift text-primary' /> Add Product
      </Link>
      <Link to='/add-invoice' className='btn btn-light'>
        <i className='fas fa-file-invoice-dollar text-primary' /> Add Invoice
      </Link>
    </div>
  );
};

export default DashboardActions;
