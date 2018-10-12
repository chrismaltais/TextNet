var express = require("express");
var router = express.Router();
var text_controller = require("../controllers/text.controller");

router.post("/", text_controller.determineQuery);
router.get("/", text_controller.showSomething);

module.exports = router;
