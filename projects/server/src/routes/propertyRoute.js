const {propertyValidateAuth} = require("../services")
const { errorValidator } = require("../middlewares")
const {getAvailableProperties, getPropertyCategories, getPropertyPrices} = require("../controllers/Property")

const router = require("express").Router();

router.get("/available", getAvailableProperties)
router.get("/category", getPropertyCategories)
router.get("/price/:id", getPropertyPrices)

module.exports = router