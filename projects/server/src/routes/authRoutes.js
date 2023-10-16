const { userValidateAuth } = require("../services");
const { errorValidator } = require("../middlewares");

router.post("/user/login", userValidateAuth.loginRules, errorValidator, userLogin);

module.exports = router;