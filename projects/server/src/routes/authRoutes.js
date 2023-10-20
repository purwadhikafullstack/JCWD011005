const { authUserController } = require("../controllers");
const router = require("express").Router();
const { firstNameValidator, lastNameValidator, emailValidator, otpValidator, passwordValidator, phoneValidator, dbVerificator, tokenVerificator } = require("../middlewares");

router.post("/user/register", firstNameValidator, lastNameValidator, emailValidator, passwordValidator, phoneValidator, dbVerificator, authUserController.register);
module.exports = router;