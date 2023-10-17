const router = require("express").Router();
const { userValidateAuth } = require("../services");
const { errorValidator } = require("../middlewares");

router.post("/user/login", userValidateAuth.loginRules, errorValidator, authUserController.userLogin);

module.exports = router;