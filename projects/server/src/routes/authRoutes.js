const router = require("express").Router();
const { authUserController } = require("../controllers")
const { userValidateAuth } = require("../services");
const { errorValidator } = require("../middlewares");

router.post("/user/login", userValidateAuth.loginRules, errorValidator, authUserController.userLogin);

module.exports = router;