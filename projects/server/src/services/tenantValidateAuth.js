const { body } = require("express-validator")
const { Tenant } = require("../models")

const registerRules = [
    body("first_name")
      .notEmpty().withMessage("First name can't be empty"),
    body("last_name")
      .notEmpty().withMessage("Last name can't be empty"),
    body("email")
      .notEmpty().withMessage("Email can't be empty").isEmail()
      .withMessage("Invalid email format")
      .custom(async (value, {req}) => {
        const tenant = await Tenant.findOne({ where: { email: value } })
        if (tenant) {throw new Error("Email already registered")} req.tenant = tenant}),
    body("phone").notEmpty().withMessage("Phone number can't be empty")
      .custom(async (value, {req}) => {
        const tenant = await Tenant.findOne({ where: { phone: value } });
        if (tenant) {throw new Error("Phone number already registered")} req.tenant = tenant
        if (value.charAt(0) === '0') {throw new Error("Phone number cannot start with '0'")}}),
    body("password")
      .notEmpty().withMessage("Password can't be empty")
      .matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*\d])(?=.*\d)(?=.*[.]).{6,}$/)
      .withMessage("Password must be at least 6 characters with at least 1 symbol, 1 uppercase letter, and 1 number."),
    body("confirm_password")
      .notEmpty().withMessage("Confirm Password can't be empty")
      .custom((value, { req }) => {return value === req.body.password})
      .withMessage("Passwords not match"),
    body("id_card")
      .custom((value, { req }) => {if (!req.file) {throw new Error("ID Card picture is required")} return true})
      .withMessage("ID Picture is required")
  ]

  module.exports = {registerRules}