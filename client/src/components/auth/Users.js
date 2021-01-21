import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { listUser,deleteUser } from "../../actions/authActions";
import classnames from "classnames";

class UserList extends Component {
    constructor() {
        super();
        this.state = {
            errors: {},
            users: []
        };
    }

    componentDidMount() {

        this.props.listUser(this.props.history);
        if (this.props.auth.isAuthenticated && (this.props.auth.user.role != 1) ) {
            this.props.history.push("/dashboard");
        }
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
            this.setState({
                users: nextProps.users
            });
        }
    }



    render() {
        const { errors } = this.state;

        return (
            <div className="container">
                <div className="row">
                    <div className="col s8 offset-s2">
                    <Link to="/" className="btn-flat waves-effect"><i className="material-icons left">keyboard_backspace</i> Back to home</Link>
                        <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                            <h4><b>Staff</b></h4>
                        </div>

                        <div>

                            <table className="table">
                                <thead>
                                    <tr>

                                        <th>Full Name</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {this.state.users.map((data, index) => (
                                        <tr>

                                            <td>{data.name}</td>
                                            <td>{data.email}</td>
                                            <td>{(data.role ==1) ? 'Admin': 'Staff'}</td>
                                            <td>
                                            {(data.role ==1) ? '': <a  className="btn-flat waves-effect" 
                                            onClick={i => this.props.deleteUser(index,data._id)}><i className="material-icons left">delete</i></a>}
                                              
                                            </td>

                                        </tr>
                                    ))}

                                </tbody>
                            </table>

                        </div>


                    </div>
                </div>
            </div>
        );
    }
}

UserList.propTypes = {
    listUser: PropTypes.func.isRequired,
    deleteUser:PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    users: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    users: state.auth.users,
    errors: state.errors,
});

export default connect(mapStateToProps, { listUser,deleteUser })(withRouter(UserList));
