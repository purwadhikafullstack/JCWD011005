const { firstNameValidator, lastNameValidator, emailValidator, passwordValidator, phoneValidator } = require("./auth/inputValidator");
const { dbVerificator } = require("./auth/dbVerificator");

module.exports = { firstNameValidator, lastNameValidator, emailValidator, passwordValidator, phoneValidator, dbVerificator };