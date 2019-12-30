const express = require("express");
const settings = require("../../controllers/settings.controller");
const _ = require("lodash");

const router = express.Router();

router.get("/", settings.getSettings);

router.post("/", settings.createSettings);

router.put("/:id", settings.updateSettings);

module.exports = router;
