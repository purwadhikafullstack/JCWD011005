const { authController } = require("../controllers");
const router = require("express").Router();
const { firstNameValidator, lastNameValidator, emailValidator, otpValidator, passwordValidator, phoneValidator, dbVerificator, tokenVerificator } = require("../middlewares");

// router.post("/login", emailValidator, passwordValidator, authController.login);
router.post("/user/register", firstNameValidator, lastNameValidator, emailValidator, passwordValidator, phoneValidator, dbVerificator, authController.register);
router.patch("/user/verify", otpValidator, authController.verify);
// router.post("/resendRegisterToken", /*islogin, isverified, isemail, isusername, isphone*/authController.resendRegisterToken);
module.exports = router;