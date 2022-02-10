import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileProduct from './ProfileProduct';
import ProfileInvoice from './ProfileInvoice';
import ProfileSupplier from './ProfileSupplier';
import ProfileClient from './ProfileClient';
import { getProfileById } from '../../actions/profile';

const Profile = ({ getProfileById, profile: { profile }, auth, match }) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);

  return (
    <Fragment>
      {profile === null ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/profiles" className="btn btn-light">
            Back To Profiles
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to="/edit-profile" className="btn btn-dark">
                Edit Profile
              </Link>
            )}
          <div className="profile-grid my-1">
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
            <div className="profile-exp bg-white p-2">
              <h2 className="text-primary">Product Managemet</h2>
              {profile.product.length > 0 ? (
                <Fragment>
                  {profile.product.map((product) => (
                    <ProfileProduct
                      key={product._id}
                      product={product}
                    />
                  ))}
                </Fragment>
              ) : (
                <h4>No product information</h4>
              )}
            </div>

            <div className="profile-edu bg-white p-2">
              <h2 className="text-primary">Invoice Managemet</h2>
              {profile.invoice.length > 0 ? (
                <Fragment>
                  {profile.invoice.map((invoice) => (
                    <ProfileInvoice
                      key={invoice._id}
                      invoice={invoice}
                    />
                  ))}
                </Fragment>
              ) : (
                <h4>No invoice information</h4>
              )}
              </div>

              <div className="profile-sup bg-white p-2">
              <h2 className="text-primary">Supplier Managemet</h2>
              {profile.supplier.length > 0 ? (
                <Fragment>
                  {profile.supplier.map((supplier) => (
                    <ProfileSupplier
                      key={supplier._id}
                      supplier={supplier}
                    />
                  ))}
                </Fragment>
              ) : (
                <h4>No supplier information</h4>
              )}
            </div>

            <div className="profile-sup bg-white p-2">
              <h2 className="text-primary">Client Managemet</h2>
              {profile.client.length > 0 ? (
                <Fragment>
                  {profile.client.map((client) => (
                    <ProfileClient
                      key={client._id}
                      client={client}
                    />
                  ))}
                </Fragment>
              ) : (
                <h4>No client information</h4>
              )}
            </div>

          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getProfileById })(Profile);
