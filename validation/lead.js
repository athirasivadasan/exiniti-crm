const Validator = require("validator");

const isEmpty = require("is-empty");

module.exports = function validateLeadInput(data) {
  let errors = {};
  data.client_name = !isEmpty(data.client_name) ? data.client_name : "";
  data.client_email = !isEmpty(data.client_email) ? data.client_email : "";
  data.client_phone = !isEmpty(data.client_phone) ? data.client_phone : "";
  
  

  if (Validator.isEmpty(data.client_name)) {
    errors.client_name = "Name field is required";
  }
  
  if (Validator.isEmpty(data.client_email)) {
    errors.client_email = "Email field is required";
  } else if (!Validator.isEmail(data.client_email)) {
    errors.client_email = "Email is invalid";
  }
  if (Validator.isEmpty(data.client_phone)) {
    errors.client_phone = "Phine Number is required";
  }
  

  
  return {
    errors,
    isValid: isEmpty(errors)
  };
};