const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateLoginInput(data){
    let error = {};

    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    if(Validator.isEmpty(data.email)) {
        erros.email = "Email field is required";
    } else if (!Validator.isEmail(data.email)){
        errors.email = "Email is invalid"
    }

    if(Validator.isEmpty(Data.password)) {
        errors.password = "Password field is required"
    }

    return {
        error,
        isValid: isEmpty(errors)
    }
}