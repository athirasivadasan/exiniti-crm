import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import {
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING,
  LEAD_LOADING,
  SET_CURRENT_LEAD,
  LEAD_DELETE,
  USER_DELETE
} from "./types";


// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("http://localhost:5000/api/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err
      })
    );
};

// Register Lead
export const registerLead = (leadData, history) => dispatch => {
  axios
    .post("http://localhost:5000/api/leads/create", leadData)
    .then(res => history.push("/lead-list"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err
      })
    );
};
// List Lead
export const listLead = (history) => dispatch => {
  axios
    .get("http://localhost:5000/api/leads/list")
    .then(res => {
      console.log(res.data);
      dispatch(setLeadLoading(res.data));

    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err
      })
    );
};
// List User
export const listUser = (history) => dispatch => {
  axios
    .get("http://localhost:5000/api/users/list")
    .then(res => {
      console.log(res.data);
      dispatch(setUserLoading(res.data));

    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err
      })
    );
};

//deleteUser
export const deleteUser = (index, id) => dispatch => {
  
 axios
    .delete(`http://localhost:5000/api/users/delete/${id}`)
    .then(res => {

      dispatch({
        type: USER_DELETE,
        payload: index
      })
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err
      })
    );

};

//deleteLead
export const deleteLead = (index, id) => dispatch => {


  axios
    .delete(`http://localhost:5000/api/leads/delete/${id}`)
    .then(res => {

      dispatch({
        type: LEAD_DELETE,
        payload: index
      })
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err
      })
    );

};

// Login - get user token
export const loginUser = userData => dispatch => {
  axios
    .post("http://localhost:5000/api/users/login", userData)
    .then(res => {
      // console.log(res.data);
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      localStorage.setItem("role", res.data.role);

      setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err
      })
    );
};
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};
export const setUserLoading = decoded => {
  return {
    type: USER_LOADING,
    payload: decoded
  };
};

export const setLeadLoading = decoded => {
  return {
    type: SET_CURRENT_LEAD,
    payload: decoded
  };
};


export const logoutUser = () => dispatch => {

  localStorage.removeItem("jwtToken");

  setAuthToken(false);

  dispatch(setCurrentUser({}));
};