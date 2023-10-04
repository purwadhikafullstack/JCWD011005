const {propertyValidateAuth} = require("../services")
const { errorValidator } = require("../middlewares")
const {getAvailableProperties} = require("../controllers/Property")

const router = require("express").Router();

router.get("/available", getAvailableProperties)

module.exports = router