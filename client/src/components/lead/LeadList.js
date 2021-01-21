import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { listLead,deleteLead } from "../../actions/authActions";
import classnames from "classnames";

class LeadList extends Component {
    constructor() {
        super();
        this.state = {
            errors: {},
            lead: [],
            isEditing: false
        };
    }

    componentDidMount() {

        this.props.listLead(this.props.history);
        if (this.props.auth.isAuthenticated && this.props.auth.user.role != 2) {
            this.props.history.push("/dashboard");
        }
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
            this.setState({
                lead: nextProps.lead
            });
        }
    }



    render() {
        const { errors } = this.state;

        return (
            <div className="container">
                <div className="row">
                    <div className="col s8 offset-s2">
                        <Link to="/" className="btn-flat waves-effect"><i className="material-icons left">dashboard</i> Dashboard</Link>
                        <Link to="/lead" className="btn-flat waves-effect"><i className="material-icons left">account_circle</i> Add Lead</Link>
                        <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                            <h4><b>Leads</b></h4>
                        </div>

                        <div>

                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>Client Name</th>
                                        <th>Client Email</th>
                                        <th>Client Phone</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {this.state.lead.map((data, index) => (
                                        <tr>

                                            <td>{data.client_name}</td>
                                            <td>{data.client_email}</td>
                                            <td>{data.client_phone}</td>
                                            <td><a  className="btn-flat waves-effect" 
                                            onClick={i => this.props.deleteLead(index,data._id)}><i className="material-icons left">delete</i></a></td>

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

LeadList.propTypes = {
    listLead: PropTypes.func.isRequired,
    deleteLead:PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    lead: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    lead: state.lead.lead,
    errors: state.errors,
});

export default connect(mapStateToProps, { listLead,deleteLead })(withRouter(LeadList));
