import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };


  render() {
    const { user } = this.props.auth;


    return (
      <div className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              <b>Hey there,</b> {user.name.split(" ")[0]}<br></br>
              <p className="flow-text grey-text waves-effect">
                Welcome to Employee Management App,{" "}
                <span style={{ fontFamily: "monospace" }}>CRM</span>
              </p>
            </h4>

           

            {(user.role == 1) ? (
              <div>
                <Link to="/register" className="btn-flat waves-effect"><i className="material-icons left">person_add_alt_1</i> Add Staff</Link>
                <Link to="/users" className="btn-flat waves-effect"><i className="material-icons left">supervisor_account</i> View Staff</Link>
              </div>
            ) : (<div>

              <Link to="/lead-list" className="btn-flat waves-effect"><i className="material-icons left">supervisor_account</i> View Lead</Link>
              <Link to="/lead" className="btn-flat waves-effect"><i className="material-icons left">account_circle</i> Add Lead</Link>
            </div>)}


            <p className="btn-flat waves-effect"><b>User Name :{user.name.split(" ")[0]}</b></p>
            <p className="btn-flat waves-effect"><b>User Role :{(user.role == 1) ? 'Admin' :'Staff'}</b></p>


          </div>
        </div>
      </div>
    );
  }
}


Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);