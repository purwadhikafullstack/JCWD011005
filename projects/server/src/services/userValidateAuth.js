const { body } = require("express-validator")
const { User, LoginMethod } = require("../../models")
const bcrypt = require("bcrypt");
const admin = require("firebase-admin");


const googleRegisterRules = [
  body("email")
  .custom(async (value) => {
    if (value) {
      const user = await User.findOne({ where: { email: value } });
      if (user) {
        if (user.google) {
          throw new Error("Email already registered. Please log in.");
        } else {
          throw new Error("Email already registered with other method");
        }
      }
    }
  })
];

const googleLoginRules = [
  body("idToken")
    .notEmpty()
    .withMessage("Google ID token is required")
    .custom(async (value) => {
      const decodedToken = await admin.auth().verifyIdToken(value);
      const user = await User.findOne({
        where: {
          google: decodedToken.uid,
        },
      });
      if (!user) {
        throw new Error("User not registered with Google");
      }
    }),
];
const loginRules = [
  body("password")
    .notEmpty().withMessage("Password can't be empty"),
  body("email")
    .optional().isEmail().withMessage("Invalid email format")
    .custom(async (value, { req }) => {
      if (value) {
        const user = await User.findOne({ where: { email: value } });
        if (!user) {throw new Error("Email not registered")} req.user = user
        const loginMethod = await LoginMethod.findOne({ where: { login_method_id: user.login_method_id } })
        if (!loginMethod) {throw new Error("User not registered")} else if (user.login_method_id === 1) {
        const passwordMatches = await bcrypt.compare(req.body.password, user.password);
        if (!passwordMatches) {throw new Error("Incorrect password")}
      } else {throw new Error(`This email registered with ${loginMethod.name}`)}}}),
  body("phone")
    .optional()
    .custom(async (value, { req }) => {
      if (value) {
        let phoneNumber = value;
        if (value.startsWith("0")) {phoneNumber = value.substring(1);}
        const user = await User.findOne({ where: { phone: phoneNumber } })
        if (!user) {
          throw new Error("Phone number not registered")}req.user = user}}),
  body("email", "Either email or phone number must be provided")
    .custom((value, { req }) => {
      if (!value && !req.body.phone) {throw new Error()} return true}),
]

const forgotPasswordRules = [
  body("email")
    .notEmpty().withMessage("Email can't be empty").isEmail()
    .custom(async (value, { req }) => {
      if (value) {
        const user = await User.findOne({ where: { email: value } })
        if (!user) {throw new Error("Email not registered")} req.user = user
        const loginMethod = await LoginMethod.findOne({ where: { login_method_id: user.login_method_id } })
        if (!loginMethod) {throw new Error("User not registered")} 
        if (user.login_method_id !== 1) {throw new Error(`This email registered with ${loginMethod.name}`)}
      }
    })
]

const resetPasswordRules = [
	body("password")
	.notEmpty()
	.withMessage("Password can't be empty")
	.matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*\d])(?=.*\d)(?=.*[.]).{6,}$/)
	.withMessage('Password must be at least 6 characters with at least 1 symbol, 1 uppercase letter, and 1 number.'),

	body("confirm_password")
	.notEmpty()
	.withMessage("Confirm Password can't be empty")
	.custom((value, { req }) => {
		return value === req.body.password
	  })
	.withMessage("Passwords don't match")
]

module.exports = {googleRegisterRules, googleLoginRules, loginRules, forgotPasswordRules, resetPasswordRules}