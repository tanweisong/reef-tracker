const express = require("express");
const login = require("../../controllers/logins.controller.js");

const router = express.Router();

router.get("/exists/:email", login.loginExists);

router.get("/:email", login.getLogin);

router.post("/auth", login.authLogin);

router.post("/", login.createLogin);

router.put("/", login.updateLogin);

module.exports = router;
