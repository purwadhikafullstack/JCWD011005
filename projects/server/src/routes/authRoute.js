const { tenantValidateAuth, userValidateAuth } = require("../services")
const { errorValidator } = require("../middlewares")
const { multerUpload, handleFileError } = require("../middlewares/multer");
const { tenantRegister, userLogin, userForgotPassword, userResetPassword } = require("../controllers/Auth")
const { registerWithGoogle, loginWithGoogle } = require("../controllers/Firebase");

const router = require("express").Router();

router.post("/tenant", multerUpload.single("id_card"), handleFileError, tenantValidateAuth.registerRules, errorValidator, tenantRegister)
router.post("/user-login", userValidateAuth.loginRules, errorValidator, userLogin)
router.put("/user-password", userValidateAuth.forgotPasswordRules, errorValidator, userForgotPassword)
router.patch("/user-password", userValidateAuth.resetPasswordRules, errorValidator, userResetPassword)
router.post("/user-google", userValidateAuth.googleRegisterRules, errorValidator, registerWithGoogle)
router.post("/user-login-google", userValidateAuth.googleLoginRules, errorValidator, loginWithGoogle)

module.exports = router
