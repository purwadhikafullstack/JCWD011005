const { authController } = require("../controllers");
const router = require("express").Router();
const { firstNameValidator, lastNameValidator, emailValidator, passwordValidator, phoneValidator, dbVerificator, tokenVerificator } = require("../middlewares/auth/inputValidator");

// router.post("/login", emailValidator, passwordValidator, authController.login);
router.post("/register", firstNameValidator, lastNameValidator, emailValidator, passwordValidator, phoneValidator, dbVerificator, authController.register);
// router.post("/resendRegisterToken", /*islogin, isverified, isemail, isusername, isphone*/authController.resendRegisterToken);
// router.patch("/verification", authController.verifyEmail);
module.exports = router;