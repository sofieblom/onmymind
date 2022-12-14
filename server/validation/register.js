const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
let errors = {};

data.firstname = !isEmpty(data.firstname) ? data.firstname : "";
data.lastname = !isEmpty(data.lastname) ? data.lastname : "";
data.email = !isEmpty(data.email) ? data.email : "";
data.password = !isEmpty(data.password) ? data.password : "";
// data.repeatPasswrod = !isEmpty(data.repeatPasswrod) ? data.repeatPasswrod : "";

if(Validator.isEmpty(data.firstname)) {
    errors.firstname = "Firstname field is required"
}
if(Validator.isEmpty(data.lastname)){
    errors.lastname = "Lastname field is required"
}
if(Validator.isEmpty(data.email)) {
    error.email = "Email field is required"
}
if(Validator.isEmpty(data.password)) {
    error.password = "Password field is required"
}
// if(Validator.isEmpty(data.repeatPasswrod)){
//     errors.repeatPasswrod = "Confirm password fiels is required"
// }
if(!Validator.isLength(data.password, {min: 6, max: 30})){
    errors.password = "Password must be at least 6 characters"
}
// if(!Validator.equals(data.password, data.repeatPasswrod)){
//     errors.repeatPasswrod = "Password must match"
// }

return {
    errors, isValid: isEmpty(errors)
}
}