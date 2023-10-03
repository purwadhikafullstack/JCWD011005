const router = require("express").Router();
const { propertyController } = require("../controllers");

router.post("/property/categories", propertyController.getCategories);
module.exports = router;