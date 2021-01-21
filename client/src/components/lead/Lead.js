import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerLead } from "../../actions/authActions";
import classnames from "classnames";

class Lead extends Component {
  constructor() {
    super();
    this.state = {
      client_name: "",
      client_email: "",
      client_phone: "",
      errors: {},
    };
  }

  componentDidMount() {
    
    if (this.props.auth.isAuthenticated && this.props.auth.user.role != 2) {
      this.props.history.push("/dashboard");
    }
  }
  componentWillReceiveProps(nextProps) {
    
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const newLead = {
      client_name: this.state.client_name,
      client_email: this.state.client_email,
      client_phone: this.state.client_phone,
    };
    this.props.registerLead(newLead, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col s8 offset-s2">
            <Link to="/" className="btn-flat waves-effect"><i className="material-icons left">dashboard</i> Dashboard</Link>
            <Link to="/lead-list" className="btn-flat waves-effect"><i className="material-icons left">supervisor_account</i> View Lead</Link>

            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Add Lead</b>
              </h4>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.client_name}
                  error={errors.client_name}
                  id="client_name"
                  type="text"
                  className={classnames("", {
                    invalid: errors.client_name,
                  })}
                />
                <label htmlFor="client_name">Name</label>
                <span className="red-text">{errors.name}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.client_email}
                  error={errors.client_email}
                  id="client_email"
                  type="email"
                  className={classnames("", {
                    invalid: errors.client_email,
                  })}
                />
                <label htmlFor="email">Email</label>
                <span className="red-text">{errors.email}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.client_phone}
                  error={errors.client_phone}
                  id="client_phone"
                  type="text"
                  className={classnames("", {
                    invalid: errors.client_phone,
                  })}
                />
                <label htmlFor="client_phone">Phone</label>
                <span className="red-text">{errors.client_phone}</span>
              </div>

              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem",
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Lead.propTypes = {
  registerLead: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { registerLead })(withRouter(Lead));
