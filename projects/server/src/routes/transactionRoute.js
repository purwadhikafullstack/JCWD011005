const {createTransactionAndItems} = require("../controllers/Transaction")
const verifyToken = require("../middlewares/auth")

const router = require("express").Router();

router.post("/", verifyToken, createTransactionAndItems)

module.exports = router