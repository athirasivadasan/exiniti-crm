import {
  SET_CURRENT_USER,
  USER_LOADING,
  USER_DELETE
} from "../actions/types";

const isEmpty = require("is-empty");

const initialState = {
  isAuthenticated: false,
  user: {},
  users: [],
  loading: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case USER_LOADING:
      return {
        ...state,
        users: action.payload,
        loading: true
      };
    case USER_DELETE:
      return {
        ...state,
        users: state.users.filter((user, index) => index !== action.payload)
      }
    default:
      return state;
  }
}