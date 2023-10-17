const {propertyValidateAuth} = require("../services")
const { errorValidator } = require("../middlewares")
const {getAvailableProperties, getPropertyCategories} = require("../controllers/Property")

const router = require("express").Router();

router.get("/available", getAvailableProperties)
router.get("/category", getPropertyCategories)

module.exports = router