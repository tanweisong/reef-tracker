const express = require("express");
const mongodb = require("mongodb");
const _ = require("lodash");

const router = express.Router();

router.get("/", async (req, res) => {
  const trackings = await loadTrackingCollection();
  const tracking = await trackings.find({}).toArray();
  res.send(tracking);
});

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

router.post("/exists", async (req, res) => {
  const trackings = await loadTrackingCollection();
  const date = req.body.date;

  const tracking = await trackings.findOne({
    date: { $eq: date }
  });

  res.send(tracking);
});

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

router.put("/:id", async (req, res) => {
  const trackings = await loadTrackingCollection();

  await trackings.updateOne(
    {
      _id: new mongodb.ObjectId(req.params.id)
    },
    {
      $set: req.body
    }
  );

  const tracking = await trackings.find({}).toArray();

  res.send(tracking);
});

async function loadTrackingCollection() {
  const client = await mongodb.MongoClient.connect(
    "mongodb://127.0.0.1:27017",
    {
      useNewUrlParser: true
    }
  );

  return client.db("reef-tracker").collection("trackings");
}

module.exports = router;
