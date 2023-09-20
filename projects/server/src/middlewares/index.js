const { firstNameValidator, lastNameValidator, emailValidator, otpValidator, passwordValidator, phoneValidator } = require("./auth/inputValidator");
const { dbVerificator } = require("./auth/dbVerificator");

module.exports = { firstNameValidator, lastNameValidator, emailValidator, otpValidator, passwordValidator, phoneValidator, dbVerificator };