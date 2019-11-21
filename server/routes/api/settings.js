const express = require("express");
const mongodb = require("mongodb");
const _ = require("lodash");

const router = express.Router();

router.get("/", async (req, res) => {
  const settings = await loadSettingCollection();
  const setting = await settings.findOne({});
  res.send(setting);
});

router.post("/", async (req, res) => {
  const settings = await loadSettingCollection();
  const inSetting = req.body;

  if (!_.isNil(inSetting)) inSetting["_id"] = new mongodb.ObjectID();

  await settings.insertOne(inSetting);

  const setting = await settings.findOne({});

  res.send(setting);
});

router.put("/:id", async (req, res) => {
  const settings = await loadSettingCollection();

  await settings.updateOne(
    {
      _id: new mongodb.ObjectId(req.params.id)
    },
    {
      $set: req.body
    }
  );

  const setting = await settings.findOne({});

  res.send(setting);
});

async function loadSettingCollection() {
  const client = await mongodb.MongoClient.connect(
    "mongodb://127.0.0.1:27017",
    {
      useNewUrlParser: true
    }
  );

  return client.db("reef-tracker").collection("settings");
}

module.exports = router;
