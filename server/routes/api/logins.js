const express = require("express");
const login = require("../../controllers/logins.controller.js");
const _ = require("lodash");

const router = express.Router();

router.get("/:email", login.getLogin);

router.post("/", login.createLogin);

router.put("/", login.updateLogin);

module.exports = router;
