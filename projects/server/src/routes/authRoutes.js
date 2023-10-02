const { authController } = require("../controllers");
const router = require("express").Router();
const { firstNameValidator, lastNameValidator, emailValidator, otpValidator, passwordValidator, phoneValidator, dbVerificator, tokenVerificator } = require("../middlewares");

router.post("/user/register", firstNameValidator, lastNameValidator, emailValidator, passwordValidator, phoneValidator, dbVerificator, authController.register);
router.post("/auth/googleOAuth", authController.googleOAuth);
module.exports = router;