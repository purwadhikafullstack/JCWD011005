const { tenantRegister } = require("./tenantRegister")
const {userLogin} = require("./userLogin")
const {userForgotPassword} = require("./userForgotPassword")
const {userResetPassword} = require("./userResetPassword")

module.exports = {
    tenantRegister,
    userLogin,
    userForgotPassword,
    userResetPassword
}