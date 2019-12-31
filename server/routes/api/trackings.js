const express = require("express");
const mongodb = require("mongodb");
const trackings = require("../../controllers/trackings.controller");
const _ = require("lodash");

const router = express.Router();

router.get("/", trackings.getTrackings);

router.post("/", async (req, res) => {
  const trackings = await loadTrackingCollection();
  var inRange = req.body;
  const tracking = await trackings
    .find({
      date: {
        $gte: inRange.startDate,
        $lt: inRange.endDate
      }
    })
    .toArray();

  res.send(tracking);
});

router.post("/exists", trackings.getTracking);

router.post("/tracking", async (req, res) => {
  const trackings = await loadTrackingCollection();
  var inTracking = req.body;
  const startDate = _.get(inTracking, "startDate");
  const endDate = _.get(inTracking, "endDate");

  _.unset(inTracking, "startDate");
  _.unset(inTracking, "endDate");

  if (!_.isNil(inTracking)) inTracking["_id"] = new mongodb.ObjectID();

  await trackings.insertOne(inTracking);

  const tracking = await trackings
    .find({
      date: {
        $gte: startDate,
        $lt: endDate
      }
    })
    .toArray();

  res.send(tracking);
});

router.put("/:id", trackings.updateTracking);

async function loadTrackingCollection() {
  const dbconnection = process.env.dbconnection;

  const client = await mongodb.MongoClient.connect(
    // "mongodb://127.0.0.1:27017",
    dbconnection,
    {
      useNewUrlParser: true
    }
  );

  return client.db("reef-tracker").collection("trackings");
}

module.exports = router;
