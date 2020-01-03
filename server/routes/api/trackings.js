const express = require("express");
const trackings = require("../../controllers/trackings.controller");
const _ = require("../../../functions/index");

const router = express.Router();

router.post("/trackingsByRange", trackings.getTrackingsByRange);

router.post("/exists", trackings.trackingExists);

router.post("/", trackings.createTracking);

router.put("/", trackings.updateTracking);

module.exports = router;
