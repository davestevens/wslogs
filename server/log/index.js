const express = require("express");
const router = express.Router();

router.get("/register", require("./register"));
router.post("/", require("./create"));

module.exports = router;
