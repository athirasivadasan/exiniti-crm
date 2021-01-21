import {
  SET_CURRENT_LEAD,
  LEAD_LOADING,
  LEAD_DELETE
} from "../actions/types";

const isEmpty = require("is-empty");

const initialState = {
  lead: {},
  loading: false
};

export default function (state = initialState, action) {
console.log(action.payload);
  switch (action.type) {
    case SET_CURRENT_LEAD:
      return {
        ...state,
        lead: action.payload
      };
    case LEAD_LOADING:
      return {
        ...state,
        lead: action.payload,
        loading: true
      };
    case LEAD_DELETE:
      return {
        ...state,
        lead: state.lead.filter((lead, index) => index !== action.payload)
      }
    default:
      return state;
  }


}